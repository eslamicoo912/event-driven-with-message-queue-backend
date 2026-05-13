import type { EmailProvider } from "../infrastructure/email/EmailProvider";

export class EmailService {
  constructor(private readonly emailProvider: EmailProvider) {}

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    // Queue-ready boundary: this method can later enqueue a "send-welcome-email" job.
    await this.emailProvider.send({
      to,
      subject: "Welcome to the API",
      text: `Hi ${name}, thanks for registering.`
    });
  }
}
