// components/User/Operations/StoreAnalytics.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  Users,
  ArrowUp,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = {
  performanceMetrics: [
    { hour: "09:00", traffic: 120, sales: 2400, conversion: 15 },
    { hour: "10:00", traffic: 180, sales: 4200, conversion: 18 },
    { hour: "11:00", traffic: 240, sales: 6300, conversion: 21 },
    { hour: "12:00", traffic: 280, sales: 8100, conversion: 24 },
    { hour: "13:00", traffic: 260, sales: 7200, conversion: 22 },
    { hour: "14:00", traffic: 220, sales: 5400, conversion: 20 },
    { hour: "15:00", traffic: 190, sales: 4800, conversion: 19 },
  ],
  zoneEfficiency: [
    { zone: "Entrance", traffic: 850, engagement: 45, conversion: 22 },
    { zone: "Main Display", traffic: 620, engagement: 68, conversion: 34 },
    { zone: "Checkout", traffic: 450, engagement: 75, conversion: 82 },
    { zone: "Electronics", traffic: 580, engagement: 58, conversion: 28 },
  ],
  salesCorrelation: [
    { factor: "Traffic Flow", correlation: 85 },
    { factor: "Staff Coverage", correlation: 72 },
    { factor: "Weather", correlation: 45 },
    { factor: "Marketing", correlation: 68 },
  ],
};

export default function StoreAnalytics() {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [stores, setStores] = useState([]);

  const getStores = async () => {
    try {
      const response = await fetch("/api/user/stores");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Store Analytics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Store performance and operational metrics
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
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Sales/Hour</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">$5,842</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 12%
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
                <Users className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg Traffic</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">284</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 8%
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
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">22.4%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 3.2%
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
                <Activity className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Zone Efficiency</p>
                <h3 className="text-2xl font-bold">85%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic vs Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic vs Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="traffic"
                    stroke="#3b82f6"
                    name="Traffic"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="sales"
                    stroke="#10b981"
                    name="Sales"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Zone Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle>Zone Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.zoneEfficiency}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="traffic" name="Traffic" fill="#3b82f6" />
                  <Bar dataKey="engagement" name="Engagement" fill="#10b981" />
                  <Bar dataKey="conversion" name="Conversion" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Correlation Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Correlation Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockData.salesCorrelation.map((factor) => (
              <div key={factor.factor} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{factor.factor}</h4>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      factor.correlation >= 70
                        ? "bg-green-100 text-green-800"
                        : factor.correlation >= 50
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {factor.correlation}%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        factor.correlation >= 70
                          ? "bg-green-500"
                          : factor.correlation >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${factor.correlation}%` }}
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
