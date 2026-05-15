export const NOTIFICATION_JOB_NAMES = {
    SEND_NOTIFICATION: 'send-notification'
}

export interface SendNotificationJobData {
    userId: string;
    type: string;
    title: string;
    message: string;
}