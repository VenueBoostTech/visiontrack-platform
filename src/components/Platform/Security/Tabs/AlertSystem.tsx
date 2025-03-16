// components/Platform/Security/Tabs/AlertSystem.tsx
"use client";

import { useState } from 'react';
import { Bell, Settings, AlertTriangle, Check, X } from 'lucide-react';

interface AlertRule {
  id: string;
  name: string;
  type: string;
  condition: string;
  actions: string[];
  enabled: boolean;
}

interface Alert {
  id: string;
  title: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'acknowledged' | 'resolved';
  timestamp: Date;
  location: string;
  details: string;
}

export default function AlertSystem() {
  const [activeTab, setActiveTab] = useState<'current' | 'rules'>('current');

  return (
    <div className="space-y-6">
      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Alerts</p>
              <h3 className="text-xl font-bold">5</h3>
            </div>
          </div>
        </div>
        {/* More stats */}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="border-b dark:border-gray-700">
          <div className="flex gap-4 p-4">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 text-sm font-medium rounded-lg
                ${activeTab === 'current' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              Current Alerts
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`px-4 py-2 text-sm font-medium rounded-lg
                ${activeTab === 'rules' 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
            >
              Alert Rules
            </button>
          </div>
        </div>

        {/* Current Alerts */}
        {activeTab === 'current' && (
          <div className="p-4">
            <div className="space-y-4">
              {/* Alert Cards */}
              <div className="border rounded-lg p-4 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">Unauthorized Access Detected</h3>
                    <p className="text-sm text-gray-600 mt-1">North Gate Entrance</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium leading-none bg-red-100 text-red-800 rounded-full">
                    High Priority
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Camera detected unauthorized access attempt at main gate.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">2 minutes ago</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-50">
                      <Check className="w-4 h-4 text-green-600" />
                    </button>
                    <button className="p-2 bg-white rounded-lg hover:bg-gray-50">
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
              {/* More alert cards */}
            </div>
          </div>
        )}

        {/* Alert Rules */}
        {activeTab === 'rules' && (
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <h3 className="font-medium">Alert Rules</h3>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm">
                New Rule
              </button>
            </div>
            <div className="space-y-4">
              {/* Rule Cards */}
              <div className="border rounded-lg p-4 dark:border-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">After Hours Motion Detection</h4>
                    <p className="text-gray-700 mt-1">
                      Alert when motion is detected outside business hours
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Settings className="w-4 h-4" />
                    </button>
                    {/* Toggle Switch */}
                    <div className="w-12 h-6 bg-green-200 rounded-full relative">
                      <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full">
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">Conditions:</p>
                  <ul className="text-sm text-gray-500 list-disc list-inside">
                    <li>Time between 8PM and 6AM</li>
                    <li>Motion detected in any camera</li>
                    <li>No scheduled maintenance</li>
                  </ul>
                </div>
              </div>
              {/* More rule cards */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}