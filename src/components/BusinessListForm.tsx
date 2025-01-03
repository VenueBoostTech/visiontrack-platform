"use client";

import { useState } from "react";

export interface BusinessListFormData {
  id: string;
  name: string;
  is_active: boolean;
  is_local_test: boolean;
  is_prod_test: boolean;
}

interface BusinessListFormProps {
  initialData?: BusinessListFormData;
  onSubmit: (data: BusinessListFormData) => Promise<void>;
  onClose: () => void;
}

export default function BusinessListForm({
  initialData,
  onSubmit,
  onClose,
}: BusinessListFormProps) {
  const [formData, setFormData] = useState<BusinessListFormData>(
    initialData || {
      id: "",
      name: "",
      is_active: true,
      is_local_test: false,
      is_prod_test: false,
    }
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="flex gap-2 items-center">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-nowrap">
            Business Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
            required
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Active
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={formData.is_local_test}
              onChange={(e) =>
                setFormData({ ...formData, is_local_test: e.target.checked })
              }
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Local Test
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={formData.is_prod_test}
              onChange={(e) =>
                setFormData({ ...formData, is_prod_test: e.target.checked })
              }
              className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Production Test
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
