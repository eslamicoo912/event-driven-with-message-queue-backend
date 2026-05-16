import { } from "bullmq"
import { ANALYTICS_JOBS_NAMES, TrackAnalyticsJobData } from "../jobs/analyticsJobs";
import { createQueue } from "../queueFactory";
import { QUEUE_NAMES } from "../queueNames";

const analyticsQueue = createQueue(QUEUE_NAMES.ANALYTICS_QUEUE);

export class AnalyticsQueueProducer {
    async enqueueTrackAnalyticsJob(data: TrackAnalyticsJobData) {
        await analyticsQueue.add(ANALYTICS_JOBS_NAMES.TRACK_ANALYTICS, data, {
            attempts: 3,
            removeOnComplete: {
                age: 60 * 60 * 24,
                count: 100,
            },
            removeOnFail: {
                age: 60 * 60 * 24 * 7,
                count: 1000
            },
            backoff: {
                type: "exponential"
            }
        })
    }
}