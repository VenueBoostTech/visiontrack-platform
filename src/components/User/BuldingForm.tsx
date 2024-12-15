"use client";

import { useEffect, useState } from 'react';

interface Property {
  id: string;
  name: string;
}

interface BuildingFormProps {
  initialData?: {
    name: string;
    floorCount: number;
    propertyId: string;
  } | null;
  onSubmit: (data: { name: string; floorCount: number; propertyId: string }) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function BuildingForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting
}: BuildingFormProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(initialData?.propertyId || '');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Update selectedProperty when initialData changes
  useEffect(() => {
    if (initialData?.propertyId) {
      setSelectedProperty(initialData.propertyId);
    }
  }, [initialData]);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmit({
        name: formData.get('name') as string,
        floorCount: parseInt(formData.get('floorCount') as string),
        propertyId: formData.get('propertyId') as string
      });
    }}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Building Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Property</label>
          <select
            name="propertyId"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select a property</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Number of Floors</label>
          <input
            type="number"
            name="floorCount"
            defaultValue={initialData?.floorCount}
            min="1"
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={isSubmitting || isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
          </button>
        </div>
      </div>
    </form>
  );
}