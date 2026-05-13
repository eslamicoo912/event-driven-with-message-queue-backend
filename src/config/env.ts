import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGO_URI: z.string().min(1, "MONGO_URI is required"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET should be at least 16 characters"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("*"),
  UPLOAD_DIR: z.string().default("uploads"),
  MAX_FILE_SIZE_MB: z.coerce.number().positive().default(5),
  REDIS_URL: z.string().default("redis://localhost:6379"),
  EMAIL_FROM: z.string().email().default("no-reply@example.com")
});

// Validate environment variables once during boot so runtime code can trust config shape.
export const env = envSchema.parse(process.env);

export type AppEnv = typeof env;
