"use client";
import { useState } from 'react';
import { Users, TrendingUp, Clock, AlertTriangle, Activity } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  occupancyTrend: [
    { time: '00:00', count: 120 },
    { time: '04:00', count: 80 },
    { time: '08:00', count: 450 },
    { time: '12:00', count: 680 },
    { time: '16:00', count: 520 },
    { time: '20:00', count: 320 }
  ],
  crowdFlow: [
    { time: '00:00', entries: 45, exits: 65 },
    { time: '04:00', entries: 30, exits: 40 },
    { time: '08:00', entries: 280, exits: 120 },
    { time: '12:00', entries: 340, exits: 290 },
    { time: '16:00', entries: 220, exits: 380 },
    { time: '20:00', entries: 150, exits: 210 }
  ],
  zoneMetrics: [
    { zone: 'Entrance', current: 45, capacity: 60, rate: 12 },
    { zone: 'Lobby', current: 85, capacity: 100, rate: 24 },
    { zone: 'Food Court', current: 120, capacity: 150, rate: 35 },
    { zone: 'Shopping Area', current: 280, capacity: 400, rate: 42 },
    { zone: 'Parking', current: 145, capacity: 200, rate: 18 }
  ]
};

export default function PeopleContent() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');
  const [selectedZone, setSelectedZone] = useState('all');

  const currentOccupancy = 680;
  const peakOccupancy = 850;
  const crowdingThreshold = 800;

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">People Analytics</h2>
          <p className="text-gray-700 mt-1">
            Monitor occupancy and crowd patterns
          </p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="entrance">Entrance</option>
            <option value="lobby">Lobby</option>
            <option value="foodcourt">Food Court</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Occupancy</p>
              <h3 className="text-xl font-bold">{currentOccupancy}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Peak Today</p>
              <h3 className="text-xl font-bold">{peakOccupancy}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Flow Rate</p>
              <h3 className="text-xl font-bold">42/min</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Crowding</p>
              <h3 className="text-xl font-bold">
                {Math.round((currentOccupancy / crowdingThreshold) * 100)}%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Occupancy Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.occupancyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.1} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* People Flow */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">People Flow</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.crowdFlow}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" name="Entries" fill="#3b82f6" />
                <Bar dataKey="exits" name="Exits" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone Metrics */}
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Zone Occupancy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockData.zoneMetrics.map((zone) => (
            <div 
              key={zone.zone}
              className="p-4 border rounded-lg dark:border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-medium">{zone.zone}</h4>
                <span className="text-sm text-gray-500">
                  {Math.round((zone.current / zone.capacity) * 100)}% Full
                </span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (zone.current / zone.capacity) > 0.8 
                        ? 'bg-red-500' 
                        : (zone.current / zone.capacity) > 0.6 
                        ? 'bg-yellow-500' 
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${(zone.current / zone.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    {zone.current} / {zone.capacity}
                  </span>
                  <span className="text-gray-500">
                    {zone.rate}/min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}