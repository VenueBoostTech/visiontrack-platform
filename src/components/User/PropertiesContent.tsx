"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Edit, Eye, Trash2, Plus } from 'lucide-react';
import DeleteModal from '@/components/Common/Modals/DeleteModal';
import Modal from '@/components/Common/Modal';
import PropertyForm, { PropertyFormData } from './PropertyForm';
import toast from "react-hot-toast";

interface Property {
  id: string;
  name: string;
  type: 'RESIDENTIAL' | 'COMMERCIAL' | 'MIXED' | 'RETAIL';
  address: string;
  buildings: any[];
}

export default function PropertiesContent({ 
  initialProperties 
}: { 
  initialProperties: Property[] 
}) {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleView = (propertyId: string) => {
    router.push(`/user/properties/${propertyId}`);
  };

  const handleEdit = (property: Property) => {
    setSelectedProperty(property);
    setShowEditModal(true);
  };

  const handleDeleteClick = (property: Property) => {
    setPropertyToDelete(property);
    setShowDeleteModal(true);
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels = {
      RESIDENTIAL: 'Residential',
      COMMERCIAL: 'Commercial',
      MIXED: 'Mixed Use',
      RETAIL: 'Retail'
    };
    // @ts-ignore
    return labels[type] || type;
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/properties/${propertyToDelete.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete property');
      }
      
      setProperties(prev => prev.filter(p => p.id !== propertyToDelete.id));
      toast.success("Property deleted successfully!");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete property');
    } finally {
      setIsLoading(false);
      setPropertyToDelete(null);
    }
  };


  const handleCreate = async (data: PropertyFormData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create property');
      }
      
      const newProperty = await response.json();
      setProperties(prev => [newProperty, ...prev]);
      setShowCreateModal(false);
      toast.success("Property created successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create property');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: PropertyFormData) => {
    if (!selectedProperty) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/properties/${selectedProperty.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update property');
      }
      
      const updatedProperty = await response.json();
      setProperties(prev => 
        prev.map(p => p.id === selectedProperty.id ? updatedProperty : p)
      );
      setShowEditModal(false);
      toast.success("Property updated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Header with Create Button */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Your Properties</h2>
          <p className="text-sm text-gray-500 mt-1">Manage and monitor all your real estate properties</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Add New Property
        </button>
      </div>

      {/* Properties Table */}
      <div className="bg-white dark:bg-gray-dark rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Buildings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {properties.map((property) => (
                <tr key={property.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{property.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {getPropertyTypeLabel(property.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{property.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{property.buildings.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button 
                        onClick={() => handleView(property.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleEdit(property)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        disabled={isLoading}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(property)}
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
      </div>

      {/* Empty State */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No properties yet
          </h3>
          <p className="text-gray-500 mb-4">
            Get started by creating your first property
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            Create Property
          </button>
        </div>
      )}

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => !isLoading && setShowCreateModal(false)}
        title="Add New Property"
      >
        <PropertyForm
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
          // @ts-ignore
          isSubmitting={isLoading}
        />
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => !isLoading && setShowEditModal(false)}
        title="Edit Property"
      >
        <PropertyForm
          // @ts-ignore
          initialData={selectedProperty}
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Property"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}