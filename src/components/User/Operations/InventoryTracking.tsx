"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Package,
  AlertTriangle,
  ArrowUp,
  ShoppingCart,
  Shield,
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
  stockLevels: [
    {
      category: "Electronics",
      inStock: 452,
      lowStock: 28,
      outOfStock: 12,
      threshold: 15,
    },
    {
      category: "Clothing",
      inStock: 834,
      lowStock: 45,
      outOfStock: 8,
      threshold: 20,
    },
    {
      category: "Home Goods",
      inStock: 623,
      lowStock: 32,
      outOfStock: 5,
      threshold: 25,
    },
    {
      category: "Groceries",
      inStock: 1245,
      lowStock: 67,
      outOfStock: 15,
      threshold: 30,
    },
  ],
  inventoryAlerts: [
    {
      id: 1,
      type: "Low Stock",
      product: "Wireless Earbuds",
      location: "Electronics A3",
      severity: "high",
    },
    {
      id: 2,
      type: "Theft Alert",
      product: "Designer Watches",
      location: "Accessories B2",
      severity: "critical",
    },
    {
      id: 3,
      type: "Restock Need",
      product: "Organic Produce",
      location: "Grocery F5",
      severity: "medium",
    },
    {
      id: 4,
      type: "Misplaced",
      product: "Winter Jackets",
      location: "Clothing C1",
      severity: "low",
    },
  ],
  placementEffectiveness: [
    { location: "Front Display", turnover: 85, visibility: 92, sales: 78 },
    { location: "End Cap", turnover: 72, visibility: 88, sales: 65 },
    { location: "Middle Aisle", turnover: 58, visibility: 45, sales: 52 },
    { location: "Checkout Area", turnover: 92, visibility: 95, sales: 88 },
  ],
  theftPrevention: [
    { time: "09:00", incidents: 0, alerts: 2 },
    { time: "10:00", incidents: 1, alerts: 3 },
    { time: "11:00", incidents: 0, alerts: 4 },
    { time: "12:00", incidents: 2, alerts: 5 },
    { time: "13:00", incidents: 1, alerts: 3 },
    { time: "14:00", incidents: 0, alerts: 2 },
  ],
};

export default function InventoryTracking() {
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

  // Calculate total metrics
  const totalProducts = mockData.stockLevels.reduce(
    (acc, curr) => acc + curr.inStock + curr.lowStock + curr.outOfStock,
    0
  );
  const totalAlerts = mockData.inventoryAlerts.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Inventory Tracking</h2>
          <p className="text-gray-700 mt-1">
            Monitor stock levels and product placement
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
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Stock</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{totalProducts}</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 45
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg dark:bg-red-900">
                <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Alerts</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{totalAlerts}</h3>
                  <span className="text-xs text-red-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 2
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
                <ShoppingCart className="w-6 h-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Turnover Rate</p>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">76%</h3>
                  <span className="text-xs text-green-500 flex items-center">
                    <ArrowUp className="w-3 h-3" /> 5%
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
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Loss Prevention</p>
                <h3 className="text-2xl font-bold">98.5%</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Levels by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockData.stockLevels.map((category) => (
              <div key={category.category} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium">{category.category}</h4>
                    <p className="text-sm text-gray-500">
                      {category.inStock +
                        category.lowStock +
                        category.outOfStock}{" "}
                      total items
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      category.lowStock <= category.threshold
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {(
                      (category.inStock /
                        (category.inStock +
                          category.lowStock +
                          category.outOfStock)) *
                      100
                    ).toFixed(1)}
                    % in stock
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Low Stock Items: {category.lowStock}</span>
                    <span>Out of Stock: {category.outOfStock}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-green-500"
                      style={{
                        width: `${(category.inStock / (category.inStock + category.lowStock + category.outOfStock)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts and Prevention */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.inventoryAlerts.map((alert) => (
                <div key={alert.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            alert.severity === "critical"
                              ? "bg-red-500"
                              : alert.severity === "high"
                                ? "bg-orange-500"
                                : alert.severity === "medium"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                          }`}
                        />
                        {alert.type}
                      </h4>
                      <p className="text-sm text-gray-500">{alert.product}</p>
                      <p className="text-xs text-gray-400">{alert.location}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        alert.severity === "critical"
                          ? "bg-red-100 text-red-800"
                          : alert.severity === "high"
                            ? "bg-orange-100 text-orange-800"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theft Prevention Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.theftPrevention}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="incidents"
                    stroke="#ef4444"
                    name="Incidents"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="alerts"
                    stroke="#f59e0b"
                    name="Alerts"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Placement Effectiveness */}
      <Card>
        <CardHeader>
          <CardTitle>Product Placement Effectiveness</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData.placementEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="turnover" name="Turnover Rate" fill="#3b82f6" />
                <Bar
                  dataKey="visibility"
                  name="Visibility Score"
                  fill="#10b981"
                />
                <Bar dataKey="sales" name="Sales Performance" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
