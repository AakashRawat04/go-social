import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.string().regex(/^\d+$/).optional().default('5050'),
  MONGODB_URI: z.string().startsWith('mongodb+srv://').includes('mongodb.net'),
  JWT_SECRET: z.string(),
  level: z.enum(['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly']).optional().default('silly'),
  prefix: z.string().optional().default('/api'),
  SUPABASE_KEY: z.string(),
  SUPABASE_URL: z.string(),
});

const parsedSchema = envSchema.parse(process.env);

export default {
  NODE_ENV: parsedSchema.NODE_ENV,

  PORT: parsedSchema.PORT,

  MONGODB_URI: parsedSchema.MONGODB_URI,
  SUPABASE_KEY: parsedSchema.SUPABASE_KEY,
  SUPABASE_URL: parsedSchema.SUPABASE_URL,

  JWT_SECRET: parsedSchema.JWT_SECRET,

  logs: {
    level: parsedSchema.level,
  },

  api: {
    prefix: parsedSchema.prefix,
  },
};
