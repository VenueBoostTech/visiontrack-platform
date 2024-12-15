// components/User/BuildingsContent.tsx
"use client";

import { useState } from 'react';
import { Building2, Edit, Trash2, Plus } from 'lucide-react';
import Modal from '@/components/Common/Modal';
import DeleteModal from '@/components/Common/Modals/DeleteModal';
import BuildingForm from '@/components/User/BuldingForm';
import toast from "react-hot-toast";

interface Building {
  id: string;
  name: string;
  floorCount: number;
  createdAt: Date;
  property: {
    id: string;
    name: string;
  };
  zones: any[];
  propertyId: string;
}

export default function BuildingsContent({ 
  initialBuildings 
}: { 
  initialBuildings: Building[] 
}) {
  const [buildings, setBuildings] = useState<Building[]>(initialBuildings);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data: { name: string; floorCount: number; propertyId: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/buildings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create building');
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

  const handleUpdate = async (data: { name: string; floorCount: number; propertyId: string }) => {
    if (!selectedBuilding) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/buildings/${selectedBuilding.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update building');
      }
      
      const updatedBuilding = await response.json();
      setBuildings(prev => 
        prev.map(b => b.id === selectedBuilding.id ? updatedBuilding : b)
      );
      setShowEditModal(false);
      toast.success("Building updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update building');
    } finally {
      setIsLoading(false);
      setSelectedBuilding(null);
    }
  };

  const handleDeleteClick = (building: Building) => {
    setSelectedBuilding(building);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedBuilding) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/buildings/${selectedBuilding.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete building');
      }
      
      setBuildings(prev => prev.filter(b => b.id !== selectedBuilding.id));
      toast.success("Building deleted successfully!");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete building');
    } finally {
      setIsLoading(false);
      setSelectedBuilding(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  

  return (
    <div>
     <div className="mb-6 flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold">Buildings</h2>
        <p className="text-sm text-gray-500 mt-1">Manage and monitor all buildings across your properties</p>
      </div>
      <button
        onClick={() => setShowCreateModal(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        disabled={isLoading}
      >
        <Plus className="w-4 h-4" />
        Add Building
      </button>
    </div>

    {/* Rest of your table code */}
    <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Property</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Floors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Zones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {buildings.map((building) => (
                <tr key={building.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{building.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{building.property.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{building.floorCount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{building.zones.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {formatDate(new Date(building.createdAt))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          setSelectedBuilding(building);
                          setShowEditModal(true);
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(building)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {buildings.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No buildings found
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first building
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
              Add Building
            </button>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => !isLoading && setShowCreateModal(false)}
        title="Add New Building"
      >
        <BuildingForm
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => !isLoading && setShowEditModal(false)}
        title="Edit Building"
      >
        <BuildingForm
          initialData={selectedBuilding}
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Building"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}