"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monitor,
  Eye,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Target,
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
} from "recharts";

const mockData = {
  displayCompliance: [
    {
      display: "Window Display",
      compliance: 95,
      engagement: 78,
      lastChecked: "2h ago",
    },
    {
      display: "Entrance Feature",
      compliance: 88,
      engagement: 92,
      lastChecked: "1h ago",
    },
    {
      display: "Main Aisle End",
      compliance: 76,
      engagement: 85,
      lastChecked: "3h ago",
    },
    {
      display: "Checkout Display",
      compliance: 92,
      engagement: 64,
      lastChecked: "30m ago",
    },
  ],
  engagementTrends: [
    { time: "09:00", footfall: 120, engagement: 45, conversion: 12 },
    { time: "10:00", footfall: 180, engagement: 65, conversion: 15 },
    { time: "11:00", footfall: 220, engagement: 78, conversion: 18 },
    { time: "12:00", footfall: 280, engagement: 82, conversion: 22 },
    { time: "13:00", footfall: 240, engagement: 75, conversion: 20 },
    { time: "14:00", footfall: 200, engagement: 68, conversion: 16 },
  ],
  abTestResults: [
    { test: "Layout A vs B", variant: "A", engagement: 45, conversion: 12 },
    { test: "Layout A vs B", variant: "B", engagement: 52, conversion: 15 },
    { test: "Color Scheme", variant: "Warm", engagement: 48, conversion: 14 },
    { test: "Color Scheme", variant: "Cool", engagement: 42, conversion: 11 },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DisplayMonitoring() {
  const [timeRange, setTimeRange] = useState("today");
  const [selectedTest, setSelectedTest] = useState("Layout A vs B");
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

  // Calculate average metrics
  const avgCompliance =
    mockData.displayCompliance.reduce((acc, curr) => acc + curr.compliance, 0) /
    mockData.displayCompliance.length;
  const avgEngagement =
    mockData.displayCompliance.reduce((acc, curr) => acc + curr.engagement, 0) /
    mockData.displayCompliance.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">Display Monitoring</h2>
          <p className="text-sm text-gray-500 mt-1">
            Track display performance and customer engagement
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
                <Monitor className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Compliance</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {avgCompliance.toFixed(1)}%
                  </h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2.3%
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
                <Eye className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Engagement</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {avgEngagement.toFixed(1)}%
                  </h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 4.5%
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
                <p className="text-sm text-gray-500">Conversion</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">16.8%</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowDown className="w-3 h-3" /> 1.2%
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
                <Target className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">A/B Success</p>
                <h3 className="text-2xl font-bold">72%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Display Compliance Status */}
      <Card>
        <CardHeader>
          <CardTitle>Display Compliance Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.displayCompliance.map((display) => (
              <div key={display.display} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{display.display}</h4>
                    <p className="text-sm text-gray-500">
                      Last checked: {display.lastChecked}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      display.compliance >= 90
                        ? "bg-green-100 text-green-800"
                        : display.compliance >= 75
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {display.compliance}% compliant
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Engagement Rate</span>
                    <span>{display.engagement}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${display.engagement}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Engagement Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.engagementTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#3b82f6"
                    name="Engagement %"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="conversion"
                    stroke="#10b981"
                    name="Conversion %"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>A/B Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <select
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
                value={selectedTest}
                onChange={(e) => setSelectedTest(e.target.value)}
              >
                <option value="Layout A vs B">Layout A vs B</option>
                <option value="Color Scheme">Color Scheme Test</option>
              </select>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockData.abTestResults.filter(
                      (test) => test.test === selectedTest
                    )}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="variant" type="category" />
                    <Tooltip />
                    <Bar
                      dataKey="engagement"
                      name="Engagement %"
                      fill="#3b82f6"
                    />
                    <Bar
                      dataKey="conversion"
                      name="Conversion %"
                      fill="#10b981"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
