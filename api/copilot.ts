import type { IncomingMessage, ServerResponse } from "node:http";
import { portfolioContext, validCitations } from "./_lib/knowledge.js";
import { getModelAdapter } from "./_lib/model/index.js";
import type { CopilotMode } from "./_lib/model/types.js";
import { checkRateLimit } from "./_lib/rate-limit.js";

type ApiRequest = IncomingMessage & { body?: unknown };
const allowedModes = new Set<CopilotMode>(["explore", "role-match"]);
const allowedLocales = new Set(["en", "zh-CN", "zh-TW", "he", "ar"]);

function sendJson(response: ServerResponse, body: unknown, status = 200) {
  response.statusCode = status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.setHeader("Content-Security-Policy", "default-src 'none'");
  response.setHeader("X-Content-Type-Options", "nosniff");
  response.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  response.setHeader("X-Frame-Options", "DENY");
  response.end(JSON.stringify(body));
}

async function readBody(request: ApiRequest): Promise<Record<string, unknown>> {
  if (request.body && typeof request.body === "object") {
    return request.body as Record<string, unknown>;
  }
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > 12_000) throw new Error("too-large");
    chunks.push(buffer);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8")) as Record<string, unknown>;
}

async function hashVisitor(request: ApiRequest) {
  const forwarded = request.headers["x-forwarded-for"];
  const address = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]?.trim();
  const value = `${address || "unknown"}:${process.env.RATE_LIMIT_SALT || "portfolio"}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest).slice(0, 12), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

export default async function handler(request: ApiRequest, response: ServerResponse) {
  if (request.method !== "POST") return sendJson(response, { error: "Method not allowed" }, 405);

  const contentLength = Number(request.headers["content-length"] || 0);
  if (contentLength > 12_000) return sendJson(response, { error: "Request too large" }, 413);

  const origin = request.headers.origin;
  const requestHost = request.headers.host || "";
  const configuredOrigins = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  if (origin) {
    const originHost = new URL(origin).host;
    if (originHost !== requestHost && !configuredOrigins.includes(origin)) {
      return sendJson(response, { error: "Origin not allowed" }, 403);
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await readBody(request);
  } catch (error) {
    const status = error instanceof Error && error.message === "too-large" ? 413 : 400;
    return sendJson(response, { error: status === 413 ? "Request too large" : "Invalid request" }, status);
  }

  if (body.website) return sendJson(response, { error: "Invalid request" }, 400);
  const question = typeof body.question === "string" ? body.question.trim() : "";
  const mode = body.mode as CopilotMode;
  const locale = typeof body.locale === "string" ? body.locale : "en";
  if (question.length < 3 || question.length > 800 || !allowedModes.has(mode)) {
    return sendJson(response, { error: "Please keep the question between 3 and 800 characters." }, 400);
  }

  const limit = await checkRateLimit(await hashVisitor(request));
  if (!limit.allowed) {
    return sendJson(response, { error: "Demo limit reached. Please try again later.", demo: true }, 429);
  }
  if (!process.env.GEMINI_API_KEY) {
    return sendJson(response, { error: "Live AI is not configured yet.", demo: true }, 503);
  }

  try {
    const result = await getModelAdapter().generate(
      { question, mode, locale: allowedLocales.has(locale) ? locale : "en" },
      portfolioContext,
    );
    return sendJson(response, {
      ...result,
      citations: result.citations.filter((citation) => validCitations.has(citation)),
      remaining: limit.remaining,
    });
  } catch (error) {
    console.error(
      "Copilot provider error:",
      error instanceof Error ? error.message : "Unknown provider error",
    );
    return sendJson(response, { error: "The live assistant is temporarily unavailable.", demo: true }, 502);
  }
}

export const config = { maxDuration: 25 };
