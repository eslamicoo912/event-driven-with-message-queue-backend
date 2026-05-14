import { EmailService } from "../../services/EmailService";
import type { Job } from "bullmq";
import type { SendWelcomeEmailJobData } from "../jobs/emailJobs";

export function createEmailProcessor(emailService: EmailService) {
    return async function emailProcessor(job: Job<SendWelcomeEmailJobData>): Promise<void> {
        await emailService.sendWelcomeEmail(job.data.email, job.data.name);
    }
}