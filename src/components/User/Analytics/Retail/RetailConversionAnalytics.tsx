// components/User/Analytics/Retail/RetailConversionAnalytics.tsx
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Users,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { 
  AreaChart,
  Area, 
  LineChart, 
  Line,
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  FunnelItem,
  LabelList,
  Cell
} from 'recharts';

const mockData = {
  conversionTrend: [
    { date: 'Mon', visitors: 1200, conversions: 180, rate: 15 },
    { date: 'Tue', visitors: 1400, conversions: 224, rate: 16 },
    { date: 'Wed', visitors: 1100, conversions: 187, rate: 17 },
    { date: 'Thu', visitors: 1500, conversions: 270, rate: 18 },
    { date: 'Fri', visitors: 1800, conversions: 360, rate: 20 },
    { date: 'Sat', visitors: 2200, conversions: 462, rate: 21 },
    { date: 'Sun', visitors: 1600, conversions: 304, rate: 19 }
  ],
  funnel: [
    { name: 'Store Visits', value: 1000, fill: '#3b82f6' },
    { name: 'Product Interest', value: 750, fill: '#10b981' },
    { name: 'Try/Touch Product', value: 500, fill: '#f59e0b' },
    { name: 'Purchase Intent', value: 300, fill: '#8b5cf6' },
    { name: 'Purchase', value: 180, fill: '#ef4444' }
  ],
  zoneConversion: [
    { zone: 'Electronics', visits: 450, conversions: 85, rate: 18.9 },
    { zone: 'Apparel', visits: 380, conversions: 64, rate: 16.8 },
    { zone: 'Home Goods', visits: 290, conversions: 43, rate: 14.8 },
    { zone: 'Accessories', visits: 220, conversions: 48, rate: 21.8 }
  ]
};

export default function RetailConversionAnalytics() {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedZone, setSelectedZone] = useState('all');

  return (
    <div className="space-y-6">
     {/* Conversion Analytics Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <h2 className="text-2xl text-gray-700 font-bold">Conversion Analytics</h2>
        <p className="text-gray-700 mt-1">Track and analyze customer conversion metrics</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <select 
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="day">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <select
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
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
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">18.2%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2.4%
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
                <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Transaction</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">$84.50</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> $5.20
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
                <UserPlus className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Customers</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">42%</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 3.1%
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
                <Users className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Engaged to Buy</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">24.5%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1.8%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conversion Trend & Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.conversionTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="conversions" 
                    stroke="#10b981" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={mockData.funnel}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6">
                    {mockData.funnel.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Conversion Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Conversion Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockData.zoneConversion.map((zone) => (
              <div key={zone.zone} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{zone.zone}</h4>
                    <p className="text-sm text-gray-500">
                      {zone.conversions} / {zone.visits} visitors
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    zone.rate > 20 
                      ? 'bg-green-100 text-green-800' 
                      : zone.rate > 15
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {zone.rate.toFixed(1)}% CVR
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        zone.rate > 20 
                          ? 'bg-green-500'
                          : zone.rate > 15
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${zone.rate}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}