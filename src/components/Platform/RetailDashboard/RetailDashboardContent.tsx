import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Clock,
  Activity,
  ShieldAlert,
  ArrowUp,
  ArrowDown,
  LineChart,
  MonitorPlay,
  Store,
  Group,
  ShoppingCart,
  Eye,
  BarChart2,
  TrendingUp,
  AlertTriangle,
  User,
} from "lucide-react";

const RetailDashboardContent = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold">Welcome back, Griseld 👋</h2>
        <p className="text-gray-500 mt-2">Monitor stores performance with real-time AI vision analytics</p>
    </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Operations Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Operations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">86%</p>
                  <p className="text-sm text-gray-500">Display Compliance</p>
                </div>
                <Store className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Queue Length</span>
                  <span className="font-medium">4.2 mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Coverage</span>
                  <span className="font-medium">92%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Analytics Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Customer Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-gray-500">Today's Traffic</p>
                </div>
                <Group className="w-8 h-8 text-green-500" />
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Conversion Rate</span>
                  <span className="font-medium">23.4%</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Dwell Time</span>
                  <span className="font-medium">18.5 mins</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Stats */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Active Incidents</p>
                </div>
                <ShieldAlert className="w-8 h-8 text-red-500" />
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Loss Prevention</span>
                  <span className="font-medium">2 Alerts</span>
                </div>
                <div className="flex justify-between">
                  <span>Staff Alerts</span>
                  <span className="font-medium">1 Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Activity Map */}
        <Card>
        <CardHeader>
            <div className="flex justify-between items-center w-full">
                <CardTitle>Store Activity Map</CardTitle>
                <select className="text-sm border rounded-md px-2 mb-4 py-1.5 bg-white">
                <option>Heat Map</option>
                <option>Traffic Flow</option>
                <option>Dwell Points</option>
                </select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Store layout heat map visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-time Metrics */}
        <div className="space-y-6">
          {/* Customer Demographics */}
          <Card>
  <CardHeader>
    <CardTitle>Current Demographics</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-3 gap-4">
      <div className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold">42%</p>
          <p className="text-sm text-gray-500">Male</p>
        </div>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-pink-100 rounded-lg dark:bg-pink-900">
            <Users className="w-5 h-5 text-pink-600" />
          </div>
          <p className="text-2xl font-bold">58%</p>
          <p className="text-sm text-gray-500">Female</p>
        </div>
      </div>
      <div className="text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold">31</p>
          <p className="text-sm text-gray-500">Avg. Age</p>
        </div>
      </div>
    </div>
  </CardContent>
</Card>

          {/* Zone Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Zone Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Entrance", traffic: "High", conversion: "32%", trend: "up" },
                  { name: "Center Display", traffic: "Medium", conversion: "28%", trend: "down" },
                  { name: "Checkout Area", traffic: "High", conversion: "45%", trend: "up" }
                ].map((zone) => (
                  <div key={zone.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{zone.name}</p>
                      <p className="text-sm text-gray-500">Traffic: {zone.traffic}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{zone.conversion}</p>
                      <p className="text-sm text-gray-500 flex items-center justify-end gap-1">
                        {zone.trend === "up" ? 
                          <ArrowUp className="w-4 h-4 text-green-500" /> : 
                          <ArrowDown className="w-4 h-4 text-red-500" />
                        }
                        Conversion
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Queue Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Queue Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Average Wait Time</span>
                <span className="font-bold">4.2 mins</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Checkout 1</span>
                  <span className="text-green-500">2 mins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Checkout 2</span>
                  <span className="text-amber-500">6 mins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service Desk</span>
                  <span className="text-red-500">8 mins</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staff Optimization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Staff Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Coverage Score</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sales Floor</span>
                  <span className="text-green-500">Optimal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Checkout Area</span>
                  <span className="text-amber-500">Needs Attention</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Customer Service</span>
                  <span className="text-green-500">Optimal</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Display Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Display Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Compliance Rate</span>
                <span className="font-bold">86%</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Window Displays</span>
                  <span className="text-green-500">Compliant</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>End Caps</span>
                  <span className="text-red-500">Review Needed</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Promotional Areas</span>
                  <span className="text-green-500">Compliant</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailDashboardContent;