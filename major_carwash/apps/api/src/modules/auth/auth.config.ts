import { z } from "zod";

export function validateDashConfig() {
  console.log("ℹ️ [Dash Vet] Validating Infrastructure environment variables...");

  const schema = z.object({
    BETTER_AUTH_API_KEY: z.string().min(10, "API key is missing or too short"),
    // If you aren't passing custom URLs, these fallback to the official production defaults
    BETTER_AUTH_API_URL: z.string().url().default("https://api.better-auth.com"),
    BETTER_AUTH_KV_URL: z.string().url().default("https://kv.better-auth.com"),
  });

  // This will throw a ZodError and immediately halt execution if parsing fails
  const env = schema.parse({
    BETTER_AUTH_API_KEY: process.env.BETTER_AUTH_API_KEY,
    BETTER_AUTH_API_URL: process.env.BETTER_AUTH_API_URL,
    BETTER_AUTH_KV_URL: process.env.BETTER_AUTH_KV_URL,
  });

  console.log("✅ [Dash Vet] Infrastructure environment keys are structurally valid.");
  return env;
}
