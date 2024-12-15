// components/User/Security/Tabs/MonitoringSystem.tsx
"use client";

import { useState } from 'react';
import { Camera, Activity, Users, Shield } from 'lucide-react';

interface DetectionData {
  id: string;
  cameraId: string;
  type: string;
  confidence: number;
  timestamp: Date;
  status: 'active' | 'resolved';
}

export default function MonitoringSystem() {
  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <Camera className="text-primary" />
            <div>
              <h3 className="text-sm text-gray-500">Active Cameras</h3>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        {/* Similar stats cards */}
      </div>

      {/* Live Detections */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Live Detections</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Detection Cards */}
            <div className="border rounded-lg p-4 dark:border-gray-700">
              <div className="aspect-video bg-gray-100 rounded-lg mb-3">
                {/* Detection Image/Video */}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Person Detected</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    98% confidence
                  </span>
                </div>
                <p className="text-sm text-gray-500">North Entrance Camera</p>
                <p className="text-xs text-gray-400">2 minutes ago</p>
              </div>
            </div>
            {/* More detection cards */}
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Camera Grid</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Camera Feed Cards */}
            <div className="space-y-2">
              <div className="aspect-video bg-gray-100 rounded-lg">
                {/* Camera Feed */}
              </div>
              <p className="text-sm font-medium">Main Entrance</p>
              <p className="text-xs text-gray-500">Processing: Motion Detection</p>
            </div>
            {/* More camera feeds */}
          </div>
        </div>
      </div>
    </div>
  );
}