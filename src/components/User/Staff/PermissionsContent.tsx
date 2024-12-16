"use client";

import { useState } from 'react';
import { Layers, Users, Camera, Map, Lock, Building2, Bell } from 'lucide-react';

interface PermissionGroup {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  permissions: {
    id: string;
    name: string;
    description: string;
    isEnabled: boolean;
  }[];
}

const permissionGroups: PermissionGroup[] = [
  {
    id: 'cameras',
    name: 'Camera Management',
    description: 'Permissions related to camera operations and monitoring',
    icon: <Camera className="w-5 h-5" />,
    permissions: [
      {
        id: 'view_cameras',
        name: 'View Cameras',
        description: 'Can view live camera feeds and recordings',
        isEnabled: true
      },
      {
        id: 'manage_cameras',
        name: 'Manage Cameras',
        description: 'Can add, edit, and remove cameras',
        isEnabled: false
      },
      {
        id: 'export_footage',
        name: 'Export Footage',
        description: 'Can download and export camera footage',
        isEnabled: false
      }
    ]
  },
  {
    id: 'zones',
    name: 'Zone Management',
    description: 'Permissions related to zone configuration',
    icon: <Map className="w-5 h-5" />,
    permissions: [
      {
        id: 'view_zones',
        name: 'View Zones',
        description: 'Can view zone layouts and details',
        isEnabled: true
      },
      {
        id: 'manage_zones',
        name: 'Manage Zones',
        description: 'Can create and edit zone configurations',
        isEnabled: false
      }
    ]
  },
  {
    id: 'buildings',
    name: 'Building Access',
    description: 'Permissions for building management',
    icon: <Building2 className="w-5 h-5" />,
    permissions: [
      {
        id: 'view_buildings',
        name: 'View Buildings',
        description: 'Can view building information',
        isEnabled: true
      },
      {
        id: 'manage_buildings',
        name: 'Manage Buildings',
        description: 'Can edit building details and settings',
        isEnabled: false
      }
    ]
  },
  {
    id: 'alerts',
    name: 'Alert Management',
    description: 'Permissions for handling system alerts',
    icon: <Bell className="w-5 h-5" />,
    permissions: [
      {
        id: 'view_alerts',
        name: 'View Alerts',
        description: 'Can view system alerts and notifications',
        isEnabled: true
      },
      {
        id: 'manage_alerts',
        name: 'Manage Alerts',
        description: 'Can configure alert settings and rules',
        isEnabled: false
      },
      {
        id: 'acknowledge_alerts',
        name: 'Acknowledge Alerts',
        description: 'Can mark alerts as acknowledged',
        isEnabled: true
      }
    ]
  }
];

export default function PermissionsContent() {
  const [groups] = useState<PermissionGroup[]>(permissionGroups);
  
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Staff Permissions</h2>
          <p className="text-sm text-gray-500 mt-1">Configure default permissions for staff members</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Lock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Permission Groups</p>
              <h3 className="text-xl font-bold">{groups.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Permissions</p>
              <h3 className="text-xl font-bold">
                {groups.reduce((total, group) => total + group.permissions.length, 0)}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
              <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Default Enabled</p>
              <h3 className="text-xl font-bold">
                {groups.reduce((total, group) => 
                  total + group.permissions.filter(p => p.isEnabled).length, 0
                )}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <Lock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Default Restricted</p>
              <h3 className="text-xl font-bold">
                {groups.reduce((total, group) => 
                  total + group.permissions.filter(p => !p.isEnabled).length, 0
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Permission Groups */}
      <div className="space-y-6">
        {groups.map((group) => (
          <div 
            key={group.id} 
            className="bg-white rounded-lg shadow-sm dark:bg-gray-800"
          >
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                  {group.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{group.description}</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {group.permissions.map((permission) => (
                  <div key={permission.id} className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{permission.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{permission.description}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        permission.isEnabled 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {permission.isEnabled ? 'Enabled' : 'Restricted'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}