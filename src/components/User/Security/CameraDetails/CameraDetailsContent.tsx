"use client";

// components/Security/CameraDetails/CameraDetailsContent.tsx
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  Camera, 
  Settings, 
  Activity,
  Clock,
  MapPin,
  Video,
  Shield,
  AlertTriangle
} from 'lucide-react';
import CameraFeedModal from '../CameraFeed/CameraFeedModal';

interface CameraDetailsProps {
  cameraId: string;
}

const DUMMY_CAMERA: CameraData = {
    id: "CAM-0000",
    name: "Camera Not Found",
    location: "Unknown",
    rtspUrl: "N/A",
    status: "INACTIVE",
    type: "INDOOR",
    direction: "N/A",
    zone: {
      name: "Unassigned",
      type: "None"
    },
    uptime: "0h",
    resolution: "N/A",
    frameRate: "N/A",
    recordingMode: "Off",
    storageUsed: "0%",
    lastMotion: "Never",
    capabilities: {
      motion_detection: false,
      facial_recognition: false,
      smoke_detection: false,
      object_tracking: false,
      vehicle_detection: false,
    }
  };

interface CameraData {
    id: string;
    name: string;
    location?: string;
    rtspUrl: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
    type: 'INDOOR' | 'OUTDOOR' | 'THERMAL';
    direction?: string;
    coverageArea?: any;
    capabilities?: {
      motion_detection?: boolean;
      facial_recognition?: boolean;
      smoke_detection?: boolean;
      object_tracking?: boolean;
      vehicle_detection?: boolean;
    };
    zone: {
      name: string;
      type: string;
      building?: {
        name: string;
      }
    };
    // Additional monitoring data
    uptime: string;
    resolution: string;
    frameRate: string;
    recordingMode: string;
    storageUsed: string;
    lastMotion?: string;
  }
  
  export default function CameraDetailsContent({ cameraId }: CameraDetailsProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [camera, setCamera] = useState<CameraData | null>(null);
    const [showFeedModal, setShowFeedModal] = useState(false);
    useEffect(() => {
        const fetchCameraDetails = async () => {
          try {
            const response = await fetch(`/api/user/cameras/${cameraId}`);
            if (!response.ok) throw new Error('Failed to fetch camera details');
            const data = await response.json();
            // Fill in any missing properties with dummy data
            setCamera({
              ...DUMMY_CAMERA,
              ...data
            });
          } catch (error) {
            console.error('Error fetching camera details:', error);
            // Use dummy data if fetch fails
            setCamera(DUMMY_CAMERA);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchCameraDetails();
      }, [cameraId]);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (!camera) {
      return <div>Camera not found</div>;
    }
    
  
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold">{camera.name}</h2>
                <p className="text-sm text-gray-500 mt-1">Camera ID: {camera.id}</p>
            </div>
            <div className="flex gap-2">
                <button 
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90 flex items-center gap-2"
                onClick={() => setShowFeedModal(true)}
                >
                <Video className="w-4 h-4" />
                View Live Feed
                </button>
            </div>
        </div>
  
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  camera.status === 'ACTIVE' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Activity className={`w-6 h-6 ${
                    camera.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <h3 className="text-xl font-bold">{camera.status}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Uptime</p>
                  <h3 className="text-xl font-bold">{camera.uptime}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Storage Used</p>
                  <h3 className="text-xl font-bold">{camera.storageUsed}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
  
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Motion</p>
                  <h3 className="text-xl font-bold">{camera.lastMotion || 'N/A'}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  
        {/* Tabs */}
        <Tabs defaultValue="overview">
        <TabsList className="flex flex-wrap w-full">
          <TabsTrigger 
            className="flex-1 min-w-[120px]"
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            className="flex-1 min-w-[120px]"
            isActive={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </TabsTrigger>
          <TabsTrigger 
            className="flex-1 min-w-[120px]"
            isActive={activeTab === 'recording'}
            onClick={() => setActiveTab('recording')}
          >
            Recording
          </TabsTrigger>
          <TabsTrigger 
            className="flex-1 min-w-[120px]"
            isActive={activeTab === 'detection'}
            onClick={() => setActiveTab('detection')}
          >
            Detection Models
          </TabsTrigger>
      </TabsList>
      
          {/* Overview Tab */}
          <TabsContent value="overview" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Camera Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Location Details</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Location</span>
                          <span className="font-medium">{camera.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Zone</span>
                          <span className="font-medium">{camera.zone.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Direction</span>
                          <span className="font-medium">{camera.direction || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Technical Details</h4>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span>Type</span>
                          <span className="font-medium">{camera.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolution</span>
                          <span className="font-medium">{camera.resolution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Frame Rate</span>
                          <span className="font-medium">{camera.frameRate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* Settings Tab */}
          <TabsContent value="settings" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Camera Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">RTSP URL</label>
                      <input 
                        type="text" 
                        value={camera.rtspUrl}
                        className="mt-1 w-full px-3 py-2 border rounded-md"
                        disabled
                      />
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium">Camera Type</label>
                      <select 
                        defaultValue={camera.type}
                        className="mt-1 w-full px-3 py-2 border rounded-md"
                      >
                        <option value="INDOOR">Indoor</option>
                        <option value="OUTDOOR">Outdoor</option>
                        <option value="THERMAL">Thermal</option>
                      </select>
                    </div>
                  </div>
  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium">Status</label>
                      <select 
                        defaultValue={camera.status}
                        className="mt-1 w-full px-3 py-2 border rounded-md"
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                        <option value="MAINTENANCE">Maintenance</option>
                      </select>
                    </div>
  
                    <div>
                      <label className="block text-sm font-medium">Direction</label>
                      <input 
                        type="text" 
                        defaultValue={camera.direction}
                        className="mt-1 w-full px-3 py-2 border rounded-md"
                        placeholder="e.g., North, South-East"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* Recording Tab */}
          <TabsContent value="recording" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Recording Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Recording Configuration</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Recording Mode</label>
                        <select 
                          defaultValue="24/7"
                          className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                          <option value="24/7">24/7 Recording</option>
                          <option value="motion">Motion-Based</option>
                          <option value="scheduled">Scheduled</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Video Quality</label>
                        <select 
                          defaultValue="high"
                          className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                          <option value="low">Low (720p)</option>
                          <option value="medium">Medium (1080p)</option>
                          <option value="high">High (4K)</option>
                        </select>
                      </div>
                    </div>
                  </div>
  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Storage Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium">Retention Period</label>
                        <select 
                          defaultValue="30"
                          className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                          <option value="7">7 Days</option>
                          <option value="14">14 Days</option>
                          <option value="30">30 Days</option>
                          <option value="60">60 Days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
  
          {/* Detection Models Tab */}
          <TabsContent value="detection" activeTab={activeTab}>
            <Card>
              <CardHeader>
                <CardTitle>Detection Models</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    {Object.entries(camera.capabilities || {}).map(([key, enabled]) => (
                      <div key={key} className="flex items-center gap-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked={enabled}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ml-3">
                            {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-500 mb-4">Detection Settings</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium">Sensitivity</label>
                        <select 
                          defaultValue="medium"
                          className="mt-1 w-full px-3 py-2 border rounded-md"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Minimum Detection Size (%)</label>
                        <input 
                          type="number" 
                          defaultValue={5}
                          min={1}
                          max={100}
                          className="mt-1 w-full px-3 py-2 border rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <CameraFeedModal
        isOpen={showFeedModal}
        onClose={() => setShowFeedModal(false)}
        // @ts-ignore
        camera={camera}
        />
      </div>
    );
  }