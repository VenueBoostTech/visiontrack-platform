"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Building2,
  Camera,
  Database,
  TicketIcon,
  CreditCard,
  ArrowUp,
  ArrowDown,
  BrainCircuit,
  Clock,
  Server,
  BarChart3,
  Activity,
  HardDrive,
  UserPlus,
  FileText,
  Mail,
  CheckCircle,
  X,
  AlertCircle,
  Factory,
  Home,
  Store
} from "lucide-react";
import Link from "next/link";

// Super admin relevant platform metrics
const platformStats = {
  businesses: { value: "178", change: "+4.7%", status: "up" },
  totalUsers: { value: "856", change: "+6.2%", status: "up" },
  totalCameras: { value: "2,748", change: "+8.5%", status: "up" },
  activeAiModels: { value: "5", change: "0%", status: "neutral" }
};

// Business & revenue data
const businessStats = {
  monthlyRecurring: "$152,450",
  totalRevenue: "$187,630",
  pendingPayments: "$12,800",
  newBusinesses: "8",
  trialConversion: "72%"
};

// System health & infrastructure
const systemStats = {
  storageUsed: "4.5 TB / 10 TB",
  storagePercent: 45,
  cpuLoad: "32%",
  memoryUsage: "56%",
  apiRequests: "1.2M",
  queuedJobs: "126"
};

// Support tickets
const supportTickets = [
  {
    id: "TKT-4392",
    subject: "AI model accuracy issue in low light",
    business: "Emerald Properties Inc.",
    status: "Open",
    priority: "High",
    created: "2 hours ago"
  },
  {
    id: "TKT-4391",
    subject: "Billing discrepancy on March invoice",
    business: "Metro Retail Group",
    status: "In Progress",
    priority: "Medium",
    created: "5 hours ago"
  },
  {
    id: "TKT-4390",
    subject: "New camera integration request",
    business: "Westfield Manufacturing",
    status: "Waiting",
    priority: "Low",
    created: "1 day ago"
  },
  {
    id: "TKT-4389",
    subject: "User access permissions issue",
    business: "Highland Residences",
    status: "Open",
    priority: "Medium",
    created: "1 day ago"
  }
];

// Recent user activity
const recentUsers = [
  {
    id: 1,
    action: "New business registered",
    business: "Parkview Properties LLC",
    time: "30 mins ago",
    status: "pending"
  },
  {
    id: 2,
    action: "New user added",
    business: "Metro Retail Group",
    time: "2 hours ago",
    status: "active"
  },
  {
    id: 3,
    action: "Subscription upgraded",
    business: "Westfield Manufacturing",
    time: "5 hours ago",
    status: "completed"
  },
  {
    id: 4,
    action: "Support access granted",
    business: "Highland Residences",
    time: "Yesterday",
    status: "active"
  }
];

export default function AdminDashboardContent() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-700 font-bold">Platform Administration</h2>
        <p className="text-gray-700 mt-1">
          Manage businesses, users, billing, and platform infrastructure
        </p>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Businesses</p>
                <p className="text-2xl font-bold">{platformStats.businesses.value}</p>
                <div className="flex items-center mt-1">
                  {platformStats.businesses.status === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : platformStats.businesses.status === "down" ? (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-xs ${
                    platformStats.businesses.status === "up" 
                      ? "text-green-500" 
                      : platformStats.businesses.status === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}>
                    {platformStats.businesses.change}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30">
                <Building2 className="w-6 h-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold">{platformStats.totalUsers.value}</p>
                <div className="flex items-center mt-1">
                  {platformStats.totalUsers.status === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : platformStats.totalUsers.status === "down" ? (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-xs ${
                    platformStats.totalUsers.status === "up" 
                      ? "text-green-500" 
                      : platformStats.totalUsers.status === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}>
                    {platformStats.totalUsers.change}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Cameras</p>
                <p className="text-2xl font-bold">{platformStats.totalCameras.value}</p>
                <div className="flex items-center mt-1">
                  {platformStats.totalCameras.status === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : platformStats.totalCameras.status === "down" ? (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-xs ${
                    platformStats.totalCameras.status === "up" 
                      ? "text-green-500" 
                      : platformStats.totalCameras.status === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}>
                    {platformStats.totalCameras.change}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30">
                <Camera className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Active AI Models</p>
                <p className="text-2xl font-bold">{platformStats.activeAiModels.value}</p>
                <div className="flex items-center mt-1">
                  {platformStats.activeAiModels.status === "up" ? (
                    <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : platformStats.activeAiModels.status === "down" ? (
                    <ArrowDown className="w-4 h-4 text-red-500 mr-1" />
                  ) : null}
                  <span className={`text-xs ${
                    platformStats.activeAiModels.status === "up" 
                      ? "text-green-500" 
                      : platformStats.activeAiModels.status === "down"
                        ? "text-red-500"
                        : "text-gray-500"
                  }`}>
                    {platformStats.activeAiModels.change}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
                <BrainCircuit className="w-6 h-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business & Revenue / System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business & Revenue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Business & Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
                  <span className="block text-xl font-bold">{businessStats.monthlyRecurring}</span>
                  <p className="text-sm text-gray-600">Monthly Recurring</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
                  <span className="block text-xl font-bold">{businessStats.totalRevenue}</span>
                  <p className="text-sm text-gray-600">Total Revenue MTD</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <CreditCard className="w-4 h-4 mr-2 text-amber-500" />
                    Pending Payments
                  </span>
                  <span className="font-medium">{businessStats.pendingPayments}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2 text-purple-500" />
                    New Businesses (MTD)
                  </span>
                  <span className="font-medium">{businessStats.newBusinesses}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-blue-500" />
                    Trial Conversion Rate
                  </span>
                  <span className="font-medium">{businessStats.trialConversion}</span>
                </div>
              </div>
              
              <div className="text-right">
                <Link href="/admin/clients/businesses" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View Business Reports →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Storage usage */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <HardDrive className="w-4 h-4 mr-2 text-blue-500" />
                    Storage Usage
                  </span>
                  <span className="font-medium">{systemStats.storageUsed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${systemStats.storagePercent}%` }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>CPU Load</span>
                    <span className="font-medium">{systemStats.cpuLoad}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">{systemStats.memoryUsage}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>API Requests (24h)</span>
                    <span className="font-medium">{systemStats.apiRequests}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Queued Jobs</span>
                    <span className="font-medium">{systemStats.queuedJobs}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <Link href="/admin/infrastructure/health" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                  View System Dashboard →
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Vertical Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Market Vertical Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Commercial Real Estate */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
                  <Building2 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Commercial Real Estate</h3>
                  <p className="text-sm text-gray-500">78 businesses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-medium">$68,450</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="font-medium text-green-600">+8.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cameras</span>
                  <span className="font-medium">860</span>
                </div>
              </div>
            </div>

            {/* Manufacturing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
                  <Factory className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-medium">Manufacturing</h3>
                  <p className="text-sm text-gray-500">36 businesses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-medium">$42,120</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="font-medium text-green-600">+5.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cameras</span>
                  <span className="font-medium">524</span>
                </div>
              </div>
            </div>

            {/* Multi-family Residential */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30">
                  <Home className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Multi-family Residential</h3>
                  <p className="text-sm text-gray-500">45 businesses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-medium">$31,780</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="font-medium text-green-600">+12.1%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cameras</span>
                  <span className="font-medium">612</span>
                </div>
              </div>
            </div>

            {/* Retail */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30">
                  <Store className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="font-medium">Retail</h3>
                  <p className="text-sm text-gray-500">69 businesses</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Revenue</span>
                  <span className="font-medium">$45,280</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Growth</span>
                  <span className="font-medium text-green-600">+7.4%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cameras</span>
                  <span className="font-medium">752</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Support Tickets & Recent User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <TicketIcon className="w-5 h-5" />
              Recent Support Tickets
            </CardTitle>
            <Link href="/admin/support/tickets" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    ticket.priority === 'High' 
                      ? 'bg-red-500' 
                      : ticket.priority === 'Medium'
                        ? 'bg-amber-500'
                        : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">{ticket.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        ticket.status === 'Open' 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200' 
                          : ticket.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <p className="text-sm font-medium">{ticket.subject}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{ticket.business}</span>
                      <span>{ticket.created}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent User Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              Recent Business Activity
            </CardTitle>
            <Link href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <div className={`p-2 rounded-full ${
                    activity.status === 'active' 
                      ? 'bg-green-100 dark:bg-green-900/30' 
                      : activity.status === 'pending'
                        ? 'bg-amber-100 dark:bg-amber-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                  }`}>
                    {activity.status === 'active' && <CheckCircle className="w-4 h-4 text-green-600" />}
                    {activity.status === 'pending' && <Clock className="w-4 h-4 text-amber-600" />}
                    {activity.status === 'completed' && <FileText className="w-4 h-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">{activity.business}</span>
                      <span className="text-gray-500">{activity.time}</span>
                    </div>
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