import { EMAIL_JOB_NAMES, type SendWelcomeEmailJobData } from "../jobs/emailJobs";
import { createQueue } from "../queueFactory";
import { QUEUE_NAMES } from "../queueNames";

const emailQueue = createQueue<SendWelcomeEmailJobData>(QUEUE_NAMES.EMAIL_QUEUE);

export class EmailQueueProducer {
    async enqueueWelcomeEmail(data: SendWelcomeEmailJobData): Promise<void> {
        await emailQueue.add(EMAIL_JOB_NAMES.SEND_WELCOME_EMAIL, data, {
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