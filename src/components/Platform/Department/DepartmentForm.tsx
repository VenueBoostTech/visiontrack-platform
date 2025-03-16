import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from "@/types/department";
import { useState } from "react";

interface DepartmentProps {
  initialData?: Department;
  onSubmit: (data: CreateDepartment | UpdateDepartment) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function DepartmentForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: DepartmentProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initialData) {
      // Update existing department
      onSubmit({
        name: formData.name,
      });
    } else {
      // Create new department
      onSubmit({
        name: formData.name,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
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
              ? "Update Department"
              : "Add Department"}
        </button>
      </div>
    </form>
  );
}
