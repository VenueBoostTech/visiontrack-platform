"use client";

import { useState } from "react";
import { Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Modal from "@/components/Common/Modal";
import DeleteModal from "@/components/Common/Modals/DeleteModal";

interface VTApiCredential {
  id: string;
  name: string;
  api_key: string;
  platform_id: string;
  createdAt: Date;
  lastUsed?: Date | null;
}

interface Props {
  initialCredential: VTApiCredential | null;
  businessId: string | undefined;
}


const formatDate = (date: Date | null | undefined) => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

export default function VTCredentialsContent({ initialCredential, businessId }: Props) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [credential, setCredential] = useState<VTApiCredential | null>(initialCredential);
  const [showApiKey, setShowApiKey] = useState<string | null>(null);

  const handleCreateCredential = async (formData: FormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/user/vt-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name")
        }),
      });

      if (!response.ok) throw new Error("Failed to create credential");

      const newCredential = await response.json();
      setCredential(newCredential);
      setShowCreateModal(false);
      toast.success("API credential created successfully");
    } catch (error) {
      toast.error("Failed to create API credential");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add copy function
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    toast.success("API key copied to clipboard");
  };

  const handleDelete = async () => {
    if (!credential) return;
    
    try {
      setIsSubmitting(true);
      const response = await fetch(`/api/user/vt-credentials/${credential.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete credential");

      setCredential(null);
      setShowDeleteModal(false);
      toast.success("API credential deleted successfully");
    } catch (error) {
      toast.error("Failed to delete API credential");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">VisionTrack API Credentials</h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your VisionTrack API access
            </p>
          </div>
          {!credential && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            >
              <Plus className="w-4 h-4" />
              Create API Credential
            </button>
          )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Key
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Last Used
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
            {!credential ? (
    <tr>
      <td colSpan={5} className="px-6 py-4 text-center">
        No API credential found
      </td>
    </tr>
  ) : (
    <tr className="border-t dark:border-gray-700">
      <td className="px-6 py-4">{credential.name}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="font-mono">
            {showApiKey === credential.id ? credential.api_key : "••••••••••••••••"}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowApiKey(showApiKey === credential.id ? null : credential.id)}
              className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title={showApiKey === credential.id ? "Hide API key" : "Show API key"}
            >
              {showApiKey === credential.id ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => handleCopyKey(credential.api_key)}
              className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy API key"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {credential.createdAt ? formatDate(credential.createdAt) : '-'}
      </td>
      <td className="px-6 py-4">
        {credential.lastUsed ? (
          formatDate(credential.lastUsed)
        ) : (
          <span className="text-gray-400 dark:text-gray-500">Never used</span>
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-1 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Delete credential"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create VisionTrack API Credential"
      >
        <form
          action={handleCreateCredential}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter a name for this credential"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-4 pt-3 border-t dark:border-gray-700">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Credential"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete API Credential"
        handleDelete={handleDelete}
        loading={isSubmitting}
      />
    </div>
  );
}