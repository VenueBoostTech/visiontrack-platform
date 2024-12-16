"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  RefreshCcw, 
  Settings, 
  Database,
  Clock,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import toast from 'react-hot-toast';
import POSSettingsModal from './POSSettingsModal';
import ConfirmSyncModal from './ConfirmSyncModal';

const mockData = {
  posTerminals: [
    { 
      id: 1, 
      name: 'POS Terminal #1', 
      location: 'Main Checkout',
      status: 'Online',
      lastSync: '2 min ago',
      version: 'v2.1.0',
      transactions: 145
    },
    { 
      id: 2, 
      name: 'POS Terminal #2', 
      location: 'Electronics',
      status: 'Online',
      lastSync: '5 min ago',
      version: 'v2.1.0',
      transactions: 89
    },
    { 
      id: 3, 
      name: 'POS Terminal #3', 
      location: 'Customer Service',
      status: 'Offline',
      lastSync: '35 min ago',
      version: 'v2.0.9',
      transactions: 0
    }
  ],
  recentTransactions: [
    { 
      id: 'TRX-001',
      terminal: 'POS Terminal #1',
      amount: 156.99,
      items: 3,
      status: 'Completed',
      timestamp: '14:30:25',
      type: 'Sale'
    },
    { 
      id: 'TRX-002',
      terminal: 'POS Terminal #2',
      amount: 89.99,
      items: 1,
      status: 'Failed',
      timestamp: '14:28:15',
      type: 'Return'
    },
    { 
      id: 'TRX-003',
      terminal: 'POS Terminal #1',
      amount: 245.50,
      items: 5,
      status: 'Completed',
      timestamp: '14:25:40',
      type: 'Sale'
    }
  ],
  systemStatus: {
    database: 'Connected',
    apiEndpoint: 'Operational',
    syncService: 'Active',
    lastBackup: '1 hour ago'
  }
};

export default function POSIntegrationContent() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate sync
      toast.success('POS sync completed successfully');
      setShowSyncModal(false);
    } catch (error) {
      toast.error('Failed to sync POS terminals');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (data: any) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate save
      toast.success('Settings saved successfully');
      setShowSettingsModal(false);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">POS Integration</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor and manage POS system connections
          </p>
        </div>
        <div className="flex gap-2">
        <button 
          onClick={() => setShowSyncModal(true)}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Sync Now
        </button>
        <button 
          onClick={() => setShowSettingsModal(true)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Terminals</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">2/3</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 1
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Transactions</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">234</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 12%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <Activity className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">99.8%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 0.2%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Response Time</p>
                <h3 className="text-2xl font-bold">120ms</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs>
        <TabsList>
          <TabsTrigger 
            isActive={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
          >
            System Overview
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'terminals'}
            onClick={() => setActiveTab('terminals')}
          >
            POS Terminals
          </TabsTrigger>
          <TabsTrigger 
            isActive={activeTab === 'transactions'}
            onClick={() => setActiveTab('transactions')}
          >
            Recent Transactions
          </TabsTrigger>
        </TabsList>

        {/* System Overview Tab */}
        <TabsContent value="overview" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Database className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Database Connection</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {mockData.systemStatus.database}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">API Endpoint</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {mockData.systemStatus.apiEndpoint}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <RefreshCcw className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Sync Service</span>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {mockData.systemStatus.syncService}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-500" />
                      <span className="font-medium">Last Backup</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {mockData.systemStatus.lastBackup}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* POS Terminals Tab */}
        <TabsContent value="terminals" activeTab={activeTab}>
          <Card>
            <CardHeader>
              <CardTitle>POS Terminals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Terminal</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Last Sync</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Version</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Transactions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {mockData.posTerminals.map((terminal) => (
                      <tr key={terminal.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap font-medium">
                          {terminal.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {terminal.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            terminal.status === 'Online' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {terminal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {terminal.lastSync}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {terminal.version}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {terminal.transactions}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

       {/* Recent Transactions Tab */}
<TabsContent value="transactions" activeTab={activeTab}>
  <Card>
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Terminal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mockData.recentTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  {transaction.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.terminal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  {transaction.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    transaction.type === 'Sale'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {transaction.items}
                </td>
                <td className="px-6 py-4 whitespace-nowrap font-medium">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    transaction.status === 'Completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {transaction.status}
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
    </Tabs>
    <ConfirmSyncModal 
  isOpen={showSyncModal}
  onClose={() => setShowSyncModal(false)}
  onConfirm={handleSync}
  isLoading={isLoading}
/>

<POSSettingsModal
  isOpen={showSettingsModal}
  onClose={() => setShowSettingsModal(false)}
  onSave={handleSaveSettings}
  isSubmitting={isLoading}
/>
  </div>
);
}