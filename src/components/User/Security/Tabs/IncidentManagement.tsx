// components/User/Security/Tabs/IncidentManagement.tsx
"use client";

import { useState } from 'react';
import { FileText, Search, Filter, Clock, Tag, MapPin, Plus } from 'lucide-react';

interface Incident {
  id: string;
  type: 'security' | 'safety' | 'maintenance' | 'emergency';
  title: string;
  status: 'open' | 'investigating' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  location: string;
  reportedAt: Date;
  detectedBy: 'ai' | 'staff' | 'resident';
  description: string;
  attachments?: string[];
  assignedTo?: string;
}

export default function IncidentManagement() {
  const [showNewIncident, setShowNewIncident] = useState(false);

  return (
    <div className="space-y-6">
      {/* Incidents Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Incidents</p>
              <h3 className="text-xl font-bold">12</h3>
            </div>
          </div>
        </div>
        {/* More stats */}
      </div>

      {/* Incident List */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-bold">Incidents</h2>
          <button 
            onClick={() => setShowNewIncident(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm"
          >
            <Plus className="w-4 h-4" />
            New Incident
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search incidents..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg dark:border-gray-600">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Incidents Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Reported</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Incident rows */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="bg-white rounded-lg shadow dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-lg font-bold">Recent Activity</h2>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {/* Timeline entries */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900">
                <Tag className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">New incident reported</p>
                <p className="text-sm text-gray-500">Suspicious activity in Parking Level 2</p>
                <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
              </div>
            </div>
            {/* More timeline entries */}
          </div>
        </div>
      </div>

      {/* New Incident Modal */}
      {showNewIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-2xl dark:bg-gray-800">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-bold">New Incident Report</h3>
              <button onClick={() => setShowNewIncident(false)}>×</button>
            </div>
            <div className="p-4">
              <form className="space-y-4">
                {/* Form fields */}
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}