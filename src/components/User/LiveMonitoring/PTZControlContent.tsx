"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Minus,
  Home,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Save,
  Bookmark,
  RotateCw,
  Focus
} from "lucide-react";

const mockPresets = [
  { id: 1, name: 'Main Entrance', pan: 45, tilt: 0, zoom: 1 },
  { id: 2, name: 'Loading Area', pan: -30, tilt: -15, zoom: 2 },
  { id: 3, name: 'Parking Overview', pan: 90, tilt: -45, zoom: 3 },
  { id: 4, name: 'Door Access', pan: 0, tilt: 0, zoom: 1.5 }
];

export default function PTZControlMonitoring() {
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activePreset, setActivePreset] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">PTZ Camera Control</h2>
          <p className="text-sm text-gray-500 mt-1">
            Control pan, tilt, and zoom functions of compatible cameras
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            onChange={(e) => setSelectedCamera(e.target.value)}
          >
            <option value="">Select Camera</option>
            <option value="cam1">Main Entrance PTZ</option>
            <option value="cam2">Parking Overview PTZ</option>
            <option value="cam3">Loading Dock PTZ</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Camera Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <img 
                  src="/api/placeholder/1280/720" 
                  alt="PTZ Camera Feed"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 text-white bg-black/50 px-3 py-1 rounded-lg">
                  Zoom: {zoomLevel.toFixed(1)}x
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PTZ Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Direction Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Direction Controls</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
                  <div className="col-start-2">
                    <button className="w-full aspect-square rounded-lg border hover:bg-gray-50 flex items-center justify-center">
                      <ArrowUp className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="col-start-1">
                    <button className="w-full aspect-square rounded-lg border hover:bg-gray-50 flex items-center justify-center">
                      <ArrowLeft className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="col-start-2">
                    <button className="w-full aspect-square rounded-lg border hover:bg-gray-50 flex items-center justify-center">
                      <Home className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="col-start-3">
                    <button className="w-full aspect-square rounded-lg border hover:bg-gray-50 flex items-center justify-center">
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="col-start-2">
                    <button className="w-full aspect-square rounded-lg border hover:bg-gray-50 flex items-center justify-center">
                      <ArrowDown className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
{/* Zoom Controls */}
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Zoom Controls</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <div className="flex justify-center gap-4">
        <button 
          className="p-4 rounded-lg border hover:bg-gray-50" 
          onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}
        >
          <Minus className="w-6 h-6" />
        </button>
        <button 
          className="p-4 rounded-lg border hover:bg-gray-50"
          onClick={() => setZoomLevel(Math.min(10, zoomLevel + 0.5))}
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>
      <div className="flex justify-center gap-4">
        <button className="p-4 rounded-lg border hover:bg-gray-50">
          <Focus className="w-6 h-6" />
        </button>
        <button className="p-4 rounded-lg border hover:bg-gray-50">
          <RotateCw className="w-6 h-6" />
        </button>
      </div>
    </div>
  </CardContent>
</Card>
</div>
</div>

{/* Presets and Settings */}
<div className="lg:col-span-1 space-y-6">
  {/* Presets */}
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Camera Presets</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {mockPresets.map((preset) => (
        <div
          key={preset.id}
          className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
          onClick={() => setActivePreset(preset)}
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4" />
            <div>
              <p className="font-medium">{preset.name}</p>
              <p className="text-sm text-gray-500">
                P: {preset.pan}° T: {preset.tilt}° Z: {preset.zoom}x
              </p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Save className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button className="w-full p-3 border rounded-lg text-center hover:bg-gray-50">
        Add New Preset
      </button>
    </CardContent>
  </Card>

  {/* Camera Settings */}
<Card>
  <CardHeader>
    <CardTitle className="text-lg">Camera Settings</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div>
      <label className="block text-sm font-medium mb-1">Movement Speed</label>
      <input 
        type="range" 
        min="1" 
        max="10" 
        className="w-full"
        defaultValue="5"
      />
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Auto-Focus</label>
      <select className="w-full px-3 py-2 border rounded-lg">
        <option value="auto">Auto</option>
        <option value="manual">Manual</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium mb-1">Image Settings</label>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">Brightness</span>
          <input type="range" min="0" max="100" defaultValue="50" className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Contrast</span>
          <input type="range" min="0" max="100" defaultValue="50" className="w-32" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Saturation</span>
          <input type="range" min="0" max="100" defaultValue="50" className="w-32" />
        </div>
      </div>
    </div>
  </CardContent>
</Card>
</div>  
</div>
</div> 
  );  
} 