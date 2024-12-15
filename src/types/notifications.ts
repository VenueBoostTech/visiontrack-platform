// types/notifications.ts
import { LucideIcon } from 'lucide-react';

export type NotificationType = 'alert' | 'info' | 'maintenance' | 'package' | 'security';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  icon: LucideIcon;
}