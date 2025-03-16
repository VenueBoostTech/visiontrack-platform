// components/User/Security/SecurityTabs.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Monitor, Car, AlertTriangle, FileText, Bell } from 'lucide-react';
import MonitoringSystem from '@/components/User/Security/Tabs/MonitoringSystem';
import EmergencySystem from '@/components/User/Security/Tabs/EmergencySystem';
import IncidentManagement from '@/components/User/Security/Tabs/IncidentManagement';
import AlertSystem from '@/components/User/Security/Tabs/AlertSystem';

export default function SecurityTabs() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const router = useRouter();

  const tabs = [
    {
      id: 'monitoring',
      label: 'Monitoring',
      icon: <Monitor className="w-4 h-4" />,
      component: <MonitoringSystem />
    },
    {
      id: 'emergency',
      label: 'Emergency',
      icon: <AlertTriangle className="w-4 h-4" />,
      component: <EmergencySystem />
    },
    {
      id: 'incidents',
      label: 'Incidents',
      icon: <FileText className="w-4 h-4" />,
      component: <IncidentManagement />
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: <Bell className="w-4 h-4" />,
      component: <AlertSystem />
    }
  ];

  const quickActions = [
    {
      label: "View All Cameras",
      onClick: () => router.push('/platform/properties/cameras')
    },
    {
      label: "Security Report",
      onClick: () => router.push('/platform/security/reports')
    },
    {
      label: "Manage Access",
      onClick: () => router.push('/platform/security/access')
    },
    {
      label: "Alert Settings",
      onClick: () => router.push('/platform/security/alerts')
    }
  ];

  // Quick Stats for the overview
  const stats = [
    {
      title: "Active Cameras",
      value: "24",
      change: "+2",
      icon: <Monitor className="w-6 h-6 text-primary" />
    },
    {
      title: "Recent Alerts",
      value: "7",
      change: "-3",
      icon: <Bell className="w-6 h-6 text-orange-500" />
    },
    {
      title: "Active Incidents",
      value: "2",
      change: "+1",
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />
    },
    {
      title: "Detection Rate",
      value: "98%",
      change: "+0.5%",
      icon: <FileText className="w-6 h-6 text-green-500" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <span className={`text-sm ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from last period
                </span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-full">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 p-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Motion Detected</p>
                  <p className="text-sm text-gray-500">South Entrance Camera</p>
                  <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}