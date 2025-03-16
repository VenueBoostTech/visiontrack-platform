// components/User/PropertyDetails.tsx
"use client";

import { Building2, Plus } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Modal from '@/components/Common/Modal';

interface Building {
  id: string;
  name: string;
  type: string;
  floorCount: number;
  belowGroundFloors: number;
  createdAt: Date;
}

interface Property {
  id: string;
  name: string;
  type: string;
  address: string;
  buildings: Building[];
}

interface BuildingFormData {
  name: string;
  floorCount: number;
  belowGroundFloors: number;
}

export default function PropertyDetails({
  property
}: {
  property: Property
}) {
  const [buildings, setBuildings] = useState(property.buildings);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateBuilding = async (data: BuildingFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/properties/${property.id}/buildings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create building');
      }
      
      const newBuilding = await response.json();
      setBuildings(prev => [newBuilding, ...prev]);
      setShowCreateModal(false);
      toast.success("Building created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create building');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Property Info */}
      <div className="bg-white dark:bg-gray-dark rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-bold mb-4">{property.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Type</p>
            <p className="font-medium">{property.type}</p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Address</p>
            <p className="font-medium">{property.address}</p>
          </div>
        </div>
      </div>

      {/* Buildings Section */}
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Buildings</h3>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Add Building
            </button>
          </div>
        </div>

        {/* Buildings List */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Floors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {buildings.map((building) => (
                <tr key={building.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {building.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {building.floorCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(building.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {buildings.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No buildings yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by adding your first building
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Add Building
            </button>
          </div>
        )}
      </div>

      {/* Create Building Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => !isLoading && setShowCreateModal(false)}
        title="Add New Building"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleCreateBuilding({
            name: formData.get('name') as string,
            floorCount: parseInt(formData.get('floorCount') as string),
            belowGroundFloors: parseInt(formData.get('belowGroundFloors') as string) || 0
          });
        }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Building Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Below Ground Floors</label>
                <input
                  type="number"
                  name="belowGroundFloors"
                  min="0"
                  defaultValue="0"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                />
                <p className="text-xs text-gray-500 mt-1">Optional: number of basement levels</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Above Ground Floors</label>
                <input
                  type="number"
                  name="floorCount"
                  min="1"
                  className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Will be numbered 0 to N-1</p>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg border"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Building'}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}