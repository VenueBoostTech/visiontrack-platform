// components/Platform/Operations/QueueManagement.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity,
  UserCog,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  queueStatus: [
    {
      register: "R1",
      waitTime: 4.5,
      customers: 6,
      efficiency: 85,
      status: "high",
    },
    {
      register: "R2",
      waitTime: 2.2,
      customers: 3,
      efficiency: 92,
      status: "normal",
    },
    {
      register: "R3",
      waitTime: 6.8,
      customers: 8,
      efficiency: 78,
      status: "critical",
    },
    {
      register: "R4",
      waitTime: 1.5,
      customers: 2,
      efficiency: 95,
      status: "normal",
    },
  ],
  waitTimeTrend: [
    { time: "09:00", actual: 2.5, predicted: 2.8 },
    { time: "10:00", actual: 3.2, predicted: 3.5 },
    { time: "11:00", actual: 4.8, predicted: 4.2 },
    { time: "12:00", actual: 5.5, predicted: 5.8 },
    { time: "13:00", actual: 4.2, predicted: 4.5 },
    { time: "14:00", actual: 3.8, predicted: 3.5 },
  ],
  staffAllocation: [
    { zone: "Main Checkout", required: 4, current: 3 },
    { zone: "Express Lane", required: 2, current: 2 },
    { zone: "Customer Service", required: 3, current: 2 },
    { zone: "Self-Checkout", required: 2, current: 1 },
  ],
};

export default function QueueManagement() {
  const [timeRange, setTimeRange] = useState("now");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    try {
      const response = await fetch("/api/platform/stores");
      if (!response.ok) throw new Error("Failed to fetch stores");
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  useEffect(() => {
    getStores();
  }, []);

  const avgWaitTime =
    mockData.queueStatus.reduce((acc, curr) => acc + curr.waitTime, 0) /
    mockData.queueStatus.length;
  const totalCustomers = mockData.queueStatus.reduce(
    (acc, curr) => acc + curr.customers,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Queue Management</h2>
          <p className="text-gray-700 mt-1">
            Monitor real-time queue status and optimize customer flow
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Stores</option>
            {stores.map((store: any) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
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
          <CardContent className="p-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Wait Time</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {avgWaitTime.toFixed(1)}m
                  </h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 1.2m
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
                <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">In Queue</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{totalCustomers}</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 4
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
                <UserCog className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Staff Coverage</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">82%</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 8%
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
                <Activity className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Queue Efficiency</p>
                <h3 className="text-2xl font-bold">88%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Queue Status */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Queue Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.queueStatus.map((queue) => (
              <div key={queue.register} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">Register {queue.register}</h4>
                    <p className="text-sm text-gray-500">
                      {queue.customers} customers in line
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      queue.status === "normal"
                        ? "bg-green-100 text-green-800"
                        : queue.status === "high"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {queue.waitTime} min wait
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Efficiency</span>
                    <span>{queue.efficiency}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        queue.efficiency > 90
                          ? "bg-green-500"
                          : queue.efficiency > 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${queue.efficiency}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Wait Time Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Wait Time Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.waitTimeTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#3b82f6"
                    name="Actual"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#10b981"
                    name="Predicted"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.staffAllocation.map((zone) => (
                <div key={zone.zone} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{zone.zone}</h4>
                      <p className="text-sm text-gray-500">
                        {zone.current} / {zone.required} staff members
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        zone.current >= zone.required
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {Math.round((zone.current / zone.required) * 100)}%
                      coverage
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        zone.current >= zone.required
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${(zone.current / zone.required) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
