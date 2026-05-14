import IORedis from "ioredis";
import { redisConfig } from "../infrastructure/redis/redisConfig";

export const queueConnection = new IORedis(redisConfig.url, { maxRetriesPerRequest: null })