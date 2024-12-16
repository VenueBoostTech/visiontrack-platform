"use client";

import { useState } from 'react';
import { Car, Clock, AlertTriangle, TrendingUp, BarChart2 } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  hourlyOccupancy: [
    { hour: '00:00', occupied: 45 },
    { hour: '04:00', occupied: 30 },
    { hour: '08:00', occupied: 75 },
    { hour: '12:00', occupied: 90 },
    { hour: '16:00', occupied: 85 },
    { hour: '20:00', occupied: 60 }
  ],
  dailyTrends: [
    { day: 'Mon', entries: 450, exits: 425 },
    { day: 'Tue', entries: 520, exits: 498 },
    { day: 'Wed', entries: 480, exits: 470 },
    { day: 'Thu', entries: 510, exits: 500 },
    { day: 'Fri', entries: 550, exits: 530 },
    { day: 'Sat', entries: 420, exits: 440 },
    { day: 'Sun', entries: 380, exits: 360 }
  ]
};

export default function ParkingContent() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');
  const [selectedZone, setSelectedZone] = useState('all');

  const totalSpots = 500;
  const occupiedSpots = 342;
  const occupancyRate = Math.round((occupiedSpots / totalSpots) * 100);

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Parking Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor parking occupancy and vehicle flow
          </p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="visitor">Visitor Parking</option>
            <option value="staff">Staff Parking</option>
            <option value="vip">VIP Parking</option>
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
              <Car className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Current Occupancy</p>
              <h3 className="text-xl font-bold">{occupancyRate}%</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <BarChart2 className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Available Spots</p>
              <h3 className="text-xl font-bold">{totalSpots - occupiedSpots}</h3>
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
              <h3 className="text-xl font-bold">2.5h</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Violations</p>
              <h3 className="text-xl font-bold">12</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Occupancy Over Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.hourlyOccupancy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="occupied" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Entry/Exit Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Vehicle Entry/Exit Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.dailyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" name="Entries" fill="#3b82f6" />
                <Bar dataKey="exits" name="Exits" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Parking Zones Overview */}
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <h3 className="text-lg font-semibold mb-4">Zone Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Visitor Parking', total: 200, occupied: 145, violations: 4 },
            { name: 'Staff Parking', total: 250, occupied: 167, violations: 6 },
            { name: 'VIP Parking', total: 50, occupied: 30, violations: 2 }
          ].map((zone) => (
            <div 
              key={zone.name}
              className="p-4 border rounded-lg dark:border-gray-700"
            >
              <h4 className="font-medium mb-3">{zone.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Occupancy</span>
                  <span className="font-medium">
                    {Math.round((zone.occupied / zone.total) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ 
                      width: `${Math.round((zone.occupied / zone.total) * 100)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {zone.occupied} / {zone.total} spots
                  </span>
                  {zone.violations > 0 && (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {zone.violations} violations
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}