import { Worker } from "bullmq";
import { AnalyticsRepository } from "../../repositories/AnalyticsRepository";
import { AnalyticsService } from "../../services/AnalyticsService";
import { ANALYTICS_JOBS_NAMES } from "../jobs/analyticsJobs";
import { createAnalyticsProcessor } from "../processors/analyticsProcessor";
import { queueConnection } from "../queueConnection";

const analyticsRepository = new AnalyticsRepository();
const analyticsService = new AnalyticsService(analyticsRepository);

const processor = createAnalyticsProcessor(analyticsService);

export const analyticsWorker = new Worker("analytics", async (job) => {
    if (job.name !== ANALYTICS_JOBS_NAMES.TRACK_ANALYTICS) {
        throw new Error(`Job name ${job.name} not found`);
    }

    return processor(job);
}, {
    connection: queueConnection,
    concurrency: 10
})