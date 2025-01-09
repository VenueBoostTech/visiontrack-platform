"use client";

import { useState } from 'react';
import { Users, Clock, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  ageGroups: [
    { age: '18-24', count: 342, male: 180, female: 162 },
    { age: '25-34', count: 456, male: 245, female: 211 },
    { age: '35-44', count: 384, male: 198, female: 186 },
    { age: '45-54', count: 298, male: 158, female: 140 },
    { age: '55-64', count: 246, male: 128, female: 118 },
    { age: '65+', count: 187, male: 95, female: 92 }
  ],
  timeDistribution: [
    { time: '6AM', count: 150 },
    { time: '9AM', count: 480 },
    { time: '12PM', count: 520 },
    { time: '3PM', count: 450 },
    { time: '6PM', count: 380 },
    { time: '9PM', count: 220 }
  ]
};

export default function DemographicsContent({ zones, user }: { zones: any, user: any }) {
  const [selectedTimeRange] = useState('week');
  const totalVisitors = mockData.ageGroups.reduce((sum, group) => sum + group.count, 0);
  const maleVisitors = mockData.ageGroups.reduce((sum, group) => sum + group.male, 0);
  const femaleVisitors = mockData.ageGroups.reduce((sum, group) => sum + group.female, 0);

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Demographics Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Analyze visitor demographics and patterns
          </p>
        </div>
        <select
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
          value={selectedTimeRange}
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Visitors</p>
              <h3 className="text-xl font-bold">{totalVisitors.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Daily Average</p>
              <h3 className="text-xl font-bold">{Math.round(totalVisitors / 7).toLocaleString()}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Male / Female Ratio</p>
              <h3 className="text-xl font-bold">
                {Math.round((maleVisitors / femaleVisitors) * 100) / 100}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Peak Hours</p>
              <h3 className="text-xl font-bold">12PM - 3PM</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Age Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.ageGroups}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="male" name="Male" fill="#3b82f6" />
                <Bar dataKey="female" name="Female" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Visitor Traffic by Time</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.timeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Visitors" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}