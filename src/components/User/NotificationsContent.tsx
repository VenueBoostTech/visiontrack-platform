// components/User/NotificationsContent.tsx
"use client";

import { useState } from 'react';
import Notification from "@/components/Common/Notification";
import { Package, Users, Shield } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'package',
    title: 'New Package Arrived',
    message: 'A new package has arrived for Unit 303',
    time: '5 min ago',
    icon: <Package className="w-5 h-5" />
  },
  {
    id: 2,
    type: 'community',
    title: 'Community Update',
    message: 'Scheduled maintenance in main lobby tomorrow at 10 AM',
    time: '1 hour ago',
    icon: <Users className="w-5 h-5" />
  },
  {
    id: 3,
    type: 'security',
    title: 'Security Alert',
    message: 'Unusual activity detected at North Gate entrance',
    time: '2 hours ago',
    icon: <Shield className="w-5 h-5" />
  }
];

export default function NotificationsContent() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications
    : notifications.filter(n => n.type === selectedFilter);

  return (
    <>
     <div className="mb-6">
        <h2 className="text-2xl text-gray-700 font-bold">Notifications</h2>
        <p className="text-gray-700 mt-1">Stay updated with all activities across your properties</p>
      </div>
      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        <button 
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${selectedFilter === 'all' 
              ? 'bg-primary text-white' 
              : 'text-dark dark:text-white hover:bg-primary hover:text-white'
            }`}
        >
          All
        </button>
        <button 
          onClick={() => setSelectedFilter('package')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${selectedFilter === 'package' 
              ? 'bg-primary text-white' 
              : 'text-dark dark:text-white hover:bg-primary hover:text-white'
            }`}
        >
          Packages
        </button>
        <button 
          onClick={() => setSelectedFilter('community')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${selectedFilter === 'community' 
              ? 'bg-primary text-white' 
              : 'text-dark dark:text-white hover:bg-primary hover:text-white'
            }`}
        >
          Community
        </button>
        <button 
          onClick={() => setSelectedFilter('security')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors
            ${selectedFilter === 'security' 
              ? 'bg-primary text-white' 
              : 'text-dark dark:text-white hover:bg-primary hover:text-white'
            }`}
        >
          Security
        </button>
      </div>

      {/* Notifications List */}
      {filteredNotifications.map((notification) => (
        <Notification
          key={notification.id}
          icon={notification.icon}
          title={notification.title}
          message={notification.message}
          time={notification.time}
        />
      ))}
    </>
  );
}