"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  AlertCircle, 
  Clock, 
  FileText, 
  Search,
  Plus,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import IncidentForm from './IncidentForm';
import Modal from '@/components/Common/Modal';

const mockData = {
  incidents: [
    {
      id: 'INC-001',
      title: 'Shoplifting Attempt',
      type: 'Theft',
      status: 'Under Investigation',
      priority: 'High',
      location: 'Electronics Department',
      reportedBy: 'John Smith',
      timestamp: '2024-03-16T14:30:00',
      details: 'Customer attempted to conceal high-value electronics'
    },
    {
      id: 'INC-002',
      title: 'Customer Dispute',
      type: 'Disturbance',
      status: 'Resolved',
      priority: 'Medium',
      location: 'Customer Service',
      reportedBy: 'Sarah Johnson',
      timestamp: '2024-03-16T13:15:00',
      details: 'Verbal altercation between customer and staff member'
    },
    {
      id: 'INC-003',
      title: 'Suspicious Activity',
      type: 'Security',
      status: 'Active',
      priority: 'High',
      location: 'Parking Lot',
      reportedBy: 'Security Team B',
      timestamp: '2024-03-16T12:45:00',
      details: 'Group of individuals monitoring store entrance'
    }
  ],
  categories: [
    { id: 1, name: 'Theft', count: 145 },
    { id: 2, name: 'Disturbance', count: 89 },
    { id: 3, name: 'Security', count: 67 },
    { id: 4, name: 'Safety', count: 34 },
    { id: 5, name: 'Property Damage', count: 23 }
  ]
};

export default function IncidentManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateIncident = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Here you would make an API call to create the incident
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      
      // Add the new incident to the list
      const newIncident = {
        id: `INC-${String(mockData.incidents.length + 1).padStart(3, '0')}`,
        ...data
      };
      
      mockData.incidents.unshift(newIncident);
      setShowCreateModal(false);
      toast.success('Incident created successfully');
    } catch (error) {
      toast.error('Failed to create incident');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Incident Management</h2>
          <p className="text-gray-700 mt-1">
            Track and manage security incidents
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          New Incident
        </button>
      </div>

      {/* Stats Overview */}
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
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 3
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
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolved Today</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">8</h3>
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
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">High Priority</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">5</h3>
                  <span className="text-xs text-red-500 flex items-center">
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
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Resolution Time</p>
                <h3 className="text-2xl font-bold">2.5h</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text"
            placeholder="Search incidents..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      {/* Main Content */}
      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            All Incidents
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'active'}
            onClick={() => setActiveTab('active')}
          >
            Active
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'resolved'}
            onClick={() => setActiveTab('resolved')}
          >
            Resolved
          </TabsTrigger>
        </TabsList>

        {/* Incidents List */}
        <TabsContent value="all" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>All Incidents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Reported By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.incidents.map((incident) => (
                      <tr key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {incident.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {incident.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {incident.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {incident.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            incident.priority === 'High'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {incident.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            incident.status === 'Active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : incident.status === 'Resolved'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {incident.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {incident.reportedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {new Date(incident.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

       {/* Active Incidents Tab */}
        <TabsContent value="active" activeTab={activeTab}>
        <Card>
            <CardHeader>
            <CardTitle>Active Incidents</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Reported By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.incidents
                    .filter(incident => incident.status === 'Active' || incident.status === 'Under Investigation')
                    .map((incident) => (
                        <tr key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {incident.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {incident.type}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                            incident.priority === 'High'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                            {incident.priority}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                            incident.status === 'Active'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                            {incident.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.reportedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(incident.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                            })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>
        </TabsContent>

        {/* Resolved Incidents Tab */}
        <TabsContent value="resolved" activeTab={activeTab}>
        <Card>
            <CardHeader>
            <CardTitle>Resolved Incidents</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Reported By</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.incidents
                    .filter(incident => incident.status === 'Resolved')
                    .map((incident) => (
                        <tr key={incident.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {incident.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {incident.type}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                            incident.priority === 'High'
                                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}>
                            {incident.priority}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {incident.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {incident.reportedBy}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(incident.timestamp).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                            })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                            </button>
                        </td>
                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>
        </TabsContent>
      </Tabs>
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Incident"
      >
        <IncidentForm 
          onSubmit={handleCreateIncident}
          onClose={() => setShowCreateModal(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}