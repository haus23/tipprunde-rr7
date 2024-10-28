import * as v from 'valibot';

const envSchema = v.object({
  // Node
  NODE_ENV: v.optional(v.picklist(['development', 'production'])),

  // Auth metrics
  MAX_ATTEMPTS: v.pipe(v.string(), v.transform(Number)),
  SESSION_EXPIRATION_TIME: v.pipe(v.string(), v.transform(Number)),

  // Email SaaS tokens
  POSTMARK_TOKEN: v.string(),
  RESEND_TOKEN: v.string(),

  // Secrets
  AUTH_SESSION_SECRET: v.string(),
});

// biome-ignore lint/nursery/noProcessEnv: Allow only here for parsing the env
export const env = v.parse(envSchema, process.env);
