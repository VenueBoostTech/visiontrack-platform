// components/User/Security/SecurityTabsRetail.tsx
"use client";

import { useState } from 'react';
import { 
  Monitor, 
  ShieldAlert, 
  UserCheck, 
  Terminal,
  Camera
} from 'lucide-react';

// Component imports
import IncidentManagementOverview from '@/components/User/Security/Retail/IncidentManagementOverview';
import LossPreventionOverview from '@/components/User/Security/Retail/LossPreventionOverview';
import StaffMonitoringOverview from '@/components/User/Security/Retail/StaffMonitoringOverview';
import POSOverview from '@/components/User/Security/Retail/POSOverview';
import CameraOverview from '@/components/User/Security/Retail/CameraOverview';

// Define retail security tabs
const RETAIL_SECURITY_TABS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: <Monitor className="w-4 h-4" />
  },
  {
    id: 'loss-prevention',
    label: 'Loss Prevention',
    icon: <ShieldAlert className="w-4 h-4" />
  },
  {
    id: 'staff',
    label: 'Staff Monitoring',
    icon: <UserCheck className="w-4 h-4" />
  },
  {
    id: 'pos',
    label: 'POS Integration',
    icon: <Terminal className="w-4 h-4" />
  },
  {
    id: 'cameras',
    label: 'Cameras',
    icon: <Camera className="w-4 h-4" />
  }
];

export default function SecurityTabsRetail() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <IncidentManagementOverview />;
      case 'loss-prevention':
        return <LossPreventionOverview />;
      case 'staff':
        return <StaffMonitoringOverview />;
      case 'pos':
        return <POSOverview />;
      case 'cameras':
        return <CameraOverview />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-2 p-4">
            {RETAIL_SECURITY_TABS.map((tab) => (
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
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}