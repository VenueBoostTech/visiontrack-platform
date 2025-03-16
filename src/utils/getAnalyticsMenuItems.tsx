import { Activity, Brain, Car, MapPin, Target, TrendingUp, Users } from "lucide-react";

import { Users2 } from "lucide-react";

export const getAnalyticsMenuItems = (businessType: string = 'RETAIL') => {
    // Base items for all business types
    const baseItems = [
      {
        id: "4-1",
        title: "People Counter",
        path: "/platform/analytics/people",
        icon: <Users2 className="w-4 h-4" />
      },
      {
        id: "4-2",
        title: "Heatmaps",
        path: "/platform/analytics/heatmaps",
        icon: <Activity className="w-4 h-4" />
      },
      {
        id: "4-3",
        title: "Demographics",
        path: "/platform/analytics/demographics",
        icon: <Users className="w-4 h-4" />
      },
    ];
  
    // Items only for retail businesses
    if (businessType === 'RETAIL') {
      return [
        {
          id: "4-1",
          title: "Customer Traffic",
          path: "/platform/analytics/traffic",
          icon: <TrendingUp className="w-4 h-4" />
        },
        {
          id: "4-2",
          title: "Demographics",
          path: "/platform/analytics/demographics",
          icon: <Users className="w-4 h-4" />
        },
        {
          id: "4-3",
          title: "Behavior Analysis",
          path: "/platform/analytics/behavior",
          icon: <Brain className="w-4 h-4" />
        },
        {
          id: "4-4",
          title: "Heat Mapping",
          path: "/platform/analytics/heatmaps",
          icon: <Activity className="w-4 h-4" />
        },
        {
          id: "4-5",
          title: "Conversion Tracking",
          path: "/platform/analytics/conversion",
          icon: <Target className="w-4 h-4" />
        },
        {
            id: "4-6",
            title: "Customer Counter",
            path: "/platform/analytics/people",
            icon: <Users2 className="w-4 h-4" />
          },
      ];
    }
  
    // For other business types like residential, add parking and plates
    return [
      ...baseItems,
      {
        id: "4-4",
        title: "Parking",
        path: "/platform/analytics/parking",
        icon: <MapPin className="w-4 h-4" />
      },
      {
        id: "4-5",
        title: "License Plates",
        path: "/platform/analytics/plates",
        icon: <Car className="w-4 h-4" />
      }
    ];
  };