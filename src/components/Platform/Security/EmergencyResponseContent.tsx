"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Bell, Phone, Shield, AlertTriangle, Users, Clock, Radio, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import EmergencyTriggerForm from './EmergencyTriggerForm';
import Modal from '@/components/Common/Modal';

const mockData = {
  activeEmergencies: [
    { 
      id: 1, 
      type: 'Medical Emergency',
      location: 'Food Court',
      status: 'Active',
      priority: 'High',
      responseTime: '2 min',
      assignedTo: 'Medical Team A',
      details: 'Customer experiencing chest pain'
    },
    { 
      id: 2, 
      type: 'Suspicious Package',
      location: 'Main Entrance',
      status: 'Active',
      priority: 'High',
      responseTime: '5 min',
      assignedTo: 'Security Team B',
      details: 'Unattended package reported'
    }
  ],
  emergencyContacts: [
    { id: 1, name: 'Security Command', number: '555-0123', type: 'Internal' },
    { id: 2, name: 'Local Police', number: '911', type: 'Emergency Services' },
    { id: 3, name: 'Medical Response', number: '555-0199', type: 'Emergency Services' },
    { id: 4, name: 'Fire Department', number: '555-0911', type: 'Emergency Services' }
  ],
  responseTeams: [
    { id: 1, name: 'Security Team A', status: 'Available', location: 'North Wing' },
    { id: 2, name: 'Medical Team A', status: 'Responding', location: 'Food Court' },
    { id: 3, name: 'Security Team B', status: 'Responding', location: 'Main Entrance' },
    { id: 4, name: 'Security Team C', status: 'Available', location: 'South Wing' }
  ]
};

export default function EmergencyResponse() {
  const [activeTab, setActiveTab] = useState('current');

  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmergencyTrigger = async (data: any) => {
    setIsSubmitting(true);
    try {
      // Make API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      toast.success('Emergency alert triggered successfully');
      setShowEmergencyModal(false);
    } catch (error) {
      toast.error('Failed to trigger emergency alert');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Emergency Response</h2>
          <p className="text-gray-700 mt-1">
            Monitor and manage emergency situations
          </p>
        </div>
        <button onClick={() => setShowEmergencyModal(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
          <Bell className="w-4 h-4" />
          Trigger Emergency Alert
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Emergencies</p>
                <h3 className="text-2xl font-bold">2</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Response Teams</p>
                <h3 className="text-2xl font-bold">4/4</h3>
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
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <h3 className="text-2xl font-bold">3.5m</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Security Level</p>
                <h3 className="text-2xl font-bold">High</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'current'}
            onClick={() => setActiveTab('current')}
          >
            Active Emergencies
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'teams'}
            onClick={() => setActiveTab('teams')}
          >
            Response Teams
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'contacts'}
            onClick={() => setActiveTab('contacts')}
          >
            Emergency Contacts
          </TabsTrigger>
        </TabsList>

        {/* Active Emergencies Tab */}
        <TabsContent value="current" activeTab={activeTab} className="space-y-4">
          {mockData.activeEmergencies.map((emergency) => (
            <Card key={emergency.id}>
              <CardContent className="p-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {emergency.priority} Priority
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {emergency.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{emergency.type}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      {emergency.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Response Time</p>
                    <p className="font-semibold">{emergency.responseTime}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Assigned To</p>
                  <p className="font-medium">{emergency.assignedTo}</p>
                </div>
                <p className="mt-2 text-sm text-gray-600">{emergency.details}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Response Teams Tab */}
        <TabsContent value="teams" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Available Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Team</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.responseTeams.map((team) => (
                      <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{team.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            team.status === 'Available' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {team.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{team.location}</td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button className="text-primary hover:text-primary/80">
                            <Radio className="w-4 h-4" />
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

        {/* Emergency Contacts Tab */}
        <TabsContent value="contacts" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Number</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.emergencyContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{contact.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{contact.number}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            contact.type === 'Emergency Services'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}>
                            {contact.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                          <button className="text-primary hover:text-primary/80">
                            <Phone className="w-4 h-4" />
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
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        title="Trigger Emergency Alert"
      >
        <EmergencyTriggerForm
          onSubmit={handleEmergencyTrigger}
          onClose={() => setShowEmergencyModal(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}