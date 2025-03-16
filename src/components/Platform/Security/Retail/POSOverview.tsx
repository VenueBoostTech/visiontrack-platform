// components/User/Security/Retail/POSOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CheckCircle2, 
  ShoppingCart, 
  Activity,
  Clock,
  Database,
  RefreshCcw,
  ArrowUp,
  ArrowDown
} from "lucide-react";

const mockData = {
  // Simulated latest transactions
  recentTransactions: [
    { 
      id: 'TRX-001',
      terminal: 'POS Terminal #1',
      amount: 156.99,
      status: 'Completed',
      timestamp: '14:30:25'
    },
    { 
      id: 'TRX-002',
      terminal: 'POS Terminal #2',
      amount: 89.99,
      status: 'Failed',
      timestamp: '14:28:15'
    }
  ],
  // System status summary
  systemStatus: {
    database: 'Connected',
    syncService: 'Active'
  }
};

export default function POSOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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

      {/* Quick Status & Latest Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
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
                  <RefreshCcw className="w-5 h-5 text-gray-500" />
                  <span className="font-medium">Sync Service</span>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {mockData.systemStatus.syncService}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div>
                    <p className="font-medium">{transaction.terminal}</p>
                    <p className="text-sm text-gray-500">{transaction.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${transaction.amount.toFixed(2)}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}