import { env } from "../../config/env";

// Redis is represented as configuration only. BullMQ can later consume this URL in producers/workers.
export const redisConfig = {
  url: env.REDIS_URL
};
