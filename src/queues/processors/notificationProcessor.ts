import { Job } from "bullmq";
import { NotificationService } from "../../services/NotificationService";
import { SendNotificationJobData } from "../jobs/nottificationJobs";

export function createNotificationProcessor(notificationService: NotificationService) {
    return async function notificationProcessor(job: Job<SendNotificationJobData>): Promise<void> {
        await notificationService.createNotification({
            userId: job.data.userId,
            message: job.data.message,
            title: job.data.title,
            type: job.data.type
        })
    }
} 