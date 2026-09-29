import { GeminiAdapter } from "./gemini.js";
import type { ModelAdapter } from "./types.js";

export function getModelAdapter(): ModelAdapter {
  const provider = process.env.AI_PROVIDER || "gemini";
  if (provider === "gemini") return new GeminiAdapter();
  throw new Error(`Unsupported AI provider: ${provider}`);
}
