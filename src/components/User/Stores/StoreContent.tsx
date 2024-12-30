// components/User/Stores/StoresContent.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Layers, Edit, Trash2, Plus, Search, Filter, Users, Camera, UserCheck } from "lucide-react";
import Modal from "@/components/Common/Modal";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import toast from "react-hot-toast";
import StoreForm from "./StoreForm";

interface Store {
  id: string;
  name: string;
  brandManager: {
    id: string;
    name: string;
  };
  saleAssociate: {
    id: string;
    name: string;
  };
  saleAssociateId: string;
  brandManagerId: string;
  cameras: any[];
}

export default function StoreContent({
  initialStores,
  businessStaffs,
}: {
  initialStores: Store[];
  businessStaffs: any[];
}) {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create store");
      }

      const newStore = await response.json();
      setStores((prev) => [newStore, ...prev]);
      setShowCreateModal(false);
      toast.success("Store created successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create store"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: any) => {
    if (!selectedStore) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/user/stores/${selectedStore.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update store");
      }

      const updatedStore = await response.json();
      setStores((prev) =>
        prev.map((z) => (z.id === selectedStore.id ? updatedStore : z))
      );
      setShowEditModal(false);
      toast.success("Store updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update store"
      );
    } finally {
      setIsSubmitting(false);
      setSelectedStore(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedStore) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/stores/${selectedStore.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete store");

      setStores((prev) => prev.filter((z) => z.id !== selectedStore.id));
      toast.success("Store deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete store"
      );
    } finally {
      setIsLoading(false);
      setSelectedStore(null);
    }
  };

  const handleCloseModal = useCallback(() => {
    if (!isSubmitting) {
      setShowCreateModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
      setSelectedStore(null);
    }
  }, [isSubmitting]);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Stores</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your stores</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          disabled={isLoading}
        >
          <Plus className="w-4 h-4" />
          Add Store
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Stores */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Stores</p>
              <h3 className="text-xl font-bold">{stores.length}</h3>
            </div>
          </div>
        </div>

        {/* Stores with Cameras */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <Camera className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monitored Stores</p>
              <h3 className="text-xl font-bold">
                {stores.filter(store => store.cameras?.length > 0).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Brand Managers */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Brand Managers</p>
              <h3 className="text-xl font-bold">
                {new Set(stores.map(store => store.brandManagerId)).size}
              </h3>
            </div>
          </div>
        </div>

        {/* Sales Associates */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <UserCheck className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Sales Associates</p>
              <h3 className="text-xl font-bold">
                {new Set(stores.map(store => store.saleAssociateId)).size}
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
                placeholder="Search stores..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Store Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Sales Associate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Brand Manager
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    Loading stores...
                  </td>
                </tr>
              ) : stores.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center">
                    No store found
                  </td>
                </tr>
              ) : (
                stores.map((store: Store) => {
                  return (
                    <tr key={store.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-medium">
                        {store.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {store.saleAssociate?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {store.brandManager?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-right gap-2">
                          <button
                            onClick={() => {
                              setSelectedStore(store);
                              setShowEditModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            disabled={isLoading}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStore(store);
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
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Store Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        title="Add New Store"
      >
        <StoreForm
          onSubmit={handleCreate}
          onClose={handleCloseModal}
          businessStaffs={businessStaffs}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Store Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        title="Edit Store"
      >
        <StoreForm
          initialData={selectedStore}
          onSubmit={handleUpdate}
          businessStaffs={businessStaffs}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Store"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}
