"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users,
  Clock,
  TrendingUp,
  UserCog,
  ArrowUp,
  ArrowDown,
  Activity,
  Calendar
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
  AreaChart,
  Area
} from 'recharts';

const mockData = {
  staffCoverage: [
    { hour: '09:00', required: 8, actual: 6, traffic: 120 },
    { hour: '10:00', required: 10, actual: 8, traffic: 180 },
    { hour: '11:00', required: 12, actual: 11, traffic: 220 },
    { hour: '12:00', required: 15, actual: 14, traffic: 280 },
    { hour: '13:00', required: 14, actual: 12, traffic: 240 },
    { hour: '14:00', required: 12, actual: 10, traffic: 200 }
  ],
  performanceMetrics: [
    { department: 'Checkout', efficiency: 92, satisfaction: 88, coverage: 85 },
    { department: 'Floor Sales', efficiency: 87, satisfaction: 92, coverage: 78 },
    { department: 'Stock Room', efficiency: 94, satisfaction: 85, coverage: 90 },
    { department: 'Customer Service', efficiency: 89, satisfaction: 94, coverage: 82 }
  ],
  staffAlerts: [
    { id: 1, type: 'Coverage Gap', location: 'Checkout Area', time: '10:00-11:00', severity: 'high' },
    { id: 2, type: 'Peak Hours', location: 'Sales Floor', time: '12:00-14:00', severity: 'medium' },
    { id: 3, type: 'Break Schedule', location: 'Customer Service', time: '13:00-13:30', severity: 'low' },
    { id: 4, type: 'Training Need', location: 'Electronics', time: 'Next Week', severity: 'medium' }
  ],
  peakTimes: [
    { day: 'Monday', morning: 65, afternoon: 82, evening: 78 },
    { day: 'Tuesday', morning: 70, afternoon: 85, evening: 75 },
    { day: 'Wednesday', morning: 68, afternoon: 88, evening: 80 },
    { day: 'Thursday', morning: 72, afternoon: 90, evening: 85 },
    { day: 'Friday', morning: 75, afternoon: 95, evening: 88 },
    { day: 'Saturday', morning: 85, afternoon: 98, evening: 92 },
    { day: 'Sunday', morning: 80, afternoon: 92, evening: 85 }
  ]
};

export default function StaffOptimization() {
  const [timeRange, setTimeRange] = useState('today');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Calculate average metrics
  const currentCoverage = mockData.staffCoverage.reduce((acc, curr) => 
    acc + (curr.actual / curr.required), 0
  ) / mockData.staffCoverage.length * 100;

  const averageEfficiency = mockData.performanceMetrics.reduce((acc, curr) => 
    acc + curr.efficiency, 0
  ) / mockData.performanceMetrics.length;

  return (
    <div className="space-y-6">
      {/* Header */}
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
    <div>
        <h2 className="text-2xl text-gray-700 font-bold">Staff Optimization</h2>
        <p className="text-gray-700 mt-1">
        Monitor staff performance and optimize scheduling
        </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
        <select
        className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        >
        <option value="all">All Departments</option>
        <option value="checkout">Checkout</option>
        <option value="floor">Floor Sales</option>
        <option value="stock">Stock Room</option>
        <option value="service">Customer Service</option>
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
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Coverage</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{currentCoverage.toFixed(1)}%</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 5.2%
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
                <Activity className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Efficiency</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2.8%
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
                <UserCog className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Performance</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">88.5%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1.5%
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
                <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Schedule Adherence</p>
                <h3 className="text-2xl font-bold">94%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Coverage Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Coverage vs. Traffic</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockData.staffCoverage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="required" 
                  stackId="1"
                  stroke="#8b5cf6" 
                  fill="#8b5cf6"
                  name="Required Staff"
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stackId="2"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  name="Actual Staff"
                />
                <Line 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#ef4444" 
                  name="Traffic"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="efficiency" name="Efficiency" fill="#3b82f6" />
                  <Bar dataKey="satisfaction" name="Satisfaction" fill="#10b981" />
                  <Bar dataKey="coverage" name="Coverage" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staffing Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.staffAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-500' :
                          alert.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
                        }`} />
                        {alert.type}
                      </h4>
                      <p className="text-sm text-gray-500">{alert.location}</p>
                      <p className="text-xs text-gray-400">{alert.time}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                      alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Peak Time Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Peak Time Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.peakTimes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="morning" 
                  stroke="#3b82f6" 
                  name="Morning"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="afternoon" 
                  stroke="#10b981" 
                  name="Afternoon"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="evening" 
                  stroke="#8b5cf6" 
                  name="Evening"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}