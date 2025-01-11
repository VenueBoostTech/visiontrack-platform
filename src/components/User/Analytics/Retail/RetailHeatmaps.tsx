// components/User/Analytics/Retail/RetailHeatmaps.tsx
"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Clock,
  Users,
  MousePointer2,
  ArrowDown,
  ArrowUp,
  LayoutGrid
} from "lucide-react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import toast from 'react-hot-toast';
import vtClient from "../../../../lib/vt-external-api/client"
import { VTHeatmapService } from '@/lib/vt-external-api/services/vt-heatmap.service';

// Mock data for heatmap points
const mockData = {
  heatmapPoints: Array.from({ length: 50 }, () => ({
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    value: Math.floor(Math.random() * 100) // intensity
  })),
  zoneActivity: [
    { name: 'New Arrivals', dwell: 120, interaction: 85, conversion: 24 },
    { name: 'Promotions', dwell: 180, interaction: 150, conversion: 45 },
    { name: 'Checkout', dwell: 60, interaction: 40, conversion: 38 },
    { name: 'Featured Items', dwell: 150, interaction: 95, conversion: 32 }
  ]
};

export default function RetailHeatmaps({ zones, user }: { zones: any, user: any }) {
  const [timeRange, setTimeRange] = useState('today');
  const [viewType, setViewType] = useState('dwell');

  const getHeatmap = async (zone: string, timeRange: string) => {
    try {
      if (user.ownedBusiness.vtCredentials && timeRange) {
        vtClient.setCredentials({
          platform_id: user.ownedBusiness.vtCredentials.businessId,
          api_key: user.ownedBusiness.vtCredentials.api_key,
          business_id: user.ownedBusiness.vtCredentials.platform_id,
        });

        //get heatmap
        // const response: any = await VTHeatmapService.getHeatmap(zone, timeRange, propertyId);

      }
    } catch (error) {
      toast.error("Failed to fetch heatmap");
    }
  }


  useEffect(() => {
    getHeatmap("all", timeRange);
  }, [timeRange]);

  return (
    <div className="space-y-6">
      {/* Store Heatmap Analytics Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Store Heatmap Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Analyze customer movement patterns and engagement areas
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="dwell">Dwell Time</option>
            <option value="interaction">Product Interaction</option>
            <option value="traffic">Traffic Flow</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Dwell Time</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">8.5m</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1.2m
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
                <MousePointer2 className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Interaction Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">42%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 5%
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
                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Hot Zones</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">4</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1
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
                <LayoutGrid className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Zones</p>
                <h3 className="text-2xl font-bold">8/10</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Heatmap */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Store Layout Heatmap</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-200"></span>
                <span className="text-sm text-gray-500">Low</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-400"></span>
                <span className="text-sm text-gray-500">Medium</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span className="text-sm text-gray-500">High</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] bg-gray-50 dark:bg-gray-800 rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="x" name="x" />
                <YAxis type="number" dataKey="y" name="y" />
                <ZAxis type="number" dataKey="value" range={[20, 400]} name="intensity" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      return (
                        <div className="bg-white p-2 shadow rounded border">
                          <p className="text-sm">Intensity: {payload[0].payload.value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter
                  data={mockData.heatmapPoints}
                  fill="#3b82f6"
                  opacity={0.6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Zone Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockData.zoneActivity.map((zone) => (
          <Card key={zone.name}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{zone.name}</h4>
                  <p className="text-sm text-gray-500">
                    Avg. Dwell Time: {zone.dwell}s
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${zone.interaction > 100
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {zone.interaction} interactions
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Interaction Rate</span>
                    <span>{(zone.interaction / zone.dwell * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(zone.interaction / zone.dwell * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Conversion Rate</span>
                    <span>{zone.conversion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${zone.conversion}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}