"use client";

import { useEffect, useState } from 'react';
import { Users, Clock, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { VTDemographicsService } from '@/lib/vt-external-api/services/vt-demographics.service';
import vtClient from "../../../lib/vt-external-api/client";

const mockData = {
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
  const [timeRange, setTimeRange] = useState('week');
  const [demographics, setDemographics] = useState<any>(null);

  const getDemographics = async (zone: string, timeRange: string) => {
    try {
      if (user.ownedBusiness.vtCredentials && timeRange) {
        vtClient.setCredentials({
          platform_id: user.ownedBusiness.vtCredentials.businessId,
          api_key: user.ownedBusiness.vtCredentials.api_key,
          business_id: user.ownedBusiness.vtCredentials.platform_id,
        });

        //get demographics
        const response: any = await VTDemographicsService.getDemographics(zone, timeRange);

        //Sort age_groups by age
        response.age_groups = response.age_groups.sort((a: any, b: any) => {
          const getAgeRange = (age: any) => {
            const match = age.match(/(\d+)-(\d+)/);  // Modified regex to match age range without parentheses
            return match ? parseInt(match[1]) : 0;
          };
          // Remove parentheses from the age and update the key
          a.age = a.age.replace(/[()]/g, '');
          b.age = b.age.replace(/[()]/g, '');

          return getAgeRange(a.age) - getAgeRange(b.age);
        });

        //get daily average
        response.daily_average = response.total_count / (timeRange === "week" ? 7 : timeRange === "month" ? 30 : timeRange === "quarter" ? 365 : 1)

        setDemographics(response);
      }
    } catch (error) {
      toast.error("Failed to fetch demographics");
    }
  }

  useEffect(() => {
    getDemographics("all", timeRange);
  }, [timeRange]);

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
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Year</option>
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
              <h3 className="text-xl font-bold">
                {demographics?.total_count?.toLocaleString() || 0}
              </h3>
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
              <h3 className="text-xl font-bold">{Math.round(demographics?.daily_average).toLocaleString()}</h3>
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
                {Math.round((demographics?.gender_distribution?.Male / demographics?.gender_distribution?.Female) * 100) / 100 || 0}
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
              <BarChart data={demographics?.age_groups || []}>
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