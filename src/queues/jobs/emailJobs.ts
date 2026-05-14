export const EMAIL_JOB_NAMES = {
    SEND_WELCOME_EMAIL: 'send-welcome-email'
}

export interface SendWelcomeEmailJobData {
    userId: string;
    email: string;
    name: string;
}