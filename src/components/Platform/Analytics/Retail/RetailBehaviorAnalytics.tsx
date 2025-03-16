// components/User/Analytics/Retail/RetailBehaviorAnalytics.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Clock, 
  Repeat,
  MousePointer2,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Users
} from "lucide-react";
import { 
  LineChart, 
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const mockData = {
  dwellTime: [
    { time: '0-5m', count: 450 },
    { time: '5-10m', count: 320 },
    { time: '10-15m', count: 280 },
    { time: '15-30m', count: 190 },
    { time: '30m+', count: 120 }
  ],
  pathAnalysis: [
    { from: 'Entrance', to: 'Electronics', flow: 280 },
    { from: 'Electronics', to: 'Checkout', flow: 180 },
    { from: 'Entrance', to: 'Apparel', flow: 220 },
    { from: 'Apparel', to: 'Checkout', flow: 150 },
  ],
  engagementRate: [
    { zone: 'Electronics', engaged: 65, passed: 35 },
    { zone: 'Apparel', engaged: 58, passed: 42 },
    { zone: 'Home Goods', engaged: 45, passed: 55 },
    { zone: 'Checkout', engaged: 75, passed: 25 }
  ],
  repeatVisitors: [
    { type: 'First Time', value: 60 },
    { type: 'Returning', value: 40 }
  ]
};

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

export default function RetailBehaviorAnalytics() {
  const [timeRange, setTimeRange] = useState('today');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Behavior Analysis</h2>
          <p className="text-gray-700 mt-1">Analyze customer behavior patterns and engagement</p>
        </div>
        <div className="flex gap-3">
          <select 
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="electronics">Electronics</option>
            <option value="apparel">Apparel</option>
            <option value="homegoods">Home Goods</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Dwell Time</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">12.5m</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2.1m
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
                <MousePointer2 className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">64.2%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 5.4%
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
                <Repeat className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Repeat Visits</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">40%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 3.2%
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
                <p className="text-sm text-gray-500">Cross-Zone Visits</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">2.4</h3>
                  <span className="text-xs text-gray-500">zones/visit</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dwell Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Dwell Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.dwellTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Visitor Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.repeatVisitors}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.repeatVisitors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Engagement Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Engagement Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockData.engagementRate.map((zone) => (
              <div key={zone.zone} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{zone.zone}</h4>
                    <p className="text-sm text-gray-500">Engagement Rate: {zone.engaged}%</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    zone.engaged > 60 
                      ? 'bg-green-100 text-green-800' 
                      : zone.engaged > 40
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {zone.engaged > 60 ? 'High' : zone.engaged > 40 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${zone.engaged}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Engaged: {zone.engaged}%</span>
                    <span>Passed: {zone.passed}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Journey Flows */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Journey Flows</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockData.pathAnalysis.map((path, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">{path.from}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium">{path.to}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{path.flow}</span>
                  <span className="text-sm text-gray-500">visitors</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}