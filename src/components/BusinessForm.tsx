"use client";

import { useState } from "react";
import { BusinessType } from "@prisma/client";

export interface BusinessFormData {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessType: BusinessType;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
}

interface BusinessFormProps {
  initialData?: Partial<BusinessFormData>;
  onSubmit: (data: BusinessFormData) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
}

export default function BusinessForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
  mode = 'create'
}: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: initialData?.businessName || '',
    businessEmail: initialData?.businessEmail || '',
    businessPhone: initialData?.businessPhone || '',
    businessAddress: initialData?.businessAddress || '',
    businessType: initialData?.businessType || 'RETAIL',
    ownerName: initialData?.ownerName || '',
    ownerEmail: initialData?.ownerEmail || '',
    ownerPassword: initialData?.ownerPassword || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Business Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Email
            </label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Phone
            </label>
            <input
              type="tel"
              value={formData.businessPhone}
              onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Business Type
            </label>
            <select
              value={formData.businessType}
              onChange={(e) => setFormData({ ...formData, businessType: e.target.value as BusinessType })}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            >
              <option value="RETAIL">Retail</option>
              <option value="COMMERCIAL_REAL_ESTATE">Commercial Real Estate</option>
              <option value="MANUFACTURING_WAREHOUSING">Manufacturing & Warehousing</option>
              <option value="MULTI_FAMILY_RESIDENTIAL">Multi-Family Residential</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Business Address
          </label>
          <input
            type="text"
            value={formData.businessAddress}
            onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        {mode === 'create' && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium mb-1">
                Owner Name
              </label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Owner Email
              </label>
              <input
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-1">
                Owner Password
              </label>
              <input
                type="password"
                value={formData.ownerPassword}
                onChange={(e) => setFormData({ ...formData, ownerPassword: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border dark:border-gray-700"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-primary text-white"
          >
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </form>
  );
}