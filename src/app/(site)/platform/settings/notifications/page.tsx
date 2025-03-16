// app/user/notifications/page.tsx
import { Metadata } from "next";
import NotificationsContent from "@/components/User/NotificationsContent";

export const metadata: Metadata = {
  title: `Notifications - ${process.env.PLATFORM_NAME}`,
  description: `View all your notifications`,
};

export default function NotificationsPage() {
  return (
    <div className='px-5'>
      <NotificationsContent />
    </div>
  );
}