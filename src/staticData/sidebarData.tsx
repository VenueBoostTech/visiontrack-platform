import { Sidebar } from "@/types/sidebar";
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Briefcase,
  Eye, 
  CalendarClock,
  CalendarCheck,
  Gauge,
  Car,
  HardHat,
  Forklift,
  Truck,
  Factory,
  ClipboardList,
  PackageCheck,
  Package,
  Scan,
  Clipboard,
  ClipboardCheck,
  Home,
  Building2,
  DoorClosed,
  Lock,
  Fingerprint,
  UserCheck,
  BadgeAlert,
  Mail,
  BadgeCheck,
  UserX,
  Clock,
  Bird,
  CheckCircle,
  CircleDashed,
  CircleDot,
  Warehouse,
  AreaChart,
  Tag,
  ShieldAlert,
  ShoppingBasket,
  Cctv,
  SlidersHorizontal,
  WrenchIcon,
  
  // Original imports from your code
  MonitorPlay,
  Building,
  MonitorDot,
  Video,
  LayoutPanelTop,
  Camera as CameraControl,
  UserCog,
  Key,
  Building as BuildingIcon,
  Bell as BellIcon,
  ScrollText,
  CreditCard,
  Store,
  KeyRound,
  LayoutDashboard,
  Shield,
  Camera,
  Settings,
  BarChart3,
  Boxes,
  FolderSync,
  Server,
  Cpu,
  BellRing,
  LineChart,
  Lock as LockIcon,
  Globe,
  Layers,
  HeartPulse,
  BrainCircuit,
  Code,
  Network,
  FolderSyncIcon,
  
  // New imports for AI menu
  Database,
  FileInput,
  Zap,
  FolderClosed
} from "lucide-react";

/**
 * Get menu items for AI Data section
 * @returns Array of sidebar menu items for data management
 */
export const getAIDataMenuItems = (): Sidebar[] => {
  return [
    {
      id: "ai-data-1",
      title: "Datasets",
      path: "/platform/ai/data/datasets",
      icon: <Database className="w-4 h-4" />
    },
    {
      id: "ai-data-2",
      title: "Raw Data",
      path: "/platform/ai/data/raw-data",
      icon: <FileInput className="w-4 h-4" />
    }
  ];
};

/**
 * Get menu items for AI Models section
 * @returns Array of sidebar menu items for model management
 */
export const getAIModelMenuItems = (): Sidebar[] => {
  return [
    {
      id: "ai-models-1",
      title: "ReadyGo Models",
      path: "/platform/ai/models/ready-models",
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: "ai-models-2",
      title: "Custom Models",
      path: "/platform/ai/models/custom-models",
      icon: <BrainCircuit className="w-4 h-4" />
    }
  ];
};

/**
 * Get menu items for Commercial Real Estate vertical
 * @returns Array of sidebar menu items
 */
export const getCommercialRealEstateMenuItems = (): Sidebar[] => {
  return [
    {
      id: "analytics-1",
      title: "Occupancy Analytics",
      path: "/platform/analytics/occupancy",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "analytics-2",
      title: "Space Utilization",
      path: "/platform/analytics/space-utilization",
      icon: <AreaChart className="w-4 h-4" />
    },
    {
      id: "analytics-3",
      title: "Tenant Traffic",
      path: "/platform/analytics/tenant-traffic",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: "analytics-4",
      title: "Common Area Usage",
      path: "/platform/analytics/common-areas",
      icon: <Building2 className="w-4 h-4" />
    },
    {
      id: "analytics-5",
      title: "Parking Analytics",
      path: "/platform/analytics/parking",
      icon: <Car className="w-4 h-4" />
    }
  ];
};

/**
 * Get security menu items for Commercial Real Estate vertical
 * @returns Array of sidebar menu items
 */
export const getCommercialRealEstateSecurityMenuItems = (): Sidebar[] => {
  return [
    {
      id: "security-1",
      title: "Access Control",
      path: "/platform/security/access-control",
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: "security-2",
      title: "Visitor Management",
      path: "/platform/security/visitor-management",
      icon: <UserCheck className="w-4 h-4" />
    },
    {
      id: "security-3",
      title: "Perimeter Detection",
      path: "/platform/security/perimeter",
      icon: <ShieldAlert className="w-4 h-4" />
    },
    {
      id: "security-4",
      title: "Incident Reports",
      path: "/platform/security/incidents",
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      id: "security-5",
      title: "Security Patrols",
      path: "/platform/security/patrols",
      icon: <Eye className="w-4 h-4" />
    }
  ];
};

/**
 * Get operations menu items for Commercial Real Estate vertical
 * @returns Array of sidebar menu items
 */
export const getCommercialRealEstateOperationsMenuItems = (): Sidebar[] => {
  return [
    {
      id: "operations-1",
      title: "Maintenance Requests",
      path: "/platform/operations/maintenance",
      icon: <WrenchIcon className="w-4 h-4" />
    },
    {
      id: "operations-2",
      title: "Tenant Services",
      path: "/platform/operations/tenant-services",
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      id: "operations-3",
      title: "Facility Scheduling",
      path: "/platform/operations/facility-scheduling",
      icon: <CalendarCheck className="w-4 h-4" />
    },
    {
      id: "operations-4",
      title: "Service Providers",
      path: "/platform/operations/service-providers",
      icon: <UserCheck className="w-4 h-4" />
    }
  ];
};

/**
 * Get menu items for Multi-family Residential vertical
 * @returns Array of sidebar menu items
 */
export const getMultiFamilyResidentialMenuItems = (): Sidebar[] => {
  return [
    {
      id: "analytics-1",
      title: "Resident Analytics",
      path: "/platform/analytics/resident",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "analytics-2",
      title: "Amenity Usage",
      path: "/platform/analytics/amenity-usage",
      icon: <CircleDot className="w-4 h-4" />
    },
    {
      id: "analytics-3",
      title: "Package Analytics",
      path: "/platform/analytics/packages",
      icon: <Package className="w-4 h-4" />
    },
    {
      id: "analytics-4",
      title: "Visitor Patterns",
      path: "/platform/analytics/visitors",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: "analytics-5",
      title: "Parking Utilization",
      path: "/platform/analytics/parking",
      icon: <Car className="w-4 h-4" />
    }
  ];
};

/**
 * Get security menu items for Multi-family Residential vertical
 * @returns Array of sidebar menu items
 */
export const getMultiFamilyResidentialSecurityMenuItems = (): Sidebar[] => {
  return [
    {
      id: "security-1",
      title: "Access Control",
      path: "/platform/security/access-control",
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: "security-2",
      title: "Visitor Verification",
      path: "/platform/security/visitor-verification",
      icon: <BadgeCheck className="w-4 h-4" />
    },
    {
      id: "security-3",
      title: "Package Security",
      path: "/platform/security/package-security",
      icon: <PackageCheck className="w-4 h-4" />
    },
    {
      id: "security-4",
      title: "Resident Alerts",
      path: "/platform/security/resident-alerts",
      icon: <BadgeAlert className="w-4 h-4" />
    },
    {
      id: "security-5",
      title: "Unauthorized Access",
      path: "/platform/security/unauthorized",
      icon: <UserX className="w-4 h-4" />
    }
  ];
};

/**
 * Get operations menu items for Multi-family Residential vertical
 * @returns Array of sidebar menu items
 */
export const getMultiFamilyResidentialOperationsMenuItems = (): Sidebar[] => {
  return [
    {
      id: "operations-1",
      title: "Package Management",
      path: "/platform/operations/packages",
      icon: <Package className="w-4 h-4" />
    },
    {
      id: "operations-2",
      title: "Maintenance Requests",
      path: "/platform/operations/maintenance",
      icon: <WrenchIcon className="w-4 h-4" />
    },
    {
      id: "operations-3",
      title: "Amenity Booking",
      path: "/platform/operations/amenity-booking",
      icon: <CalendarCheck className="w-4 h-4" />
    },
    {
      id: "operations-4",
      title: "Resident Communication",
      path: "/platform/operations/communication",
      icon: <Mail className="w-4 h-4" />
    }
  ];
};

/**
 * Get menu items for Manufacturing vertical
 * @returns Array of sidebar menu items
 */
export const getManufacturingMenuItems = (): Sidebar[] => {
  return [
    {
      id: "analytics-1",
      title: "Production Analytics",
      path: "/platform/analytics/production",
      icon: <Factory className="w-4 h-4" />
    },
    {
      id: "analytics-2",
      title: "Worker Productivity",
      path: "/platform/analytics/productivity",
      icon: <Gauge className="w-4 h-4" />
    },
    {
      id: "analytics-3",
      title: "Equipment Usage",
      path: "/platform/analytics/equipment",
      icon: <Forklift className="w-4 h-4" />
    },
    {
      id: "analytics-4",
      title: "Workflow Analysis",
      path: "/platform/analytics/workflow",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: "analytics-5",
      title: "Quality Control",
      path: "/platform/analytics/quality",
      icon: <CheckCircle className="w-4 h-4" />
    }
  ];
};

/**
 * Get security menu items for Manufacturing vertical
 * @returns Array of sidebar menu items
 */
export const getManufacturingSecurityMenuItems = (): Sidebar[] => {
  return [
    {
      id: "security-1",
      title: "Worker Safety",
      path: "/platform/security/worker-safety",
      icon: <HardHat className="w-4 h-4" />
    },
    {
      id: "security-2",
      title: "Restricted Areas",
      path: "/platform/security/restricted-areas",
      icon: <ShieldAlert className="w-4 h-4" />
    },
    {
      id: "security-3",
      title: "Equipment Monitoring",
      path: "/platform/security/equipment-monitoring",
      icon: <Cctv className="w-4 h-4" />
    },
    {
      id: "security-4",
      title: "Safety Compliance",
      path: "/platform/security/safety-compliance",
      icon: <ClipboardCheck className="w-4 h-4" />
    },
    {
      id: "security-5",
      title: "Incident Reports",
      path: "/platform/security/incidents",
      icon: <AlertTriangle className="w-4 h-4" />
    }
  ];
};

/**
 * Get operations menu items for Manufacturing vertical
 * @returns Array of sidebar menu items
 */
export const getManufacturingOperationsMenuItems = (): Sidebar[] => {
  return [
    {
      id: "operations-1",
      title: "Production Tracking",
      path: "/platform/operations/production-tracking",
      icon: <Scan className="w-4 h-4" />
    },
    {
      id: "operations-2",
      title: "Quality Assurance",
      path: "/platform/operations/quality-assurance",
      icon: <ClipboardCheck className="w-4 h-4" />
    },
    {
      id: "operations-3",
      title: "Inventory Management",
      path: "/platform/operations/inventory",
      icon: <Warehouse className="w-4 h-4" />
    },
    {
      id: "operations-4",
      title: "Maintenance Scheduling",
      path: "/platform/operations/maintenance",
      icon: <CalendarClock className="w-4 h-4" />
    },
    {
      id: "operations-5",
      title: "Shift Management",
      path: "/platform/operations/shifts",
      icon: <Clock className="w-4 h-4" />
    }
  ];
};

/**
 * Get menu items for Retail Operations vertical
 * This function already exists in your code, included here for reference only
 */
export const getRetailMenuItems = (): Sidebar[] => {
  return [
    {
      id: "analytics-1",
      title: "Customer Analytics",
      path: "/platform/analytics/customers",
      icon: <Users className="w-4 h-4" />
    },
    {
      id: "analytics-2",
      title: "Sales Performance",
      path: "/platform/analytics/sales",
      icon: <ShoppingBag className="w-4 h-4" />
    },
    {
      id: "analytics-3",
      title: "Store Traffic",
      path: "/platform/analytics/traffic",
      icon: <TrendingUp className="w-4 h-4" />
    },
    {
      id: "analytics-4",
      title: "Merchandise Analysis",
      path: "/platform/analytics/merchandise",
      icon: <Tag className="w-4 h-4" />
    },
    {
      id: "analytics-5",
      title: "Conversion Rate",
      path: "/platform/analytics/conversion",
      icon: <ShoppingBasket className="w-4 h-4" />
    }
  ];
};

/**
 * Main function to get analytics menu items based on business type
 * @param businessType The type of business: 'RETAIL', 'COMMERCIAL_REAL_ESTATE', 'MULTI_FAMILY_RESIDENTIAL', or 'MANUFACTURING'
 * @returns Array of sidebar menu items for analytics
 */
export const getAnalyticsMenuItems = (businessType: string): Sidebar[] => {
  switch (businessType) {
    case 'RETAIL':
      return getRetailMenuItems();
    case 'COMMERCIAL_REAL_ESTATE':
      return getCommercialRealEstateMenuItems();
    case 'MULTI_FAMILY_RESIDENTIAL':
      return getMultiFamilyResidentialMenuItems();
    case 'MANUFACTURING':
      return getManufacturingMenuItems();
    default:
      return getRetailMenuItems(); // Default to retail
  }
};

/**
 * Main function to get security menu items based on business type
 * @param businessType The type of business: 'RETAIL', 'COMMERCIAL_REAL_ESTATE', 'MULTI_FAMILY_RESIDENTIAL', or 'MANUFACTURING'
 * @returns Array of sidebar menu items for security
 */
export const getSecurityMenuItems = (businessType: string): Sidebar[] => {
  switch (businessType) {
    case 'RETAIL':
      // Use the existing security menu items for retail
      return [
        {
          id: "security-1",
          title: "Suspicious Activity",
          path: "/platform/security/suspicious",
          icon: <AlertTriangle className="w-4 h-4" />
        },
        {
          id: "security-2",
          title: "Theft Prevention",
          path: "/platform/security/theft",
          icon: <ShieldAlert className="w-4 h-4" />
        },
        {
          id: "security-3",
          title: "Access Control",
          path: "/platform/security/access",
          icon: <Lock className="w-4 h-4" />
        },
        {
          id: "security-4",
          title: "Reports",
          path: "/platform/security/reports",
          icon: <FileText className="w-4 h-4" />
        }
      ];
    case 'COMMERCIAL_REAL_ESTATE':
      return getCommercialRealEstateSecurityMenuItems();
    case 'MULTI_FAMILY_RESIDENTIAL':
      return getMultiFamilyResidentialSecurityMenuItems();
    case 'MANUFACTURING':
      return getManufacturingSecurityMenuItems();
    default:
      return []; // Default to empty array
  }
};

/**
 * Main function to get operations menu items based on business type
 * @param businessType The type of business: 'RETAIL', 'COMMERCIAL_REAL_ESTATE', 'MULTI_FAMILY_RESIDENTIAL', or 'MANUFACTURING'
 * @returns Array of sidebar menu items for operations
 */
export const getOperationsMenuItems = (businessType: string): Sidebar[] => {
  switch (businessType) {
    case 'RETAIL':
      // Use the existing operations menu items for retail
      return [
        {
          id: "operations-1",
          title: "Inventory Management",
          path: "/platform/operations/inventory",
          icon: <Warehouse className="w-4 h-4" />
        },
        {
          id: "operations-2",
          title: "Staff Scheduling",
          path: "/platform/operations/staff-scheduling",
          icon: <CalendarCheck className="w-4 h-4" />
        },
        {
          id: "operations-3",
          title: "Queue Management",
          path: "/platform/operations/queue",
          icon: <Users className="w-4 h-4" />
        },
        {
          id: "operations-4",
          title: "Store Compliance",
          path: "/platform/operations/compliance",
          icon: <Clipboard className="w-4 h-4" />
        }
      ];
    case 'COMMERCIAL_REAL_ESTATE':
      return getCommercialRealEstateOperationsMenuItems();
    case 'MULTI_FAMILY_RESIDENTIAL':
      return getMultiFamilyResidentialOperationsMenuItems();
    case 'MANUFACTURING':
      return getManufacturingOperationsMenuItems();
    default:
      return []; // Default to empty array
  }
};

/**
 * Modified function to get user sidebar data based on business type
 * @param businessType The type of business: 'RETAIL', 'COMMERCIAL_REAL_ESTATE', 'MULTI_FAMILY_RESIDENTIAL', or 'MANUFACTURING'
 * @returns Full sidebar data array
 */
export const getUserSidebarData = (businessType: string = 'RETAIL'): Sidebar[] => {
  return [
    // Dashboard (common across all verticals)
    {
      id: 1,
      title: "Dashboard",
      path: "/platform/dashboard",
      icon: <LayoutDashboard className="w-6 h-6" />
    },
    
    // Property Infrastructure (common across all verticals with slight variations)
    {
      id: 2,
      title: "Properties",
      path: "/platform/properties",
      icon: <Building2 className="w-6 h-6" />,
      // @ts-ignore
      children: [
        {
          id: "2-1",
          title: "Properties",
          path: "/platform/properties",
          icon: <Building className="w-4 h-4" />
        },
        {
          id: "2-2",
          title: "Buildings",
          path: "/platform/properties/buildings",
          icon: <BuildingIcon className="w-4 h-4" />
        },
        {
          id: "2-3",
          title: "Zones",
          path: "/platform/properties/zones",
          icon: <Boxes className="w-4 h-4" />
        },
        {
          id: "2-4",
          title: businessType === 'RETAIL' ? "Stores" : 
                 businessType === 'MANUFACTURING' ? "Production Areas" : 
                 businessType === 'MULTI_FAMILY_RESIDENTIAL' ? "Units" : "Tenant Spaces",
          path: "/platform/properties/stores",
          icon: <Store className="w-4 h-4" />
        },
        {
          id: "2-5",
          title: "Cameras",
          path: "/platform/properties/cameras",
          icon: <Camera className="w-4 h-4" />
        }
      ]
    },
    
    // Live Monitoring (common across all verticals)
    {
      id: 3,
      title: "Live Monitoring",
      path: "/platform/monitoring",
      icon: <MonitorPlay className="w-6 h-6" />,
      // @ts-ignore
      children: [
        {
          id: "3-1",
          title: "Live View",
          path: "/platform/monitoring/live",
          icon: <MonitorDot className="w-4 h-4" />
        },
        {
          id: "3-2",
          title: "Recordings",
          path: "/platform/monitoring/recordings",
          icon: <Video className="w-4 h-4" />
        },
        {
          id: "3-3",
          title: "Video Wall",
          path: "/platform/monitoring/wall",
          icon: <LayoutPanelTop className="w-4 h-4" />
        },
        {
          id: "3-4",
          title: "PTZ Control",
          path: "/platform/monitoring/ptz",
          icon: <CameraControl className="w-4 h-4" />
        }
      ]
    },
    
    // AI Data Management
    {
      id: 9,
      title: "Data",
      path: "/platform/ai/data",
      icon: <FolderClosed className="w-6 h-6" />,
      // @ts-ignore
      children: getAIDataMenuItems()
    },
    
    // AI Models Management
    {
      id: 10,
      title: "Models",
      path: "/platform/ai/models",
      icon: <BrainCircuit className="w-6 h-6" />,
      // @ts-ignore
      children: getAIModelMenuItems()
    },
    
    // Building Analytics (business type specific)
    {
      id: 4,
      title: "Analytics",
      path: "/platform/analytics",
      icon: <BarChart3 className="w-6 h-6" />,
      // @ts-ignore
      children: getAnalyticsMenuItems(businessType)
    },
    
    // Security Features (business type specific)
    {
      id: 5,
      title: "Security",
      path: "/platform/security",
      icon: <Shield className="w-6 h-6" />,
      // @ts-ignore
      children: getSecurityMenuItems(businessType)
    },
    
    // Operations (business type specific)
    {
      id: 8,
      title: "Operations",
      path: "/platform/operations",
      icon: <Store className="w-6 h-6" />,
      // @ts-ignore
      children: getOperationsMenuItems(businessType)
    },
    
    // Staff Management (common across all verticals)
    {
      id: 6,
      title: "Staff",
      path: "/platform/staff",
      icon: <Users className="w-6 h-6" />,
      // @ts-ignore
      children: [
        {
          id: "6-1",
          title: "Staff Members",
          path: "/platform/staff",
          icon: <UserCog className="w-4 h-4" />
        },
        {
          id: "6-2",
          title: "Department",
          path: "/platform/staff/department",
          icon: <Users className="w-4 h-4" />
        },
        {
          id: "6-3",
          title: "Permissions",
          path: "/platform/staff/permissions",
          icon: <Key className="w-4 h-4" />
        }
      ]
    },
    
    // Settings (common across all verticals)
    {
      id: 7,
      title: "Settings",
      path: "/platform/settings",
      icon: <Settings className="w-6 h-6" />,
      // @ts-ignore
      children: [
        {
          id: "7-1",
          title: "VT Credentials",
          path: "/platform/settings/vt-credentials",
          icon: <KeyRound className="w-4 h-4" />
        },
        {
          id: "7-2",
          title: "Notifications",
          path: "/platform/settings/notifications",
          icon: <BellIcon className="w-4 h-4" />
        },
        {
          id: "7-3",
          title: "Reports",
          path: "/platform/settings/reports",
          icon: <ScrollText className="w-4 h-4" />
        },
        {
          id: "7-4",
          title: "Billing",
          path: "/platform/settings/billing",
          icon: <CreditCard className="w-4 h-4" />
        }
      ]
    }
  ];
};

// Instead of exporting the array directly, export the function
export const userSidebarData = getUserSidebarData;

export const userMenuData: Sidebar[] = [
	{
		id: 1,
		title: "Account Settings",
		path: "/platform/account",
		icon: (
			<svg
				width='18'
				height='18'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z'
					fill='currentColor'
				/>
			</svg>
		),
	},
	{
		id: 2,
		title: "Billing",
		path: "/platform/settings/billing",
		icon: (
		  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>    
			<path d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z' stroke='currentColor' strokeWidth='2'/>
			<path d='M3 8H21' stroke='currentColor' strokeWidth='2'/>
			<path d='M7 15H9' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
			<path d='M15 15H17' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
		  </svg>
		)
	  },
	  {
		id: 3,
		title: "Notifications",  
		path: "/platform/settings/notifications",
		icon: (
		  <svg width='18' height='18' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
			<path d='M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H14V4.18C16.579 4.793 18 7.038 18 10.5V16L20 17V19Z' fill='currentColor'/>
		  </svg>
		)
	  }
	 
];

// For the admin profile menu
export const adminMenuData: Sidebar[] = [
	{
	  id: 1,
	  title: "Account Settings",
	  path: "/admin/account-settings",
	  icon: (
		<svg
		  width='18'
		  height='18'
		  viewBox='0 0 24 24'
		  fill='none'
		  xmlns='http://www.w3.org/2000/svg'
		>
		  <path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z'
			fill='currentColor'
		  />
		  <path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747Z'
			fill='currentColor'
		  />
		</svg>
	  ),
	},
	{
	  id: 2,
	  title: "Admin Settings",
	  path: "/admin/admin-settings",
	  icon: <Shield className="w-4 h-4" />
	},
	{
	  id: 3,
	  title: "System Status",
	  path: "/admin/system-status",
	  icon: <HeartPulse className="w-4 h-4" />
	},
	{
	  id: 4,
	  title: "Audit Logs",
	  path: "/admin/audit-logs",
	  icon: <FileText className="w-4 h-4" />
	}
  ];

export const adminSidebarData: Sidebar[] = [
	{
	  id: 1,
	  title: "Dashboard",
	  path: "/admin/dashboard",
	  icon: <LayoutDashboard className="w-6 h-6" />
	},
	{
	  id: 2,
	  title: "Client Management",
	  path: "/admin/clients",
	  icon: <Building2 className="w-6 h-6" />,
	  // @ts-ignore
	  children: [
		{
		  id: "2-1",
		  title: "Businesses",
		  path: "/admin/businesses",
		  icon: <Building className="w-4 h-4" />
		},
		{
		  id: "2-2",
		  title: "Properties",
		  path: "/admin/clients/properties",
		  icon: <Store className="w-4 h-4" />
		},
		{
		  id: "2-3",
		  title: "Subscriptions",
		  path: "/admin/clients/subscriptions",
		  icon: <CreditCard className="w-4 h-4" />
		}
	  ]
	},
	{
	  id: 3,
	  title: "User Management",
	  path: "/admin/users",
	  icon: <Users className="w-6 h-6" />,
	  // @ts-ignore
	  children: [
		{
		  id: "3-1",
		  title: "All Users",
		  path: "/admin/users",
		  icon: <Users className="w-4 h-4" />
		},
		{
		  id: "3-2",
		  title: "User Roles",
		  path: "/admin/users/roles",
		  icon: <Shield className="w-4 h-4" />
		},
		{
		  id: "3-3",
		  title: "Permission Groups",
		  path: "/admin/users/permissions",
		  icon: <Lock className="w-4 h-4" />
		}
	  ]
	},
  {
    id: 4,
    title: "AI Model Management",
    path: "/admin/models",
    icon: <BrainCircuit className="w-6 h-6" />,
    // @ts-ignore
    children: [
      {
        id: "4-1",
        title: "ReadyGo Models",
        path: "/admin/models/ai/ready-go",
        icon: <Zap className="w-4 h-4" />
      },
      {
        id: "4-2",
        title: "Custom Models",
        path: "/admin/models/custom-models",
        icon: <BrainCircuit className="w-4 h-4" />
      },
      {
        id: "4-3",
        title: "Model Versions",
        path: "/admin/models/versions",
        icon: <Layers className="w-4 h-4" />
      },
      {
        id: "4-4",
        title: "Model Training",
        path: "/admin/models/training",
        icon: <LineChart className="w-4 h-4" />
      }
    ]
  },
  {
    id: 5,
    title: "AI Data Management",
    path: "/admin/data",
    icon: <Database className="w-6 h-6" />,
    // @ts-ignore
    children: [
      {
        id: "5-1",
        title: "Datasets",
        path: "/admin/data/datasets",
        icon: <Database className="w-4 h-4" />
      },
      {
        id: "5-2",
        title: "Raw Data",
        path: "/admin/data/raw-data",
        icon: <FileInput className="w-4 h-4" />
      }
    ]
  },
  {
    id: 6,
    title: "Infrastructure",
    path: "/admin/infrastructure",
    icon: <Server className="w-6 h-6" />,
    // @ts-ignore
    children: [
      {
        id: "6-1",
        title: "Camera Deployments",
        path: "/admin/infrastructure/cameras",
        icon: <Camera className="w-4 h-4" />
      },
      {
        id: "6-2",
        title: "Edge Devices",
        path: "/admin/infrastructure/edge-devices",
        icon: <Boxes className="w-4 h-4" />
      },
      {
        id: "6-3",
        title: "Network Status",
        path: "/admin/infrastructure/network",
        icon: <Network className="w-4 h-4" />
      },
      {
        id: "6-4",
        title: "System Health",
        path: "/admin/infrastructure/health",
        icon: <HeartPulse className="w-4 h-4" />
      }
    ]
  },
	{
	  id: 7,
	  title: "Integration & APIs",
	  path: "/admin/integrations",
	  icon: <Code className="w-6 h-6" />,
	  // @ts-ignore
	  children: [
		{
		  id: "7-1",
		  title: "API Management",
		  path: "/admin/integrations/api",
		  icon: <Globe className="w-4 h-4" />
		},
		{
		  id: "7-2",
		  title: "Third-party Services",
		  path: "/admin/integrations/services",
		  icon: <Layers className="w-4 h-4" />
		},
		{
		  id: "7-3",
		  title: "Webhooks",
		  path: "/admin/integrations/webhooks",
		  icon: <Network className="w-4 h-4" />
		}
	  ]
	},
	{
    id: 8,
    title: "Data Synchronization",
    path: "/admin/sync",
    icon: <FolderSync className="w-6 h-6" />,
    // @ts-ignore
    children: [
      {
        id: "8-1",
        title: "Sync Status",
        path: "/admin/sync/status",
        icon: <LineChart className="w-4 h-4" />
      },
      {
        id: "8-2",
        title: "Sync History",
        path: "/admin/sync/history",
        icon: <ClipboardList className="w-4 h-4" />
      },
      {
        id: "8-3",
        title: "Manual Sync",
        path: "/admin/sync",
        icon: <FolderSync className="w-4 h-4" />
      }
    ]
  },
	{
	  id: 9,
	  title: "Analytics & Reports",
	  path: "/admin/analytics",
	  icon: <BarChart3 className="w-6 h-6" />,
	  // @ts-ignore
	  children: [
		{
		  id: "9-1",
		  title: "System Analytics",
		  path: "/admin/analytics/system",
		  icon: <LineChart className="w-4 h-4" />
		},
		{
		  id: "9-2",
		  title: "Usage Metrics",
		  path: "/admin/analytics/usage",
		  icon: <BarChart3 className="w-4 h-4" />
		},
		{
		  id: "9-3",
		  title: "Detection Reports",
		  path: "/admin/analytics/detection",
		  icon: <FileText className="w-4 h-4" />
		}
	  ]
	},
	{
	  id: 10,
	  title: "System Settings",
	  path: "/admin/settings",
	  icon: <Settings className="w-6 h-6" />,
	  // @ts-ignore
	  children: [
		{
		  id: "10-1",
		  title: "Global Configuration",
		  path: "/admin/settings/global",
		  icon: <Settings className="w-4 h-4" />
		},
		{
		  id: "10-2",
		  title: "Notification Rules",
		  path: "/admin/settings/notifications",
		  icon: <BellRing className="w-4 h-4" />
		},
		{
		  id: "10-3",
		  title: "Security Settings",
		  path: "/admin/settings/security",
		  icon: <Shield className="w-4 h-4" />
		},
		{
		  id: "10-4",
		  title: "Billing Configuration",
		  path: "/admin/settings/billing",
		  icon: <CreditCard className="w-4 h-4" />
		}
	  ]
	}
  ];
  

export const adminSidebarOtherData: Sidebar[] = [
	{
		id: 1,
		title: "Account Settings",
		path: "/admin/account-settings",
		icon: (
			<svg
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z'
					fill='currentColor'
				/>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z'
					fill='currentColor'
				/>
			</svg>
		),
	},
];
