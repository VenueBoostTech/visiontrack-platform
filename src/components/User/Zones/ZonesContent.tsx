// components/User/Zones/ZonesContent.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Map, Layers, Edit, Trash2, Plus, Search, Filter, Camera, Building, CheckCircle } from 'lucide-react';
import Modal from '@/components/Common/Modal';
import DeleteModal from '@/components/Common/Modals/DeleteModal';
import toast from 'react-hot-toast';
import ZoneForm from './ZoneForm';

interface Zone {
  id: string;
  name: string;
  type: string;
  floor: number | null;
  coordinates: any;
  building: {
    id: string;
    name: string;
    property: {
      id: string;
      name: string;
    }
  }
  property: {
    id: string;
    name: string;
  }
  store?: {
    id: string;
    name: string;
  } | null;
  cameras: any[];
}

export default function ZonesContent({ initialZones }: { initialZones: Zone[] }) {
  const [zones, setZones] = useState<Zone[]>(initialZones);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/user/zones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create zone');
      }
      
      const newZone = await response.json();
      setZones(prev => [newZone, ...prev]);
      setShowCreateModal(false);
      toast.success("Zone created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create zone');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedZone) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/user/zones/${selectedZone.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update zone');
      }
      
      const updatedZone = await response.json();
      setZones(prev => 
        prev.map(z => z.id === selectedZone.id ? updatedZone : z)
      );
      setShowEditModal(false);
      toast.success("Zone updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update zone');
    } finally {
      setIsSubmitting(false);
      setSelectedZone(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedZone) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/zones/${selectedZone.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete zone');

      setZones(prev => prev.filter(z => z.id !== selectedZone.id));
      toast.success('Zone deleted successfully');
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete zone');
    } finally {
      setIsLoading(false);
      setSelectedZone(null);
    }
  };

  const handleCloseModal = useCallback(() => {
    if (!isSubmitting) {
      setShowCreateModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
      setSelectedZone(null);
    }
  }, [isSubmitting]);

  const getZoneTypeColor = (type: string) => {
    const colors = {
      ENTRANCE: 'bg-blue-100 text-blue-800',
      LOBBY: 'bg-green-100 text-green-800',
      PARKING: 'bg-yellow-100 text-yellow-800',
      COMMON_AREA: 'bg-purple-100 text-purple-800',
      GARAGE: 'bg-orange-100 text-orange-800',
      RETAIL: 'bg-pink-100 text-pink-800',
      SERVICE: 'bg-gray-100 text-gray-800',
      OUTDOOR: 'bg-teal-100 text-teal-800',
      WAREHOUSE: 'bg-indigo-100 text-indigo-800',  // Deep blue-purple shade
      HALL: 'bg-amber-100 text-amber-800'          // Warm golden shade  
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Zones</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your building zones and access areas</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Add Zone
        </button>
      </div>

      {/* Stats */}
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Zones</p>
              <h3 className="text-xl font-bold">{zones.length}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <Building className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Buildings with Zones</p>
              <h3 className="text-xl font-bold">
                {new Set(zones.map(zone => zone?.building?.name)).size}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Camera className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monitored Zones</p>
              <h3 className="text-xl font-bold">
                {zones.filter(zone => zone.cameras?.length > 0).length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <CheckCircle className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Floors</p>
              <h3 className="text-xl font-bold">
                {new Set(zones.map(zone => zone.floor).filter(Boolean)).size}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Search and Filter */}
        <div className="p-4 border-b">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search zones..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Zones Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Floor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Building</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Store</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Cameras</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    Loading zones...
                  </td>
                </tr>
              ) : zones.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    No zones found
                  </td>
                </tr>
              ) : (
                zones.map((zone) => (
                  <tr key={zone.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{zone.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getZoneTypeColor(zone.type)}`}>
                        {zone.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{zone.floor || '0'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone?.building?.property?.name} - {zone?.building?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {zone.store?.name || 'No Store'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{zone.cameras?.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-right gap-2">
                        <button
                          onClick={() => {
                            setSelectedZone(zone);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          disabled={isLoading}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedZone(zone);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Zone Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        title="Add New Zone"
      >
        <ZoneForm 
          onSubmit={handleCreate}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Zone Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        title="Edit Zone"
      >
        <ZoneForm 
          initialData={selectedZone}
          onSubmit={handleUpdate}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Zone"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}