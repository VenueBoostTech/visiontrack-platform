"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  User, 
  Users,
  Video,
  AlertTriangle,
  Activity,
  Clock,
  Camera,
  MapPin,
  LayoutGrid,
  CalendarClock,
  ArrowUp,
  ArrowDown,
  AlertCircle,
} from 'lucide-react';
import CameraFeedModal from './CameraFeed/CameraFeedModal';
import Link from 'next/link';  // Add this import

const mockData = {
  staffLocations: [
    { 
      id: 1,
      name: 'John Smith',
      role: 'Security',
      area: 'Main Entrance',
      status: 'Active',
      duration: '2h 15m',
      lastMotion: '2m ago',
      cameraId: 'CAM-001'
    },
    { 
      id: 2,
      name: 'Sarah Johnson',
      role: 'Cashier',
      area: 'Checkout Area',
      status: 'Inactive',
      duration: '45m',
      lastMotion: '15m ago',
      cameraId: 'CAM-003'
    },
    { 
      id: 3,
      name: 'Mike Wilson',
      role: 'Stock Clerk',
      area: 'Storage Room',
      status: 'Active',
      duration: '1h 30m',
      lastMotion: '1m ago',
      cameraId: 'CAM-005'
    }
  ],
  motionAlerts: [
    {
      id: 1,
      timestamp: '14:30:25',
      location: 'Staff Room',
      type: 'Unauthorized Access',
      camera: 'CAM-002',
      status: 'High Alert'
    },
    {
      id: 2,
      timestamp: '14:15:10',
      location: 'Back Office',
      type: 'After Hours Motion',
      camera: 'CAM-004',
      status: 'Warning'
    }
  ],
  cameraStatus: [
    { id: 'CAM-001', name: 'Entrance Camera', status: 'Online', motionDetected: true },
    { id: 'CAM-002', name: 'Staff Room Camera', status: 'Online', motionDetected: false },
    { id: 'CAM-003', name: 'Checkout Camera', status: 'Online', motionDetected: true },
    { id: 'CAM-004', name: 'Back Office Camera', status: 'Offline', motionDetected: false },
    { id: 'CAM-005', name: 'Storage Room Camera', status: 'Online', motionDetected: true }
  ]
};

export default function StaffMonitoring() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCamera, setSelectedCamera] = useState(null);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Staff Monitoring</h2>
          <p className="text-gray-700 mt-1">
            Monitor staff activity and motion detection
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Staff</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">12/15</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <Camera className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Cameras Online</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">4/5</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 1
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <Activity className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Motion Events</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">28</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 5
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Alerts</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">2</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Staff Overview
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'motion'}
            onClick={() => setActiveTab('motion')}
          >
            Motion Detection
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'cameras'}
            onClick={() => setActiveTab('cameras')}
          >
            Camera Status
          </TabsTrigger>
        </TabsList>

        {/* Staff Overview Tab */}
        <TabsContent value="overview" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Staff Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Staff Member</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Last Motion</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Camera</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.staffLocations.map((staff) => (
                      <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="font-medium">{staff.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {staff.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            {staff.area}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            staff.status === 'Active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                          }`}>
                            {staff.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {staff.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {staff.lastMotion}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className="text-primary hover:text-primary/80">
                            {staff.cameraId}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Motion Detection Tab */}
        <TabsContent value="motion" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Motion Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Camera</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.motionAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {alert.timestamp}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {alert.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                            {alert.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {alert.camera}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.status === 'High Alert'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {alert.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

       {/* Camera Status Tab */}
<TabsContent value="cameras" activeTab={activeTab}>
  <Card>
    <CardHeader>
      <CardTitle>Camera System Status</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockData.cameraStatus.map((camera) => (
          <Card key={camera.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    camera.status === 'Online'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-red-100 dark:bg-red-900'
                  }`}>
                    <Camera className={`w-6 h-6 ${
                      camera.status === 'Online'
                        ? 'text-green-600 dark:text-green-300'
                        : 'text-red-600 dark:text-red-300'
                    }`} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{camera.name}</h4>
                    <p className="text-sm text-gray-500">{camera.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  camera.status === 'Online'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {camera.status}
                </span>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">Motion Detection</span>
                <div className={`flex items-center gap-2 ${
                  camera.motionDetected
                    ? 'text-amber-500'
                    : 'text-gray-400'
                }`}>
                  <Activity className="w-4 h-4" />
                  <span className="text-sm">
                    {camera.motionDetected ? 'Movement Detected' : 'No Movement'}
                  </span>
                </div>
              </div>

<div className="mt-4 flex gap-2">
  <button 
    // @ts-ignore
    onClick={() => setSelectedCamera(camera)}
    className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
  >
    View Feed
  </button>
  <Link 
    href={`/platform/properties/cameras/${camera.id}`}
    className="flex-1 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-center"
  >
    Settings
  </Link>
</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>
    </Tabs>
<CameraFeedModal
  isOpen={selectedCamera !== null}
  onClose={() => setSelectedCamera(null)}
  // @ts-ignore
  camera={selectedCamera}
/>
  </div>
);
}