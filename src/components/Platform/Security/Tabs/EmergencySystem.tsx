// components/User/Security/Tabs/EmergencySystem.tsx
"use client";

import { useState } from 'react';
import { AlertTriangle, FireExtinguisher, UserX, Siren, CircleDot } from 'lucide-react';

interface EmergencyEvent {
  id: string;
  type: 'fire' | 'violence' | 'suspicious' | 'medical';
  location: string;
  status: 'active' | 'investigating' | 'resolved';
  detectedAt: Date;
  confidence: number;
  cameraId: string;
  imageUrl?: string;
}

export default function EmergencySystem() {
  const [activeEmergencies, setActiveEmergencies] = useState<EmergencyEvent[]>([]);

  return (
    <div className="space-y-6">
      {/* Emergency Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
              <FireExtinguisher className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Fire Detection</p>
              <h3 className="text-xl font-bold">No Alerts</h3>
            </div>
            <div className="ml-auto">
              <CircleDot className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
        {/* More status cards for different types */}
      </div>

      {/* Active Emergency Alerts */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Active Emergencies</h2>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">
            Trigger Emergency Protocol
          </button>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Emergency Cards */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3">
                {/* Emergency footage */}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                      Suspicious Activity Detected
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      South Parking - Camera 12
                    </p>
                  </div>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full dark:bg-red-900 dark:text-red-300">
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Confidence: 94%</span>
                  <button className="text-red-600 hover:text-red-700">
                    Investigate
                  </button>
                </div>
              </div>
            </div>
            {/* More emergency cards */}
          </div>
        </div>
      </div>

      {/* Emergency Protocols */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Emergency Protocols</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="border rounded-lg p-4 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">Fire Emergency Protocol</h3>
                  <p className="text-gray-700 mt-1">
                    Automated response to fire detection
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
                    Edit
                  </button>
                  <div className="w-12 h-6 relative bg-green-200 rounded-full">
                    <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full">
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CircleDot className="w-4 h-4" />
                  Trigger fire alarm system
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CircleDot className="w-4 h-4" />
                  Notify emergency contacts
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <CircleDot className="w-4 h-4" />
                  Lock down elevators
                </p>
              </div>
            </div>
            {/* More protocol cards */}
          </div>
        </div>
      </div>

      {/* Recent Emergency Logs */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Emergency Response Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Event</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Detected</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Response Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Log entries */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}