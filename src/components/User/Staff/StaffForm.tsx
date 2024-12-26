import { useState } from "react";
import { StaffMember, CreateStaffData, UpdateStaffData } from "@/types/staff";

interface StaffFormProps {
  initialData?: StaffMember;
  businessId: string;
  onSubmit: (data: CreateStaffData | UpdateStaffData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function StaffForm({
  initialData,
  businessId,
  onSubmit,
  onClose,
  isSubmitting,
}: StaffFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.user.name || "",
    email: initialData?.user.email || "",
    password: "",
    department: initialData?.department || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      // Update existing staff
      onSubmit({
        name: formData.name,
        email: formData.email,
        department: formData.department,
      });
    } else {
      // Create new staff
      onSubmit({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        businessId,
        department: formData.department,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Department</label>
        <select
          name="department"
          defaultValue={initialData?.department || ""}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        >
          <option value="">Select Department</option>
          <option value="BRAND_MANAGER">Brand Manager</option>
          <option value="SALES_ASSOCIATE">Sales Associate</option>
        </select>
      </div>

      {!initialData && (
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
            minLength={6}
          />
          <p className="text-sm text-gray-500 mt-1">Minimum 6 characters</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Role</label>
        <p className="text-sm text-gray-600">
          Staff Member (Default permissions)
        </p>
      </div>

      {/* Permissions preview */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-2 dark:bg-gray-800">
        <h4 className="font-medium text-sm">Default Permissions</h4>
        <ul className="text-sm text-gray-600 space-y-1 dark:text-gray-300">
          <li>✓ View assigned properties</li>
          <li>✓ Monitor live cameras</li>
          <li>✓ View analytics reports</li>
          <li>✗ Manage staff members</li>
          <li>✗ Delete resources</li>
        </ul>
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
              ? "Update Staff Member"
              : "Add Staff Member"}
        </button>
      </div>
    </form>
  );
}
