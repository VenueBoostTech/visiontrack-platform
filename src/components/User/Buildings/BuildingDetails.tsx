// components/User/Buildings/BuildingDetails.tsx
"use client";

import { useEffect, useState } from 'react';
import { Building2, Video, Home } from 'lucide-react';
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";

interface Building {
    id: string;
    name: string;
    floorCount: number;
    belowGroundFloors: number;
    property: {
      id: string;
      name: string;
      type: string;
      address: string;
    };
    zones: Zone[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  interface Zone {
    id: string;
    name: string;
    type: string;
    floor: number;
    cameras: Camera[];
  }
  
  interface Camera {
    id: string;
    name: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
    type: 'INDOOR' | 'OUTDOOR' | 'THERMAL';
    rtspUrl: string;
    direction?: string;
  }

export default function BuildingDetails({ buildingId }: { buildingId: string }) {
  const [building, setBuilding] = useState<Building | null>(null);
  const [activeFloor, setActiveFloor] = useState<number | null>(null);

  const getAllFloors = (floorCount: number, belowGroundFloors: number) => {
    const floors = [];
    // Add below ground floors if any
    for (let i = belowGroundFloors; i > 0; i--) {
      floors.push(-i);
    }
    // Add regular floors (0 to floorCount-1)
    for (let i = 0; i < floorCount; i++) {
      floors.push(i);
    }
    return floors;
  };

  const getFloorLabel = (floor: number) => {
    if (floor < 0) return `Basement ${Math.abs(floor)}`;
    return `Floor ${floor}`;
  };

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await fetch(`/api/user/buildings/${buildingId}`);
        if (response.ok) {
          const data = await response.json();
          setBuilding(data);
          if (data.floorCount > 0) {
            setActiveFloor(1);
          }
        }
      } catch (error) {
        console.error('Error fetching building:', error);
      }
    };

    fetchBuilding();
  }, [buildingId]);

  if (!building) return null;

  const getZonesForFloor = (floor: number) => {
    return building.zones.filter(zone => zone.floor === floor);
  };

  const totalCameras = building.zones.reduce((acc, zone) => acc + zone.cameras.length, 0);
  const formatDate = (date: Date) => new Date(date).toLocaleDateString();

  return (
    <>
      <Breadcrumb 
        pageTitle={building.name}
        pagePath={[
          { title: "Buildings", url: "/user/buildings" },
          { title: building.name }
        ]} 
      />

      {/* Building Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">{building.name}</h2>
            <div className="space-y-2">
              <p className="text-gray-500">
                <span className="font-medium">Property:</span> {building.property.name}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Type:</span> {building.property.type}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Address:</span> {building.property.address}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Created:</span> {formatDate(building.createdAt)}
              </p>
              <p className="text-gray-500">
                <span className="font-medium">Last Updated:</span> {formatDate(building.updatedAt)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Home className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <h3 className="text-lg font-bold">{building.property.type}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Floors</p>
                  <h3 className="text-lg font-bold">{building.floorCount}</h3>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Video className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cameras</p>
                  <h3 className="text-lg font-bold">{totalCameras}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Building Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Floor & Zone Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-medium mb-4">Floors</h3>
            <div className="space-y-2">
              {building && getAllFloors(building.floorCount, building.belowGroundFloors).map((floor) => (
                <button
                  key={floor}
                  onClick={() => setActiveFloor(floor)}
                  className={`w-full px-4 py-2 text-left rounded-lg ${
                    activeFloor === floor ? 'bg-primary text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{getFloorLabel(floor)}</span>
                    <span className="text-sm">
                      {getZonesForFloor(floor).length} zones
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Floor Details & Zones */}
        <div className="lg:col-span-2">
          {activeFloor && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Floor {activeFloor} Zones</h3>
              </div>

              <div className="space-y-4">
                {getZonesForFloor(activeFloor).map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{zone.name}</h4>
                        <p className="text-sm text-gray-500">{zone.type}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {zone.cameras.length} cameras
                      </span>
                    </div>

                    {zone.cameras.length > 0 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium mb-2">Cameras:</p>
                        <div className="space-y-2">
                          {zone.cameras.map((camera) => (
                            <div key={camera.id} className="flex items-center justify-between text-sm">
                              <span>{camera.name}</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                camera.status === 'ACTIVE' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {camera.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {getZonesForFloor(activeFloor).length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No zones on this floor
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}