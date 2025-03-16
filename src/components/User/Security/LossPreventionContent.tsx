"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertOctagon, ShoppingBag, UserX, Activity, ArrowUp, ArrowDown, DollarSign, Users } from 'lucide-react';

const mockData = {
  theftAlerts: [
    { id: 1, time: '14:30', location: 'Electronics', type: 'Item Concealment', status: 'Active', risk: 'High' },
    { id: 2, time: '13:45', location: 'Apparel', type: 'Tag Removal', status: 'Resolved', risk: 'Medium' },
    { id: 3, time: '12:15', location: 'Checkout', type: 'Scan Avoidance', status: 'Active', risk: 'High' },
  ],
  suspiciousBehavior: [
    { id: 1, time: '14:20', location: 'Jewelry', type: 'Loitering', duration: '15m', risk: 'Medium' },
    { id: 2, time: '13:30', location: 'Exit', type: 'Multiple Returns', count: 3, risk: 'High' },
    { id: 3, time: '12:00', location: 'Storage', type: 'Unauthorized Access', duration: '5m', risk: 'High' },
  ]
};

export default function LossPreventionContent() {
  const [activeTab, setActiveTab] = useState('theft');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Loss Prevention</h2>
          <p className="text-gray-700 mt-1">
            Monitor and prevent retail shrinkage
          </p>
        </div>
      </div>

      {/* Stats Overview */}
     {/* Stats Overview */}
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
  <Card>
    <CardContent>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
          <AlertOctagon className="w-6 h-6 text-red-600 dark:text-red-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Active Alerts</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">24</h3>
            <span className="text-xs text-red-500 flex items-center">
              <ArrowUp className="w-3 h-3" /> 12%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
          <ShoppingBag className="w-6 h-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Shrinkage Rate</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">1.8%</h3>
            <span className="text-xs text-green-500 flex items-center">
              <ArrowDown className="w-3 h-3" /> 0.3%
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
          <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Loss Value</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">$2.4k</h3>
            <span className="text-xs text-red-500 flex items-center">
              <ArrowUp className="w-3 h-3" /> $420
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <Card>
    <CardContent>
      <div className="flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
          <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500">High Risk Visitors</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold">15</h3>
            <span className="text-xs text-red-500 flex items-center">
              <ArrowUp className="w-3 h-3" /> 3
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

      {/* Main Content Tabs */}
      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'theft'}
            onClick={() => setActiveTab('theft')}
          >
            Theft Detection
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'behavior'}
            onClick={() => setActiveTab('behavior')}
          >
            Suspicious Behavior
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'high-risk'}
            onClick={() => setActiveTab('high-risk')}
          >
            High Risk Areas
          </TabsTrigger>
        </TabsList>

        {/* Theft Detection Tab */}
        <TabsContent value="theft" activeTab={activeTab}>
        <Card>
            <CardHeader>
            <CardTitle>Recent Theft Alerts</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Risk Level</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.theftAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">{alert.time}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{alert.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{alert.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.status === 'Active' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        }`}>
                            {alert.status}
                        </span>
                        </td>
                        <td className="px-6 text-right py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            alert.risk === 'High' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                            {alert.risk}
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>
        </TabsContent>

        {/* Suspicious Behavior Tab */}
        <TabsContent value="behavior" activeTab={activeTab}>
        <Card>
            <CardHeader>
            <CardTitle>Suspicious Activities</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Duration/Count</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">Risk Level</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.suspiciousBehavior.map((behavior) => (
                    <tr key={behavior.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap">
                        {behavior.time}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        {behavior.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        {behavior.type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                        {behavior.duration || behavior.count}
                        </td>
                        <td className="px-6 py-4 text-right whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                            behavior.risk === 'High' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                            {behavior.risk} Risk
                        </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>
        </TabsContent>

        {/* High Risk Areas Tab */}
       {/* High Risk Areas Tab */}
<TabsContent value="high-risk" activeTab={activeTab}>
  <Card>
    <CardHeader>
      <CardTitle>High Risk Areas</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Electronics', incidents: 12, trend: '+4', value: '$1,240' },
          { name: 'Cosmetics', incidents: 8, trend: '-2', value: '$680' },
          { name: 'Apparel', incidents: 6, trend: '+1', value: '$420' },
          { name: 'Accessories', incidents: 5, trend: '0', value: '$380' },
          { name: 'Checkout', incidents: 4, trend: '-1', value: '$240' },
          { name: 'Exit Gates', incidents: 3, trend: '+1', value: '$180' },
        ].map((area) => (
          <Card key={area.name} className="border border-gray-200 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{area.name}</h4>
                <div className={`flex items-center gap-1 ${
                  area.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'
                }`}>
                  {area.trend.startsWith('+') ? 
                    <ArrowUp className="w-4 h-4" /> : 
                    <ArrowDown className="w-4 h-4" />
                  }
                  <span className="text-sm font-medium">{area.trend}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Total Incidents</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {area.incidents} cases
                  </span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    className={`h-2 rounded-full ${
                      area.incidents > 10 
                        ? 'bg-red-500' 
                        : area.incidents > 5 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(area.incidents / 15) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Loss Value</span>
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{area.value}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </CardContent>
  </Card>
</TabsContent>
      </Tabs>
    </div>
  );
}