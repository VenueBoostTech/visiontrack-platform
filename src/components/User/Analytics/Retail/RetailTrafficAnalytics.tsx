// components/User/Analytics/Retail/RetailTrafficAnalytics.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  ArrowUp,
  ArrowDown,
  Building
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
import toast from 'react-hot-toast';
import vtClient from '../../../../lib/vt-external-api/client';
import { VTCustomerTrafficService } from '@/lib/vt-external-api/services/vt-customerTraffic.service';

// Mock data for the component
const mockData = {
  trafficFlow: [
    { time: '09:00', entries: 120, exits: 80, total: 450 },
    { time: '10:00', entries: 180, exits: 120, total: 510 },
    { time: '11:00', entries: 250, exits: 180, total: 580 },
    { time: '12:00', entries: 310, exits: 280, total: 610 },
    { time: '13:00', entries: 290, exits: 320, total: 580 },
    { time: '14:00', entries: 240, exits: 260, total: 560 },
  ],
  zoneTraffic: [
    { name: 'Main Entrance', current: 145, average: 120, peak: 180 },
    { name: 'Side Entrance', current: 85, average: 90, peak: 120 },
    { name: 'Central Area', current: 220, average: 200, peak: 280 },
    { name: 'Checkout Zone', current: 180, average: 150, peak: 220 },
  ],
  historicalComparison: [
    { week: 'W1', thisWeek: 4200, lastWeek: 3800 },
    { week: 'W2', thisWeek: 4500, lastWeek: 4100 },
    { week: 'W3', thisWeek: 4800, lastWeek: 4300 },
    { week: 'W4', thisWeek: 4600, lastWeek: 4400 },
  ]
};

export default function RetailTrafficAnalytics({ zones, user }: { zones: any, user: any }) {
  const [timeRange, setTimeRange] = useState('today');
  const [selectedZone, setSelectedZone] = useState('');
  const [trafficFlow, setTrafficFlow] = useState<any[]>([]);

  // Calculate currentTraffic and traffic change
  const currentTraffic = trafficFlow[trafficFlow.length - 1]?.inStore || 0;
  const previousTraffic = trafficFlow[trafficFlow.length - 2]?.inStore || 0;
  const trafficChange = ((currentTraffic - previousTraffic) / previousTraffic) * 100 || 0;

  // Calculate entry rate per minute for current and previous hours
  const currentEntryPerMinute = trafficFlow[trafficFlow.length - 1]?.entering / 60 || 0;
  const previousEntryPerMinute = trafficFlow[trafficFlow.length - 2]?.entering / 60 || 0;
  const entryRateChange = ((currentEntryPerMinute - previousEntryPerMinute) / previousEntryPerMinute) * 100 || 0;

  const entryRatePerMinute = trafficFlow.reduce((sum: any, item: any) => sum + (item.entering / 60), 0)
  const BusiestZone = mockData.zoneTraffic.reduce((max: any, zone: any) => zone.average > max.average ? zone : max);


  const getCustomerTraffic = async (vtId: string, timeRange: string) => {
    try {
      if (user.ownedBusiness.vtCredentials && timeRange) {
        vtClient.setCredentials({
          platform_id: user.ownedBusiness.vtCredentials.businessId,
          api_key: user.ownedBusiness.vtCredentials.api_key,
          business_id: user.ownedBusiness.vtCredentials.platform_id,
        });

        const response: any = await VTCustomerTrafficService.getCustomerTraffic(vtId, timeRange);
        setTrafficFlow(response);
      }
    } catch (error) {
      toast.error("Failed to fetch traffic data");
    }
  }


  useEffect(() => {
    getCustomerTraffic(selectedZone, timeRange);
  }, [timeRange, selectedZone]);

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Traffic Analytics</h2>
          <p className="text-gray-700 mt-1">Monitor and analyze customer traffic patterns</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="">All Zones</option>
            {
              zones.map((zone: any) => (
                <option key={zone.vtId} value={zone.vtId}>{zone.name}</option>
              ))
            }
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Current Traffic</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{currentTraffic}</h3>
                  <span className={`text-xs flex items-center ${trafficChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {trafficChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(trafficChange).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Entry Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{Math.round(entryRatePerMinute)} /min</h3>
                  <span className={`text-xs flex items-center ${entryRateChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {entryRateChange >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                    {Math.abs(entryRateChange).toFixed(1)}%
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
                <p className="text-sm text-gray-500">Peak Hours</p>
                <h3 className="text-2xl font-bold">2-4 PM</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <Building className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Busiest Zone</p>
                <h3 className="text-2xl font-bold">{BusiestZone.name}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Traffic Flow */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Traffic Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficFlow}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="entering"
                    stackId="1"
                    stroke="#4ade80"
                    fill="#4ade80"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="exiting"
                    stackId="1"
                    stroke="#f43f5e"
                    fill="#f43f5e"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Historical Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.historicalComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="thisWeek"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="lastWeek"
                    stroke="#94a3b8"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Zone Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Zone Traffic Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockData.zoneTraffic.map((zone) => (
              <div key={zone.name} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium">{zone.name}</h4>
                    <p className="text-sm text-gray-500">Current: {zone.current} visitors</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${zone.current > zone.average
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {((zone.current / zone.peak) * 100).toFixed(0)}% of peak
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(zone.current / zone.peak) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Average: {zone.average}</span>
                    <span>Peak: {zone.peak}</span>
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