"use client";

import { useEffect, useState } from 'react';
import { Map, Activity, Users, ArrowUpRight, Clock } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import vtClient from "../../../lib/vt-external-api/client"
import { VTHeatmapService } from '@/lib/vt-external-api/services/vt-heatmap.service';


const mockTimeData = [
  { hour: '00:00', value: 25 },
  { hour: '04:00', value: 15 },
  { hour: '08:00', value: 85 },
  { hour: '12:00', value: 95 },
  { hour: '16:00', value: 75 },
  { hour: '20:00', value: 45 }
];

export default function HeatmapContent({ zones, user }: { zones: any, user: any }) {
  const [selectedZone, setSelectedZone] = useState('');
  const [filterBy, setFilterBy] = useState('last_24_hours');
  const [heatmapData, setHeatmapData] = useState<any>([]);
  const getHeatmap = async (vtId: string, filterBy: string) => {
    try {
      if (user.ownedBusiness.vtCredentials && filterBy) {
        vtClient.setCredentials({
          platform_id: user.ownedBusiness.vtCredentials.businessId,
          api_key: user.ownedBusiness.vtCredentials.api_key,
          business_id: user.ownedBusiness.vtCredentials.platform_id,
        });

        const response: any = await VTHeatmapService.getHeatmap(vtId, filterBy);
        if (response.points.length > 0) {
          setHeatmapData(response.points.map((point: any) => ({
            x: point.x,
            y: point.y,
            value: point.weight
          })));
        } else {
          setHeatmapData([]);
        }


      }
    } catch (error) {
      setHeatmapData([]);
    }
  }

  useEffect(() => {
    getHeatmap(selectedZone, filterBy);
  }, [selectedZone, filterBy]);

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Heatmap Analytics</h2>
          <p className="text-gray-700 mt-1">
            Analyze movement patterns and high-traffic areas
          </p>
        </div>
        <div className="flex gap-3">
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
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="last_24_hours">Last 24 Hours</option>
            <option value="last_week">Last Week</option>
            <option value="last_month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Map className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Zones</p>
              <h3 className="text-xl font-bold">{zones.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Activity Level</p>
              <h3 className="text-xl font-bold">High</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Peak Occupancy</p>
              <h3 className="text-xl font-bold">342</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Duration</p>
              <h3 className="text-xl font-bold">45m</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Heatmap */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Movement Heatmap</h3>
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
          <div className="h-[400px]">
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
                  data={heatmapData}
                  fill="#3b82f6"
                  opacity={0.6}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hotspots */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Activity Hotspots</h3>
          <div className="space-y-4">
            {[
              { name: 'Main Entrance', value: 89, trend: '+12%' },
              { name: 'Elevator Lobby', value: 76, trend: '+5%' },
              { name: 'Cafeteria', value: 68, trend: '-3%' },
              { name: 'Parking Exit', value: 54, trend: '+8%' },
              { name: 'Conference Area', value: 42, trend: '+2%' },
            ].map((spot) => (
              <div key={spot.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{spot.name}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${spot.value}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{spot.value}%</span>
                  <span className={`text-sm ${spot.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                    {spot.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="font-medium mb-3">Peak Times</h4>
            <div className="space-y-2">
              {mockTimeData.map((time) => (
                <div key={time.hour} className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{time.hour}</span>
                  <div className="flex-1 mx-3">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full"
                        style={{ width: `${time.value}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{time.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}