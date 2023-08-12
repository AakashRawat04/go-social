import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).optional().default('5050'),
  level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  prefix: z.string().optional().default('/api'),
  SUPABASE_KEY: z.string(),
  SUPABASE_URL: z.string(),
  SUPABASE_BUCKET_NAME: z.string(),
  PRODUCTION_URL: z.string().optional(),
});

const parsedSchema = envSchema.parse(process.env);

export default {
  NODE_ENV: parsedSchema.NODE_ENV,
  PRODUCTION_URL: parsedSchema.PRODUCTION_URL,

  PORT: parsedSchema.PORT,

  SUPABASE: {
    KEY: parsedSchema.SUPABASE_KEY,
    URL: parsedSchema.SUPABASE_URL,
    BUCKET_NAME: parsedSchema.SUPABASE_BUCKET_NAME,
  },

  logs: {
    level: parsedSchema.level,
  },

  api: {
    prefix: parsedSchema.prefix,
  },
};
