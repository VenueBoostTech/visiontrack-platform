// components/Platform/Notes/NoteForm.tsx
"use client";

import { useEffect, useState } from 'react';
import { Camera, Zone } from '@prisma/client';

interface NoteFormProps {
 initialData?: {
   title: string;
   content: string;
   type: string;
   priority: string;
   status: string;
   cameraId?: string;
   zoneId?: string;
 } | null;
 onSubmit: (data: any) => void;
 onClose: () => void;
 isSubmitting?: boolean;
}

export default function NoteForm({
 initialData,
 onSubmit,
 onClose,
 isSubmitting
}: NoteFormProps) {
 const [cameras, setCameras] = useState<Camera[]>([]);
 const [zones, setZones] = useState<Zone[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
   const fetchData = async () => {
     try {
       const [camerasRes, zonesRes] = await Promise.all([
         fetch('/api/platform/cameras'),
         fetch('/api/platform/zones')
       ]);
       
       const [camerasData, zonesData] = await Promise.all([
         camerasRes.json(),
         zonesRes.json()
       ]);

       setCameras(camerasData);
       setZones(zonesData);
     } catch (error) {
       console.error('Error fetching data:', error);
     } finally {
       setIsLoading(false);
     }
   };

   fetchData();
 }, []);

 return (
   <form onSubmit={(e) => {
     e.preventDefault();
     const formData = new FormData(e.currentTarget);
     onSubmit({
       title: formData.get('title'),
       content: formData.get('content'),
       type: formData.get('type'),
       priority: formData.get('priority'),
       status: formData.get('status'),
       cameraId: formData.get('cameraId') || undefined,
       zoneId: formData.get('zoneId') || undefined
     });
   }}>
     <div className="space-y-4">
       <div>
         <label className="block text-sm font-medium mb-1">Title</label>
         <input
           type="text"
           name="title"
           defaultValue={initialData?.title}
           className="w-full px-4 py-2 rounded-lg border"
           required
         />
       </div>

       <div>
         <label className="block text-sm font-medium mb-1">Content</label>
         <textarea
           name="content"
           defaultValue={initialData?.content}
           rows={4}
           className="w-full px-4 py-2 rounded-lg border"
           required
         />
       </div>

       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium mb-1">Type</label>
           <select
             name="type"
             defaultValue={initialData?.type || 'GENERAL'}
             className="w-full px-4 py-2 rounded-lg border"
           >
             <option value="GENERAL">General</option>
             <option value="SECURITY_ISSUE">Security Issue</option>
             <option value="MAINTENANCE">Maintenance</option>
             <option value="CAMERA_NOTE">Camera Note</option>
             <option value="INCIDENT">Incident</option>
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Priority</label>
           <select
             name="priority"
             defaultValue={initialData?.priority || 'LOW'}
             className="w-full px-4 py-2 rounded-lg border"
           >
             <option value="LOW">Low</option>
             <option value="MEDIUM">Medium</option>
             <option value="HIGH">High</option>
             <option value="URGENT">Urgent</option>
           </select>
         </div>
       </div>

       <div>
         <label className="block text-sm font-medium mb-1">Status</label>
         <select
           name="status"
           defaultValue={initialData?.status || 'OPEN'}
           className="w-full px-4 py-2 rounded-lg border"
         >
           <option value="OPEN">Open</option>
           <option value="IN_PROGRESS">In Progress</option>
           <option value="RESOLVED">Resolved</option>
         </select>
       </div>

       <div className="grid grid-cols-2 gap-4">
         <div>
           <label className="block text-sm font-medium mb-1">Related Camera</label>
           <select
             name="cameraId"
             defaultValue={initialData?.cameraId || ''}
             className="w-full px-4 py-2 rounded-lg border"
           >
             <option value="">None</option>
             {cameras.map(camera => (
               <option key={camera.id} value={camera.id}>
                 {camera.name}
               </option>
             ))}
           </select>
         </div>

         <div>
           <label className="block text-sm font-medium mb-1">Related Zone</label>
           <select
             name="zoneId"
             defaultValue={initialData?.zoneId || ''}
             className="w-full px-4 py-2 rounded-lg border"
           >
             <option value="">None</option>
             {zones.map(zone => (
               <option key={zone.id} value={zone.id}>
                 {zone.name}
               </option>
             ))}
           </select>
         </div>
       </div>

       <div className="flex justify-end gap-3">
         <button
           type="button"
           onClick={onClose}
           className="px-4 py-2 rounded-lg border"
           disabled={isSubmitting}
         >
           Cancel
         </button>
         <button
           type="submit"
           className="px-4 py-2 rounded-lg bg-primary text-white"
           disabled={isSubmitting || isLoading}
         >
           {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
         </button>
       </div>
     </div>
   </form>
 );
}