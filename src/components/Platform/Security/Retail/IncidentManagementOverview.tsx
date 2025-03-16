// components/User/Security/Retail/IncidentManagementOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
 AlertCircle, 
 CheckCircle2, 
 AlertTriangle,
 Clock,
 FileText
} from "lucide-react";

const mockData = {
 recentIncidents: [
   {
     id: 'INC-001',
     title: 'Shoplifting Attempt',
     type: 'Theft',
     status: 'Under Investigation',
     priority: 'High',
     location: 'Electronics Department',
     timestamp: '2024-03-16T14:30:00'
   },
   {
     id: 'INC-002',
     title: 'Customer Dispute',
     type: 'Disturbance',
     status: 'Resolved',
     priority: 'Medium',
     location: 'Customer Service',
     timestamp: '2024-03-16T13:15:00'
   }
 ]
};

export default function IncidentManagementOverview() {
 return (
   <div className="space-y-6">
     {/* Key Metrics */}
     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
       <Card>
         <CardContent className="p-2">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
               <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Active Incidents</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">12</h3>
                 <span className="text-xs text-red-500">+3 today</span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-2">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
               <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Resolved Today</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">8</h3>
                 <span className="text-xs text-green-500">↑ 2</span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-2">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
               <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">High Priority</p>
               <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-bold">5</h3>
                 <span className="text-xs text-red-500">Requires Action</span>
               </div>
             </div>
           </div>
         </CardContent>
       </Card>

       <Card>
         <CardContent className="p-2">
           <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
               <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
             </div>
             <div>
               <p className="text-sm text-gray-500">Avg Resolution</p>
               <h3 className="text-2xl font-bold">2.5h</h3>
             </div>
           </div>
         </CardContent>
       </Card>
     </div>

     {/* Recent Incidents List */}
     <Card>
       <CardHeader>
         <CardTitle>Recent Incidents</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="space-y-4">
           {mockData.recentIncidents.map((incident) => (
             <div key={incident.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
               <div className="flex items-center gap-4">
                 <div className={`p-2 rounded-lg ${
                   incident.priority === 'High' 
                     ? 'bg-red-100' 
                     : 'bg-yellow-100'
                 }`}>
                   <AlertTriangle className={`w-4 h-4 ${
                     incident.priority === 'High'
                       ? 'text-red-600'
                       : 'text-yellow-600'
                   }`} />
                 </div>
                 <div>
                   <div className="flex items-center gap-2">
                     <p className="font-medium">{incident.title}</p>
                     <span className="px-2 py-1 text-xs rounded-full bg-gray-200">
                       {incident.type}
                     </span>
                   </div>
                   <p className="text-sm text-gray-500">{incident.location}</p>
                 </div>
               </div>
               <div className="text-right">
                 <span className={`px-2 py-1 text-xs rounded-full ${
                   incident.status === 'Under Investigation' 
                     ? 'bg-yellow-100 text-yellow-800'
                     : 'bg-green-100 text-green-800'
                 }`}>
                   {incident.status}
                 </span>
                 <p className="text-gray-700 mt-1">
                   {new Date(incident.timestamp).toLocaleTimeString('en-US', {
                     hour: '2-digit',
                     minute: '2-digit',
                     hour12: true
                   })}
                 </p>
               </div>
             </div>
           ))}
         </div>
       </CardContent>
     </Card>

     {/* Incident Categories Summary */}
     <Card>
       <CardHeader>
         <CardTitle>Incident Distribution</CardTitle>
       </CardHeader>
       <CardContent>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
             <div className="flex justify-between items-center mb-2">
               <span className="font-medium">Theft</span>
               <span className="text-sm text-gray-500">48%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-red-500 h-2 rounded-full" style={{ width: '48%' }} />
             </div>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
             <div className="flex justify-between items-center mb-2">
               <span className="font-medium">Security</span>
               <span className="text-sm text-gray-500">32%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-amber-500 h-2 rounded-full" style={{ width: '32%' }} />
             </div>
           </div>
           <div className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
             <div className="flex justify-between items-center mb-2">
               <span className="font-medium">Safety</span>
               <span className="text-sm text-gray-500">20%</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }} />
             </div>
           </div>
         </div>
       </CardContent>
     </Card>
   </div>
 );
}