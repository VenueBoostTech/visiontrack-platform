// components/Platform/Security/Tabs/ParkingSecurity.tsx
"use client";

import { useState } from 'react';
import { Car, AlertTriangle, Clock } from 'lucide-react';

interface ParkingEvent {
  id: string;
  licensePlate: string;
  type: 'entry' | 'exit' | 'violation';
  location: string;
  timestamp: Date;
  imageUrl?: string;
}

export default function ParkingSecurity() {
  return (
    <div className="space-y-6">
      {/* Parking Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Car className="text-primary" />
            <div>
              <h3 className="text-sm text-gray-500">Current Occupancy</h3>
              <p className="text-2xl font-bold">156/200</p>
            </div>
          </div>
        </div>
        {/* More stats */}
      </div>

      {/* Live Vehicle Detection */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Recent Vehicle Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">License Plate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Time</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Vehicle entries */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Violation Alerts */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Active Violations</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Violation Cards */}
            <div className="border rounded-lg p-4 dark:border-gray-700">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3">
                {/* Violation Image */}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Unauthorized Parking</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-sm text-gray-500">Zone B - Spot 23</p>
                <p className="text-xs text-gray-400">Started 15 minutes ago</p>
              </div>
            </div>
            {/* More violation cards */}
          </div>
        </div>
      </div>
    </div>
  );
}