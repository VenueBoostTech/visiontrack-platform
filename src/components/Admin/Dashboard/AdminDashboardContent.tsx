// components/Admin/Dashboard/AdminDashboardContent.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Users, Building2, Shield, Activity } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DataStatsCard from "@/components/Admin/Dashboard/DataStatsCard";
import GraphCard from "@/components/Admin/Dashboard/GraphCard";
import { dataStats, overviewData } from "@/staticData/statsData";
import { getDashboardStats } from "@/actions/dashboard";

type DashboardStats = {
  totalUsers: number;
  businessOwners: number;
  staffMembers: number;
  adminUsers: number;
  activeBusinesses: number;
};

export default function AdminDashboardContent() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDashboardStats();
      setStats(data);
    };
    fetchStats();
  }, []);

  if (!stats) return null;

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="h-6 w-6" />,
      link: "/admin/manage-users"
    },
    {
      title: "Business Owners",
      value: stats.businessOwners,
      icon: <Building2 className="h-6 w-6" />,
      link: "/admin/manage-users?filter=BUSINESS_OWNER"
    },
    {
      title: "Staff Members",
      value: stats.staffMembers,
      icon: <Shield className="h-6 w-6" />,
      link: "/admin/manage-users?filter=STAFF"
    },
    {
      title: "Active Businesses",
      value: stats.activeBusinesses,
      icon: <Activity className="h-6 w-6" />,
      link: "/admin/businesses"
    }
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <Card className="p-6 hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* <div className="grid grid-cols-1 gap-7.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4">
        {dataStats.map((data) => (
          <DataStatsCard key={data?.id} data={data} />
        ))}
      </div>

      <div>
        <div className="mb-7.5">
          <h3 className="mb-2 font-satoshi text-heading-5 font-bold tracking-[-.5px] text-dark dark:text-white">
            Overview
          </h3>
          <p className="font-satoshi font-medium tracking-[-.2px] text-body dark:text-gray-4">
            An overview of your organization's activity and performance across all your projects.
          </p>
        </div>

        <div className="grid gap-7.5 md:grid-cols-2 xl:grid-cols-3">
          {overviewData.map((data) => (
            <GraphCard key={data?.id} data={data} />
          ))}
        </div>
      </div> */}
    </div>
  );
}