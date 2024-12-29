export interface NotificationChannel {
    id: string;
    type: "email" | "sms" | "notification" | "logs";
    name: string;
    description: string;
    enabled: boolean;
    config: {
        emails?: string[];
        phone_numbers?: string[];
        webhookUrl?: string;
    };
} 