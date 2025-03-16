// components/User/Security/Retail/CameraOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Activity, AlertCircle, SignalHigh, ArrowUp } from "lucide-react";

const mockData = {
 recentDetections: [
   {
     id: 1,
     type: "Person Detected",
     location: "North Entrance",
     confidence: 98,
     time: "2 min ago"
   },
   {
     id: 2, 
     type: "Motion Detected",
     location: "Storage Area",
     confidence: 95,
     time: "5 min ago"
   }
 ],
 cameraStatus: [
   { id: 'CAM-001', name: 'Main Entrance', status: 'Online', activity: true },
   { id: 'CAM-002', name: 'Store Floor', status: 'Online', activity: true },
   { id: 'CAM-003', name: 'Back Office', status: 'Offline', activity: false },
   { id: 'CAM-004', name: 'Storage Room', status: 'Online', activity: true }
 ]
};

export default function CameraOverview() {
 return (
   <div className="space-y-6">
     {/* Key Metrics */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Card>
         <CardContent className="p-6">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
               <Camera className="w-6 h-6 text-green-600 dark:text-green-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Active Cameras</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">24/25</h3>
                 <span className="text-xs text-amber-500">1 Offline</span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-6">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
               <Activity className="w-6 h-6 text-blue-600 dark:text-blue-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Active Detections</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">18</h3>
                 <span className="text-xs text-red-500 flex items-center">
                   <ArrowUp className="w-3 h-3" /> 5
                 </span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-6">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
               <SignalHigh className="w-6 h-6 text-purple-600 dark:text-purple-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">System Health</p>
               <h3 className="text-2xl font-bold">96%</h3>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-6">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
               <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Alerts</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">3</h3>
                 <span className="text-xs text-red-500">Requires Attention</span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>
     </div>

     {/* Camera Grid Preview */}
     <Card>
       <CardHeader>
         <CardTitle>Camera Status</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {mockData.cameraStatus.map((camera) => (
             <div key={camera.id} className="border rounded-lg p-4 dark:border-gray-700">
               <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                 <Camera className="w-8 h-8 text-gray-400" />
               </div>
               <div className="mt-3">
                 <div className="flex justify-between items-center">
                   <p className="text-sm font-medium">{camera.name}</p>
                   <span className={`flex h-2 w-2 rounded-full ${
                     camera.status === 'Online' ? 'bg-green-500' : 'bg-red-500'
                   }`} />
                 </div>
                 <p className="text-xs text-gray-500 mt-1">{camera.id}</p>
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>

     {/* Recent Detections */}
     <Card>
       <CardHeader>
         <CardTitle>Recent Detections</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="space-y-4">
           {mockData.recentDetections.map((detection) => (
             <div key={detection.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
               <div className="flex items-center gap-4">
                 <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                   <Activity className="w-4 h-4 text-blue-600" />
                 </div>
                 <div>
                   <p className="font-medium">{detection.type}</p>
                   <p className="text-sm text-gray-500">{detection.location}</p>
                 </div>
               </div>
               <div className="text-right">
                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                   {detection.confidence}% confidence
                 </span>
                 <p className="text-gray-700 mt-1">{detection.time}</p>
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>
   </div>
 );
}