// components/User/Analytics/Retail/RetailCustomerCounter.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users,
  Clock,
  TrendingUp,
  Activity,
  ArrowUp,
  ArrowDown,
  UserPlus,
  UserMinus
} from "lucide-react";
import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = {
  dayFlow: [
    { time: '09:00', entering: 45, exiting: 12, inStore: 33 },
    { time: '10:00', entering: 78, exiting: 28, inStore: 83 },
    { time: '11:00', entering: 92, exiting: 45, inStore: 130 },
    { time: '12:00', entering: 135, exiting: 78, inStore: 187 },
    { time: '13:00', entering: 110, exiting: 95, inStore: 202 },
    { time: '14:00', entering: 85, exiting: 110, inStore: 177 },
    { time: '15:00', entering: 72, exiting: 88, inStore: 161 }
  ],
  queueMetrics: [
    { register: 'R1', currentWait: 4.2, avgWait: 3.8, customers: 5 },
    { register: 'R2', currentWait: 2.8, avgWait: 3.2, customers: 3 },
    { register: 'R3', currentWait: 5.1, avgWait: 3.5, customers: 7 },
    { register: 'R4', currentWait: 1.5, avgWait: 3.0, customers: 2 }
  ],
  zoneOccupancy: [
    { zone: 'Entrance', current: 12, capacity: 20 },
    { zone: 'Main Floor', current: 45, capacity: 80 },
    { zone: 'Checkout', current: 15, capacity: 25 },
    { zone: 'Service Area', current: 8, capacity: 15 }
  ]
};

export default function RetailCustomerCounter() {
  const [timeRange, setTimeRange] = useState('today');

  // Calculate current metrics
  const currentInStore = mockData.dayFlow[mockData.dayFlow.length - 1].inStore;
  const previousInStore = mockData.dayFlow[mockData.dayFlow.length - 2].inStore;
  const occupancyChange = ((currentInStore - previousInStore) / previousInStore) * 100;

  const averageWaitTime = mockData.queueMetrics.reduce((acc, curr) => acc + curr.currentWait, 0) / mockData.queueMetrics.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Customer Counter</h2>
          <p className="text-gray-700 mt-1">
            Monitor customer flow and queue management
          </p>
        </div>
        <select
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Currently In-Store</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{currentInStore}</h3>
                  <span className={`text-xs flex items-center ${occupancyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {occupancyChange >= 0 ? 
                      <ArrowUp className="w-3 h-3" /> : 
                      <ArrowDown className="w-3 h-3" />
                    }
                    {Math.abs(occupancyChange).toFixed(1)}%
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
                <UserPlus className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">42/hr</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 8%
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
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Wait Time</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{averageWaitTime.toFixed(1)}m</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 0.8m
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
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Store Capacity</p>
                <h3 className="text-2xl font-bold">64%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Flow Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.dayFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="entering" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981" 
                  name="Entering"
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="exiting" 
                  stackId="2"
                  stroke="#ef4444" 
                  fill="#ef4444" 
                  name="Exiting"
                  fillOpacity={0.6} 
                />
                <Line 
                  type="monotone" 
                  dataKey="inStore" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="In Store"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Queue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Queue Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.queueMetrics.map((queue) => (
                <div key={queue.register} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Register {queue.register}</h4>
                      <p className="text-sm text-gray-500">
                        {queue.customers} customers in line
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      queue.currentWait <= queue.avgWait
                        ? 'bg-green-100 text-green-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {queue.currentWait}m wait
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          queue.currentWait <= queue.avgWait
                            ? 'bg-green-500'
                            : 'bg-amber-500'
                        }`}
                        style={{ width: `${(queue.currentWait / 8) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Average wait: {queue.avgWait}m</span>
                      <span>Target: 3.0m</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Zone Occupancy */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.zoneOccupancy.map((zone) => (
                <div key={zone.zone} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{zone.zone}</h4>
                      <p className="text-sm text-gray-500">
                        {zone.current} / {zone.capacity} capacity
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      (zone.current / zone.capacity) < 0.8
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {Math.round((zone.current / zone.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          (zone.current / zone.capacity) < 0.8
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                        style={{ width: `${(zone.current / zone.capacity) * 100}%` }}
                      />
                    </div>
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