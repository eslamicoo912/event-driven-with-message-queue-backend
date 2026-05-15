import { Worker } from "bullmq";
import { NotificationRepository } from "../../repositories/NotificationRepository";
import { NotificationService } from "../../services/NotificationService";
import { NOTIFICATION_JOB_NAMES } from "../jobs/nottificationJobs";
import { createNotificationProcessor } from "../processors/notificationProcessor";
import { queueConnection } from "../queueConnection";

const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);

const processor = createNotificationProcessor(notificationService);

export const notificationWorker = new Worker("notification", async (job) => {
    if (job.name !== NOTIFICATION_JOB_NAMES.SEND_NOTIFICATION) {
        throw new Error(`Unknown email job: ${job.name}`)
    }
    return processor(job);
}, {
    connection: queueConnection,
    concurrency: 5
})