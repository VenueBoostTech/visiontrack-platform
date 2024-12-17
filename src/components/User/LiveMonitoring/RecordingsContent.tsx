"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Video,
  Calendar,
  Clock,
  Download,
  Search,
  Filter,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from "lucide-react";

const mockRecordings = [
  {
    id: 'REC001',
    cameraId: 'CAM001',
    cameraName: 'Main Entrance',
    date: '2024-03-16',
    startTime: '09:00:00',
    duration: '01:30:00',
    size: '450MB',
    type: 'Motion Detected'
  },
  {
    id: 'REC002',
    cameraId: 'CAM003',
    cameraName: 'Checkout Area',
    date: '2024-03-16',
    startTime: '10:15:00',
    duration: '00:45:00',
    size: '225MB',
    type: 'Scheduled'
  },
  // Add more mock recordings as needed
];

export default function RecordingsContent() {
  const [selectedRecording, setSelectedRecording] = useState(mockRecordings[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Camera Recordings</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage recorded footage
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search recordings..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recordings List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Recordings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {mockRecordings.map((recording) => (
                  <button
                    key={recording.id}
                    onClick={() => setSelectedRecording(recording)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedRecording.id === recording.id ? 'bg-gray-50 dark:bg-gray-800' : ''
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{recording.cameraName}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{recording.date}</span>
                        <Clock className="w-3 h-3" />
                        <span>{recording.startTime}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{recording.duration}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {/* Placeholder for video player */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/api/placeholder/1280/720" 
                    alt="Recording Playback"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Recording Info Overlay */}
                <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-2 text-white">
                  <p className="text-sm">{selectedRecording.cameraName}</p>
                  <p className="text-xs text-gray-300">{selectedRecording.date}</p>
                </div>

  {/* Playback Controls */}
<div className="absolute bottom-4 left-4 right-4">
  <div className="bg-black/50 rounded-lg p-4">
    {/* Progress Bar */}
    <div className="mb-4">
      <div className="w-full h-1 bg-gray-600 rounded-full">
        <div className="w-1/3 h-full bg-primary rounded-full" />
      </div>
      <div className="flex justify-between text-white text-xs mt-1">
        <span>00:00:00</span>
        <span>{selectedRecording.duration}</span>
      </div>
    </div>

    {/* Controls */}
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-primary">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          className="text-white hover:text-primary"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6" />
          )}
        </button>
        <button className="text-white hover:text-primary">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-white hover:text-primary">
          <Download className="w-5 h-5" />
        </button>
        <select className="bg-transparent text-white text-sm border border-white/20 rounded px-2 py-1">
          <option value="1">1x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
          <option value="0.5">0.5x</option>
        </select>
      </div>
    </div>
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