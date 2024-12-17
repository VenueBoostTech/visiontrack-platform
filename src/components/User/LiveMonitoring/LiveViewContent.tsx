"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MonitorDot,
  Camera,
  Settings,
  Maximize2,
  Volume2,
  PlaySquare,
  Download,
  Share2
} from "lucide-react";

const mockCameras = [
  { id: 'CAM001', name: 'Main Entrance', status: 'active', zone: 'Entrance' },
  { id: 'CAM002', name: 'Parking Lot A', status: 'active', zone: 'Exterior' },
  { id: 'CAM003', name: 'Checkout Area', status: 'active', zone: 'Interior' },
  { id: 'CAM004', name: 'Storage Room', status: 'inactive', zone: 'Restricted' }
];

export default function LiveViewContent() {
  const [selectedCamera, setSelectedCamera] = useState(mockCameras[0]);
  const [layout, setLayout] = useState('single');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Live Camera View</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor real-time camera feeds
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="single">Single View</option>
            <option value="2x2">2x2 Grid</option>
            <option value="3x3">3x3 Grid</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Camera List */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cameras</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockCameras.map((camera) => (
                  <button
                    key={camera.id}
                    onClick={() => setSelectedCamera(camera)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedCamera.id === camera.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                  >
                    <Camera className="w-4 h-4" />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{camera.name}</p>
                      <p className="text-sm text-gray-500">{camera.zone}</p>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${
                      camera.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Feed */}
        <div className="md:col-span-3">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {/* Placeholder for video feed */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/1280/720" 
                    alt="Camera Feed"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Camera Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-2 text-white">
                  <p className="text-sm">{selectedCamera.name}</p>
                  <p className="text-xs text-gray-300">{selectedCamera.id}</p>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <PlaySquare className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Camera Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Camera Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resolution</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>1080p</option>
                    <option>720p</option>
                    <option>480p</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Frame Rate</label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>30 fps</option>
                    <option>24 fps</option>
                    <option>15 fps</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stream Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bitrate</span>
                    <span>2.5 Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Latency</span>
                    <span>234ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Codec</span>
                    <span>H.264</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}