import { Business, User } from "@prisma/client";
import { Plus, Pencil, Trash } from 'lucide-react';

interface BusinessWithRelations extends Business {
 owner: User;
 staff: Array<{ user: User }>;
}

function Badge({ value }: { value: boolean }) {
 return (
   <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
     value 
       ? "bg-green-100 text-green-800" 
       : "bg-gray-100 text-gray-800"
   }`}>
     {value ? "Yes" : "No"}
   </span>
 );
}

export default function BusinessTable({
 businesses,
}: {
 businesses: BusinessWithRelations[];
}) {
 return (
   <div>
    
     <div className="rounded-lg border bg-white dark:bg-gray-800">
       <table className="w-full">
         <thead>
           <tr className="border-b">
             <th className="px-4 py-3 text-left text-sm font-medium">
               Business Name
             </th>
             <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">
               Created at
             </th>
             <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">
               Updated at
             </th>
             <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
               Local Test
             </th>
             <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
               Prod Test
             </th>
             <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
               Prod
             </th>
             <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
             <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
           </tr>
         </thead>
         <tbody>
           {businesses.map((business: any) => {
             const isProd = !business?.is_local_test && !business?.is_prod_test;
             
             return (
               <tr key={business.id} className="border-b last:border-0">
                 <td className="px-4 py-3">
                   <div>
                     <div className="font-medium">{business.name}</div>
                     <div className="text-sm text-gray-500">{business.email}</div>
                   </div>
                 </td>
                 <td className="hidden lg:table-cell px-4 py-3">
                   <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                     {business.created_at
                       ? new Date(business.created_at).toLocaleDateString()
                       : "N/A"}
                   </span>
                 </td>
                 <td className="hidden lg:table-cell px-4 py-3">
                   <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                     {business.updated_at
                       ? new Date(business.updated_at).toLocaleDateString()
                       : "N/A"}
                   </span>
                 </td>
                 <td className="hidden sm:table-cell px-4 py-3">
                   <Badge value={business?.is_local_test} />
                 </td>
                 <td className="hidden sm:table-cell px-4 py-3">
                   <Badge value={business?.is_prod_test} />
                 </td>
                 <td className="px-4 py-3">
                   <Badge value={isProd} />
                 </td>
                 <td className="px-4 py-3">
                   <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                     business?.is_active 
                       ? "bg-green-100 text-green-800"
                       : "bg-red-100 text-red-800"
                   }`}>
                     {business?.is_active ? "Active" : "Inactive"}
                   </span>
                 </td>
                 <td className="px-4 py-3">
                   <div className="text-right items-right gap-2">
                     <button className="p-1 text-gray-400 hover:text-gray-600">
                       <Pencil className="w-4 h-4" />
                     </button>
                     <button className="p-1 text-gray-400 hover:text-red-600">
                       <Trash className="w-4 h-4" />
                     </button>
                   </div>
                 </td>
               </tr>
             );
           })}
         </tbody>
       </table>
     </div>
   </div>
 );
}