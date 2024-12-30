"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Camera,
  Edit,
  Power,
  Plus,
  Search,
  Filter,
  AlertCircle,
  Trash2,
  Eye,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Common/Modal";
import CameraForm from "./CameraForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import { useRouter } from "next/navigation";

interface CameraData {
  id: string;
  name: string;
  location: string;
  rtspUrl: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  type: "INDOOR" | "OUTDOOR" | "THERMAL";
  direction?: string;
  zone: {
    name: string;
    building: {
      name: string;
      property: {
        name: string;
      };
    };
  };
}

export default function CamerasContent() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [cameraToDelete, setCameraToDelete] = useState<CameraData | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameras, setCameras] = useState<CameraData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchCameras = async () => {
    try {
      const response = await fetch("/api/user/cameras");
      if (!response.ok) throw new Error("Failed to fetch cameras");
      const data = await response.json();
      setCameras(data);
    } catch (error) {
      toast.error("Failed to load cameras");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  const handleDeleteCamera = async () => {
    if (!cameraToDelete) return;
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/user/cameras/${cameraToDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete camera");

      setCameras((prev) =>
        prev.filter((camera) => camera.id !== cameraToDelete.id)
      );
      toast.success("Camera deleted successfully");
      setShowDeleteModal(false);
      setCameraToDelete(null);
    } catch (error) {
      toast.error("Failed to delete camera");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateCamera = async (formData: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/user/cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create camera");
      }

      const newCamera = await response.json();
      setCameras((prev) => [newCamera, ...prev]);
      toast.success("Camera added successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create camera"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCamera = async (formData: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/user/cameras/${selectedCamera?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update camera");
      }

      const updatedCamera = await response.json();
      setCameras((prev) =>
        prev.map((camera) =>
          camera.id === updatedCamera.id ? updatedCamera : camera
        )
      );
      toast.success("Camera updated successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update camera"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (camera: CameraData) => {
    try {
      const newStatus = camera.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      const response = await fetch(`/api/user/cameras/${camera.id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update camera status");
      }

      const updatedCamera = await response.json();
      setCameras((prev) =>
        prev.map((cam) => (cam.id === camera.id ? updatedCamera : cam))
      );
      toast.success(`Camera ${newStatus.toLowerCase()}`);
    } catch (error) {
      toast.error("Failed to update camera status");
    }
  };

  const handleView = (cameraId: string) => {
    router.push(`/user/properties/cameras/${cameraId}`);
  };

  const handleCloseModal = useCallback(() => {
    if (!isSubmitting) {
      setShowCreateModal(false);
      setShowEditModal(false);
      setShowDeleteModal(false);
      setSelectedCamera(null);
    }
  }, [isSubmitting]);

  // Calculate stats
  const activeCamerasCount = cameras.filter(
    (camera) => camera.status === "ACTIVE"
  ).length;
  const inactiveCamerasCount = cameras.filter(
    (camera) => camera.status === "INACTIVE"
  ).length;
  const maintenanceCamerasCount = cameras.filter(
    (camera) => camera.status === "MAINTENANCE"
  ).length;

  return (
    <div className="px-5">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Camera className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Cameras</p>
              <h3 className="text-xl font-bold">{activeCamerasCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Power className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Inactive Cameras</p>
              <h3 className="text-xl font-bold">{inactiveCamerasCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">In Maintenance</p>
              <h3 className="text-xl font-bold">{maintenanceCamerasCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Camera className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Cameras</p>
              <h3 className="text-xl font-bold">{cameras.length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className="p-6 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Cameras</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage and monitor all your cameras
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Add Camera
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search cameras..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Cameras Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Zone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Building
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    Loading cameras...
                  </td>
                </tr>
              ) : cameras.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    No cameras found
                  </td>
                </tr>
              ) : (
                cameras.map((camera) => (
                  <tr key={camera.id} className="border-t dark:border-gray-700">
                    <td className="px-6 py-4">{camera.name}</td>
                    <td className="px-6 py-4">{camera.location}</td>
                    <td className="px-6 py-4">{camera.type}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          camera.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : camera.status === "MAINTENANCE"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {camera.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{camera?.zone?.name}</td>
                    <td className="px-6 py-4">
                      {camera?.zone?.building?.name
                        ? camera?.zone?.building?.name
                        : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-right items-right gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleView(camera.id);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          disabled={isLoading}
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCamera(camera);
                            setShowEditModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                          title="Edit camera"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(camera)}
                          className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                          title={
                            camera.status === "ACTIVE"
                              ? "Deactivate camera"
                              : "Activate camera"
                          }
                        >
                          <Power
                            className={`w-4 h-4 ${camera.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`}
                          />
                        </button>
                        <button
                          onClick={() => {
                            setCameraToDelete(camera);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                          title="Delete camera"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Camera"
        handleDelete={handleDeleteCamera}
        loading={isLoading}
      />

      {/* Create Camera Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        title="Add New Camera"
      >
        <CameraForm
          onSubmit={handleCreateCamera}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit Camera Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseModal}
        title="Edit Camera"
      >
        <CameraForm
          initialData={{
            ...selectedCamera,
            zoneId: selectedCamera?.zone?.id || "",
          }}
          onSubmit={handleEditCamera}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}
