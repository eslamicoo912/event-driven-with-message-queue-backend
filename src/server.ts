import fs from "fs";
import { env } from "./config/env";
import { connectMongo } from "./database/mongoose";
import { createApp } from "./app";
import { redisConfig } from "./infrastructure/redis/redisConfig";

async function bootstrap(): Promise<void> {
  fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });

  await connectMongo();

  const app = createApp();

  app.listen(env.PORT, () => {
    console.info(`API listening on port ${env.PORT}`);
    console.info(`Redis configured for future queue integration at ${redisConfig.url}`);
  });
}

bootstrap().catch((error) => {
  console.error("Failed to start API", error);
  process.exit(1);
});
