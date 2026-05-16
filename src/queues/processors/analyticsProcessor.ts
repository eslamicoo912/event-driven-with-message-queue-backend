import { AnalyticsService } from "../../services/AnalyticsService"
import type { Job } from "bullmq";
import { TrackAnalyticsJobData } from "../jobs/analyticsJobs";

export function createAnalyticsProcessor(analyticsService: AnalyticsService) {
    return async function analyticsProcessor(job: Job<TrackAnalyticsJobData>) {
        await analyticsService.trackEvent({
            eventName: job.data.eventName,
            userId: job.data.userId,
            properties: job.data.properties
        })
    }
}