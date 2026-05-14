import { Worker } from "bullmq";
import { ConsoleEmailProvider } from "../../infrastructure/email/ConsoleEmailProvider";
import { queueConnection } from "../queueConnection";
import { EmailService } from "../../services/EmailService";
import { EMAIL_JOB_NAMES } from "../jobs/emailJobs";
import { createEmailProcessor } from "../processors/emailProcessor";

const emailProvider = new ConsoleEmailProvider();
const emailService = new EmailService(emailProvider);

export const emailWorker = new Worker("email", async (job) => {
    if (job.name !== EMAIL_JOB_NAMES.SEND_WELCOME_EMAIL) {
        throw new Error(`Unknown email job: ${job.name}`)
    };

    return createEmailProcessor(emailService)(job);
}, {
    connection: queueConnection,
    concurrency: 5
})