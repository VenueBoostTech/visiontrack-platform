// components/User/Analytics/Retail/RetailDemographics.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Clock,
  TrendingUp,
  ArrowUp,
  ShoppingBag,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import toast from "react-hot-toast";

// Mock data
const mockData = {
  ageGroups: [
    { age: "18-24", count: 342, male: 180, female: 162 },
    { age: "25-34", count: 456, male: 245, female: 211 },
    { age: "35-44", count: 384, male: 198, female: 186 },
    { age: "45-54", count: 298, male: 158, female: 140 },
    { age: "55-64", count: 246, male: 128, female: 118 },
    { age: "65+", count: 187, male: 95, female: 92 },
  ],
  shoppingPatterns: [
    { hour: "09", weekday: 120, weekend: 180 },
    { hour: "11", weekday: 280, weekend: 350 },
    { hour: "13", weekday: 340, weekend: 420 },
    { hour: "15", weekday: 290, weekend: 380 },
    { hour: "17", weekday: 310, weekend: 400 },
    { hour: "19", weekday: 220, weekend: 320 },
    { hour: "21", weekday: 150, weekend: 250 },
  ],
  customerProfile: [
    { name: "Regular", value: 35 },
    { name: "Occasional", value: 45 },
    { name: "First-time", value: 20 },
  ],
};

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"];

export default function RetailDemographics({ zones, user }: { zones: any, user: any }) {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedZone, setSelectedZone] = useState("all");
  const [demographics, setDemographics] = useState(null);

  const getDemographics = async (id: string) => {
    const response = await fetch(`/api/user/demographics/${id}`);
    const data = await response.json();
    if (data.ok) {
      setDemographics(data)
      toast.success("Demographics fetched successfully");
    } else {
      toast.error("Failed to fetch demographics");
    }
  }

  useEffect(() => {
    getDemographics(selectedZone);
  }, [selectedZone]);

  // Calculate total visitors and gender ratio
  const totalVisitors = mockData.ageGroups.reduce(
    (sum, group) => sum + group.count,
    0
  );
  const maleVisitors = mockData.ageGroups.reduce(
    (sum, group) => sum + group.male,
    0
  );
  const femaleVisitors = mockData.ageGroups.reduce(
    (sum, group) => sum + group.female,
    0
  );

  return (
    <div className="space-y-6">
      {/* Customer Demographics Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Customer Demographics</h2>
          <p className="text-sm text-gray-500 mt-1">
            Analyze customer demographics and shopping patterns
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
          >
            <option value="all">All Zones</option>
            {
              zones.map((zone: any) => (
                <option key={zone.vtId} value={zone.vtId}>{zone.name}</option>
              ))
            }
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
                <p className="text-sm text-gray-500">Total Customers</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {totalVisitors.toLocaleString()}
                  </h3>
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
                <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Gender Ratio</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">
                    {Math.round((maleVisitors / femaleVisitors) * 100) / 100}
                  </h3>
                  <span className="text-xs text-gray-500">M/F</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                <Clock className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Peak Shopping</p>
                <h3 className="text-2xl font-bold">2-4 PM</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
                <ShoppingBag className="w-6 h-6 text-amber-600 dark:text-amber-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Age</p>
                <h3 className="text-2xl font-bold">34.5</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age & Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age & Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData.ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="male" name="Male" fill="#3b82f6" />
                  <Bar dataKey="female" name="Female" fill="#ec4899" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Patterns */}
        <Card>
          <CardHeader>
            <CardTitle>Shopping Patterns by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.shoppingPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="weekday"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Weekday"
                  />
                  <Line
                    type="monotone"
                    dataKey="weekend"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Weekend"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.customerProfile}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.customerProfile.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {mockData.customerProfile.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Zone Demographics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Zone Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { zone: "Electronics", youngAdult: 45, adult: 35, senior: 20 },
                { zone: "Fashion", youngAdult: 55, adult: 30, senior: 15 },
                { zone: "Home Goods", youngAdult: 25, adult: 45, senior: 30 },
              ].map((zone) => (
                <div key={zone.zone} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{zone.zone}</h4>
                    <span className="text-sm text-gray-500">
                      Dominant:{" "}
                      {Object.entries(zone)
                        .filter(([key]) => key !== "zone")
                        .sort(([, a]: any, [, b]: any) => b - a)[0][0]
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div className="flex h-full rounded-full overflow-hidden">
                      <div
                        className="bg-blue-500 h-full"
                        style={{ width: `${zone.youngAdult}%` }}
                      />
                      <div
                        className="bg-green-500 h-full"
                        style={{ width: `${zone.adult}%` }}
                      />
                      <div
                        className="bg-amber-500 h-full"
                        style={{ width: `${zone.senior}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Young Adult ({zone.youngAdult}%)</span>
                    <span>Adult ({zone.adult}%)</span>
                    <span>Senior ({zone.senior}%)</span>
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
