import { NOTIFICATION_JOB_NAMES, type SendNotificationJobData } from "../jobs/nottificationJobs";
import { createQueue } from "../queueFactory";
import { QUEUE_NAMES } from "../queueNames";

const notificationQueue = createQueue<SendNotificationJobData>(QUEUE_NAMES.NOTIFICATION_QUEUE);

export class NotificationQueueProducer {
    async enqueueNotification(data: SendNotificationJobData): Promise<void> {
        await notificationQueue.add(NOTIFICATION_JOB_NAMES.SEND_NOTIFICATION, data, {
            attempts: 3,

            removeOnComplete: {
                age: 60 * 60 * 24,
                count: 100
            },

            removeOnFail: {
                age: 60 * 60 * 24 * 7,
            },

            backoff: {
                type: "exponential",
                delay: 5000
            },

        })
    }
}
