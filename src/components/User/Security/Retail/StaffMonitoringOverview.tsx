// components/User/Security/Retail/StaffMonitoringOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
 Users,
 Camera, 
 Activity,
 AlertTriangle,
 User,
 MapPin,
 ArrowUp,
 ArrowDown 
} from "lucide-react";

const mockData = {
 staffLocations: [
   { 
     id: 1,
     name: 'John Smith',
     role: 'Security',
     area: 'Main Entrance',
     status: 'Active',
     lastMotion: '2m ago'
   },
   { 
     id: 2,
     name: 'Sarah Johnson',
     role: 'Cashier', 
     area: 'Checkout Area',
     status: 'Inactive',
     lastMotion: '15m ago'
   }
 ],
 recentAlerts: [
   {
     id: 1,
     type: 'Unauthorized Access',
     location: 'Staff Room',
     timestamp: '14:30:25',
     status: 'High Alert'
   }
 ]
};

export default function StaffMonitoringOverview() {
 return (
   <div className="space-y-6">
     {/* Key Metrics */}
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

     {/* Current Staff Status & Recent Alerts */}
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
       {/* Active Staff Locations */}
       <Card>
         <CardHeader>
           <CardTitle>Current Staff Locations</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-4">
             {mockData.staffLocations.map((staff) => (
               <div key={staff.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                 <div className="flex items-center gap-4">
                   <User className="w-5 h-5 text-gray-400" />
                   <div>
                     <p className="font-medium">{staff.name}</p>
                     <p className="text-sm text-gray-500">{staff.role}</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4">
                   <div className="flex items-center gap-2 text-gray-500">
                     <MapPin className="w-4 h-4" />
                     <span className="text-sm">{staff.area}</span>
                   </div>
                   <span className={`px-2 py-1 text-xs rounded-full ${
                     staff.status === 'Active'
                       ? 'bg-green-100 text-green-800'
                       : 'bg-gray-100 text-gray-800'
                   }`}>
                     {staff.status}
                   </span>
                 </div>
               </div>
             ))}
           </div>
         </CardContent>
       </Card>

       {/* Recent Alerts */}
       <Card>
         <CardHeader>
           <CardTitle>Recent Alerts</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-4">
             {mockData.recentAlerts.map((alert) => (
               <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                 <div className="flex items-center gap-4">
                   <div className="p-2 bg-red-100 rounded-lg">
                     <AlertTriangle className="w-4 h-4 text-red-600" />
                   </div>
                   <div>
                     <p className="font-medium">{alert.type}</p>
                     <p className="text-sm text-gray-500">{alert.location}</p>
                   </div>
                 </div>
                 <div className="text-right">
                   <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                     {alert.status}
                   </span>
                   <p className="text-gray-700 mt-1">{alert.timestamp}</p>
                 </div>
               </div>
             ))}
           </div>
         </CardContent>
       </Card>
     </div>
   </div>
 );
}