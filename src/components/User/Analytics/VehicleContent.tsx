"use client";
import { useState } from 'react';
import { Car, Clock, AlertTriangle, TrendingUp, BarChart2, FileText } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockData = {
  vehicleTypes: [
    { type: 'Sedan', count: 450 },
    { type: 'SUV', count: 320 },
    { type: 'Van', count: 180 },
    { type: 'Truck', count: 90 },
    { type: 'Motorcycle', count: 160 }
  ],
  hourlyTraffic: [
    { hour: '00:00', count: 45 },
    { hour: '04:00', count: 30 },
    { hour: '08:00', count: 280 },
    { hour: '12:00', count: 340 },
    { hour: '16:00', count: 420 },
    { hour: '20:00', count: 180 }
  ],
  recentVehicles: [
    { plate: 'ABC123', type: 'Sedan', time: '14:30', duration: '2h 15m', status: 'active' },
    { plate: 'XYZ789', type: 'SUV', time: '14:25', duration: '1h 45m', status: 'active' },
    { plate: 'DEF456', type: 'Van', time: '14:20', duration: '45m', status: 'active' },
    { plate: 'GHI789', type: 'Truck', time: '14:15', duration: '3h', status: 'violation' },
    { plate: 'JKL012', type: 'Motorcycle', time: '14:10', duration: '30m', status: 'active' }
  ]
};

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

export default function VehicleContent() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('day');
  const [selectedZone, setSelectedZone] = useState('all');

  // Calculate total vehicles
  const totalVehicles = mockData.vehicleTypes.reduce((sum, type) => sum + type.count, 0);

  return (
    <div className="px-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Vehicle Analytics</h2>
          <p className="text-gray-700 mt-1">
            Track and analyze vehicle patterns
          </p>
        </div>
        <div className="flex gap-3">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            <option value="entrance">Main Entrance</option>
            <option value="exit">Exit Gate</option>
            <option value="parking">Parking Area</option>
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
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Vehicles</p>
              <h3 className="text-xl font-bold">{totalVehicles}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Flow</p>
              <h3 className="text-xl font-bold">85/hr</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-300" />
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
        {/* Vehicle Types Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Vehicle Types Distribution</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockData.vehicleTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {mockData.vehicleTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Traffic */}
        <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
          <h3 className="text-lg font-semibold mb-4">Hourly Traffic</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.hourlyTraffic}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" name="Vehicles" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Vehicles */}
      <div className="bg-white rounded-lg shadow-sm p-6 dark:bg-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Vehicles</h3>
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <FileText className="w-4 h-4" />
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="pb-3 text-xs font-medium text-gray-500">License Plate</th>
                <th className="pb-3 text-xs font-medium text-gray-500">Vehicle Type</th>
                <th className="pb-3 text-xs font-medium text-gray-500">Entry Time</th>
                <th className="pb-3 text-xs font-medium text-gray-500">Duration</th>
                <th className="pb-3 text-xs font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {mockData.recentVehicles.map((vehicle) => (
                <tr key={vehicle.plate}>
                  <td className="py-3 font-medium">{vehicle.plate}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{vehicle.type}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{vehicle.time}</td>
                  <td className="py-3 text-gray-600 dark:text-gray-300">{vehicle.duration}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      vehicle.status === 'active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}