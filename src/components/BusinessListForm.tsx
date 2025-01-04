"use client";

import { Business } from "@prisma/client";
import { useEffect, useState } from "react";
import { Check } from 'lucide-react';

export interface BusinessListFormData {
  id: string;
  name: string;
  is_active: boolean;
  is_local_test: boolean;
  is_prod_test: boolean;
  vt_platform_id: string;
}

interface BusinessListFormProps {
  initialData?: BusinessListFormData;
  onSubmit: (data: BusinessListFormData) => Promise<void>;
  onClose: () => void;
  businesses?: [Business];
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={`
        w-5 h-5 border-2 rounded
        flex items-center justify-center
        transition-colors duration-200
        ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}
        group-hover:${checked ? 'bg-blue-700 border-blue-700' : 'border-blue-500'}
        dark:border-gray-600 dark:bg-gray-800
      `}>
        {checked && <Check size={14} className="text-white" />}
      </div>
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
  </label>
);

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
      vt_platform_id: "",
    }
  );
  const [businesses, setBusinesses] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch("/api/admin/vtbusiness/business");
        const data = await response.json();
        setBusinesses(data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      }
    };
    fetchBusinesses();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formData.id) {
        await onSubmit(formData);
      } else {
        const business = businesses?.find(
          (b: any) => b.id == formData.vt_platform_id
        );

        const data = {
          ...formData,
          role: business.owner.role,
          name: business.name,
        };
        await onSubmit(data);
      }

      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-7">
        {(initialData?.id === "" || initialData?.id === undefined) && (
          <div className="flex gap-2 items-center">
            <select
              value={formData.vt_platform_id}
              onChange={(e) =>
                setFormData({ ...formData, vt_platform_id: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-gray-600 dark:bg-gray-800"
              required
            >
              <option value="">Select a business</option>
              {businesses?.map((business: any) => (
                <option key={business.id} value={business.id}>
                  {business.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Checkbox
            label="Active"
            checked={formData.is_active}
            onChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <Checkbox
            label="Local Test"
            checked={formData.is_local_test}
            onChange={(checked) => setFormData({ ...formData, is_local_test: checked })}
          />
          <Checkbox
            label="Production Test"
            checked={formData.is_prod_test}
            onChange={(checked) => setFormData({ ...formData, is_prod_test: checked })}
          />
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
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}