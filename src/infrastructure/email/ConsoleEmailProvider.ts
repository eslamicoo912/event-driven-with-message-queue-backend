import { env } from "../../config/env";
import type { EmailMessage, EmailProvider } from "./EmailProvider";

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<void> {
    // Replace this provider with SES, SendGrid, Mailgun, or a queue producer when ready.
    console.info("Email provider invoked", {
      from: env.EMAIL_FROM,
      to: message.to,
      subject: message.subject
    });
  }
}
