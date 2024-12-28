// components/User/Zones/ZoneForm.tsx
"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Property {
  id: string;
  name: string;
  buildings: Building[];
}

interface Building {
  id: string;
  name: string;
  property: {
    id: string;
    name: string;
  };
}

interface Store {
  id: string;
  name: string;
}

interface ZoneFormProps {
  initialData?: any;
  onSubmit: (data: ZoneFormData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

interface ZoneFormData {
  name: string;
  type: string;
  floor?: number | null;
  buildingId: string;
  propertyId: string;
  storeId?: string;
}

export default function ZoneForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: ZoneFormProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "",
    floor: initialData?.floor || "",
    propertyId: initialData?.building?.property?.id || "",
    buildingId: initialData?.buildingId || "",
    storeId: initialData?.storeId || ""
  });

  const selectedProperty = properties.find((p) => p.id === formData.propertyId);
  const availableBuildings = selectedProperty?.buildings || [];

  // Fetch properties with buildings
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/user/properties?include=buildings");
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error("Failed to load properties");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/user/stores");
        if (!response.ok) throw new Error("Failed to fetch stores");
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
        toast.error("Failed to load stores");
      }
    };

    fetchStores();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData: ZoneFormData = {
      name: formData.name,
      type: formData.type,
      floor: formData.floor ? parseInt(formData.floor.toString()) : null,
      buildingId: formData.buildingId,
      propertyId: formData.propertyId,
      ...(formData.type === "RETAIL" && formData.storeId ? { storeId: formData.storeId } : {})
    };

    onSubmit(submitData);
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Zone Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
        >
          <option value="">Select type</option>
          <option value="ENTRANCE">Entrance</option>
          <option value="LOBBY">Lobby</option>
          <option value="PARKING">Parking</option>
          <option value="COMMON_AREA">Common Area</option>
          <option value="GARAGE">Garage</option>
          <option value="RETAIL">Retail</option>
          <option value="SERVICE">Service</option>
          <option value="OUTDOOR">Outdoor</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Property</label>
        <select
          value={formData.propertyId}
          onChange={(e) => setFormData({ 
            ...formData, 
            propertyId: e.target.value,
            buildingId: "" // Reset building when property changes
          })}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          required
        >
          <option value="">Select property</option>
          {properties.map((property) => (
            <option key={property.id} value={property.id}>
              {property.name}
            </option>
          ))}
        </select>
      </div>

      {formData.propertyId && (
        <div>
          <label className="block text-sm font-medium mb-1">Building</label>
          <select
            value={formData.buildingId}
            onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select building</option>
            {availableBuildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {formData.type === "RETAIL" && (
        <div>
          <label className="block text-sm font-medium mb-1">Store</label>
          <select
            value={formData.storeId}
            onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          >
            <option value="">Select store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Floor</label>
        <input
          type="number"
          value={formData.floor}
          onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
          placeholder="Optional"
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
            ? "Update Zone"
            : "Create Zone"}
        </button>
      </div>
    </form>
  );
}