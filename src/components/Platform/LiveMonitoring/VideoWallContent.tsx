"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LayoutGrid,
  Maximize2,
  Settings,
  Camera,
  Plus,
  ArrowLeftRight,
  ArrowUpDown,
  MonitorUp
} from "lucide-react";

const mockCameras = [
  { id: 'CAM001', name: 'Main Entrance', status: 'active', zone: 'Entrance' },
  { id: 'CAM002', name: 'Parking Lot A', status: 'active', zone: 'Exterior' },
  { id: 'CAM003', name: 'Checkout Area', status: 'active', zone: 'Interior' },
  { id: 'CAM004', name: 'Storage Room', status: 'inactive', zone: 'Restricted' },
  { id: 'CAM005', name: 'Loading Dock', status: 'active', zone: 'Exterior' },
  { id: 'CAM006', name: 'Electronics Dept', status: 'active', zone: 'Interior' }
];

export default function VideoWallContent() {
  const [layout, setLayout] = useState('2x2');
  const [selectedCameras, setSelectedCameras] = useState(mockCameras.slice(0, 4));
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getGridLayout = () => {
    switch(layout) {
      case '1x1': return 'grid-cols-1';
      case '2x2': return 'grid-cols-2';
      case '3x3': return 'grid-cols-3';
      default: return 'grid-cols-2';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Video Wall</h2>
          <p className="text-gray-700 mt-1">
            Monitor multiple camera feeds simultaneously
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="1x1">Single View</option>
            <option value="2x2">2x2 Grid</option>
            <option value="3x3">3x3 Grid</option>
          </select>
          <button 
            className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Maximize2 className="w-4 h-4" />
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Video Wall Grid */}
      <Card>
        <CardContent className="p-4">
          <div className={`grid ${getGridLayout()} gap-4 aspect-[16/9]`}>
            {Array.from({ length: parseInt(layout[0]) * parseInt(layout[2]) }).map((_, index) => (
              <div key={index} className="relative bg-gray-900 rounded-lg overflow-hidden">
                {selectedCameras[index] ? (
                  <>
                    <img 
                      src="/api/placeholder/640/360" 
                      alt={`Camera ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 rounded-lg p-2 text-white text-sm">
                      {selectedCameras[index].name}
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button 
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-800/50"
                    onClick={() => {/* Add camera selection logic */}}
                  >
                    <Plus className="w-8 h-8" />
                    <span>Add Camera</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Camera Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Available Cameras</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockCameras.map((camera) => (
                <div
                  key={camera.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <Camera className="w-4 h-4" />
                    <div>
                      <p className="font-medium">{camera.name}</p>
                      <p className="text-sm text-gray-500">{camera.zone}</p>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${
                    camera.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Layout Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Grid Size</label>
              <div className="flex gap-4">
                <button 
                  className={`px-4 py-2 rounded-lg border ${
                    layout === '2x2' ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setLayout('2x2')}
                >
                  2x2
                </button>
                <button 
                  className={`px-4 py-2 rounded-lg border ${
                    layout === '3x3' ? 'bg-primary text-white' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setLayout('3x3')}
                >
                  3x3
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">View Options</label>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4" />
                  Swap Horizontal
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  Swap Vertical
                </button>
                <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <MonitorUp className="w-4 h-4" />
                  Send to Monitor
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}