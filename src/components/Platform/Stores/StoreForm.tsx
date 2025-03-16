// components/Platform/Zones/ZoneForm.tsx
"use client";

import { useState } from "react";

interface StoreFormProps {
  initialData?: any;
  onSubmit: (data: StoreFormData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
  businessStaffs: any[];
}

interface StoreFormData {
  name: string;
  saleAssociateId: string;
  brandManagerId: string;
}

export default function StoreForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
  businessStaffs,
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
          saleAssociateId: formData.get("saleAssociateId") as string,
          brandManagerId: formData.get("brandManagerId") as string,
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
            name="saleAssociateId"
            defaultValue={initialData?.saleAssociateId}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select Sale Associate</option>
            {
               businessStaffs?.map((staff: any) => (<option key={staff.user.id} value={staff.user.id}>{staff.user.name} - {staff?.department?.name}</option>))
            }
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Brand Manager
          </label>
          <select
            name="brandManagerId"
            defaultValue={initialData?.brandManagerId}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select Brand Manager</option>
            {
               businessStaffs?.map((staff: any) => (<option key={staff.user.id} value={staff.user.id}>{staff.user.name} - {staff?.department?.name}</option>))
            }
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
