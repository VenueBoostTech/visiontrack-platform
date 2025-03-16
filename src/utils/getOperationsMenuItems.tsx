// utils/getOperationsMenuItems.tsx
import { 
    BarChart2, 
    Users, 
    Store, 
    PackageSearch, 
    UserCog 
  } from 'lucide-react';
  
  export const getOperationsMenuItems = (businessType: string = 'RETAIL') => {
    if (businessType === 'RETAIL') {
      return [
        {
          id: "8-1",
          title: "Store Analytics",
          path: "/platform/operations/analytics",
          icon: <BarChart2 className="w-4 h-4" />
        },
        {
          id: "8-2",
          title: "Queue Management",
          path: "/platform/operations/queue",
          icon: <Users className="w-4 h-4" />
        },
        {
          id: "8-3",
          title: "Display Monitoring",
          path: "/platform/operations/displays",
          icon: <Store className="w-4 h-4" />
        },
        {
          id: "8-4",
          title: "Inventory Tracking",
          path: "/platform/operations/inventory",
          icon: <PackageSearch className="w-4 h-4" />
        },
        {
          id: "8-5",
          title: "Staff Optimization",
          path: "/platform/operations/staff-optimization",
          icon: <UserCog className="w-4 h-4" />
        }
      ];
    }
  
    return [];
  };