type Counter = { count: number; resetAt: number };

const counters = new Map<string, Counter>();

function memoryIncrement(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const existing = counters.get(key);
  const counter =
    existing && existing.resetAt > now
      ? existing
      : { count: 0, resetAt: now + windowMs };
  counter.count += 1;
  counters.set(key, counter);
  return { allowed: counter.count <= limit, remaining: Math.max(0, limit - counter.count) };
}

async function kvIncrement(key: string, limit: number, ttlSeconds: number) {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([
      ["INCR", key],
      ["EXPIRE", key, ttlSeconds, "NX"],
    ]),
    signal: AbortSignal.timeout(2_500),
  });
  if (!response.ok) throw new Error("Rate-limit store unavailable");
  const result = (await response.json()) as Array<{ result?: number }>;
  const count = Number(result[0]?.result ?? limit + 1);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

export async function checkRateLimit(visitorHash: string) {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const hourKey = `copilot:visitor:${visitorHash}:${day}:${now.getUTCHours()}`;
  const dayKey = `copilot:global:${day}`;

  const [visitor, global] = await Promise.all([
    kvIncrement(hourKey, 5, 3_700).catch(() => null),
    kvIncrement(dayKey, 100, 90_000).catch(() => null),
  ]);

  const perVisitor = visitor ?? memoryIncrement(hourKey, 5, 60 * 60 * 1000);
  const perDay = global ?? memoryIncrement(dayKey, 100, 25 * 60 * 60 * 1000);
  return {
    allowed: perVisitor.allowed && perDay.allowed,
    remaining: Math.min(perVisitor.remaining, perDay.remaining),
  };
}
