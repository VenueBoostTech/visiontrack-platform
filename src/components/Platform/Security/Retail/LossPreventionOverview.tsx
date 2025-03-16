// components/Platform/Security/Retail/LossPreventionOverview.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertOctagon, ShoppingBag, DollarSign, Users, ArrowUp, ArrowDown } from "lucide-react";

// Mock data for the overview
const mockData = {
  theftAlerts: [
    { id: 1, time: '14:30', location: 'Electronics', type: 'Item Concealment', status: 'Active', risk: 'High' },
    { id: 2, time: '13:45', location: 'Apparel', type: 'Tag Removal', status: 'Resolved', risk: 'Medium' },
  ]
};

export default function LossPreventionOverview() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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
          <CardContent className="p-2">
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

      {/* Recent Alerts Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Theft Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.theftAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    alert.status === 'Active' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    <AlertOctagon className={`w-4 h-4 ${
                      alert.status === 'Active' ? 'text-red-600' : 'text-green-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium">{alert.type}</p>
                    <p className="text-sm text-gray-500">{alert.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    alert.risk === 'High' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {alert.risk}
                  </span>
                  <p className="text-gray-700 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}