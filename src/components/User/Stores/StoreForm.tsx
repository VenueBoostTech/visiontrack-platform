// components/User/Zones/ZoneForm.tsx
"use client";

import { useState } from "react";

interface StoreFormProps {
  initialData?: any;
  onSubmit: (data: StoreFormData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

interface StoreFormData {
  name: string;
  sale_associate: string;
  brand_manager: string;
}

export default function StoreForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: StoreFormProps) {

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        onSubmit({
          name: formData.get("name") as string,
          sale_associate: formData.get("sale_associate") as string,
          brand_manager: formData.get("brand_manager") as string,
        });
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Store Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            {" "}
            Sale Associate
          </label>
          <select
            name="sale_associate"
            defaultValue={initialData?.sale_associate}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select Sale Associate</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Bob Johnson">Bob Johnson</option>
            <option value="Alice Brown">Alice Brown</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Brand Manager
          </label>
          <select
            name="brand_manager"
            defaultValue={initialData?.brand_manager}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select Brand Manager</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Bob Johnson">Bob Johnson</option>
            <option value="Alice Brown">Alice Brown</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : initialData
                ? "Update Store"
                : "Create Store"}
          </button>
        </div>
      </div>
    </form>
  );
}
