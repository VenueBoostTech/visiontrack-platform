// components/User/Zones/ZoneForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
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

interface ZoneFormProps {
  initialData?: any;
  onSubmit: (data: ZoneFormData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

interface ZoneFormData {
  name: string;
  type: string;
  floor?: number;
  buildingId: string;
  propertyId: string;
  store: string;
}

export default function ZoneForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
}: ZoneFormProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    initialData?.building?.property?.id || ""
  );
  const [selectedBuildingId, setSelectedBuildingId] = useState<string>(
    initialData?.buildingId || ""
  );
  const [isLoading, setIsLoading] = useState(true);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);
  const availableBuildings = selectedProperty?.buildings || [];
  const [stores, setStores] = useState([]);
  const [type, setType] = useState(initialData?.type || "");

  const fetchProperties = async () => {
    try {
      const response = await fetch("/api/properties?include=buildings");
      if (!response.ok) throw new Error("Failed to fetch properties");
      const data = await response.json();
      setProperties(data);

      // If we have initialData, set the selections
      if (initialData?.building) {
        setSelectedPropertyId(initialData.building.property.id);
        setSelectedBuildingId(initialData.building.id);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties().then(() => {});
  }, []);

  const getStoreList = useCallback(async () => {
    try {
      const response = await fetch("/api/user/stores");
      if (!response.ok) throw new Error("Failed to fetch stores");
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  }, []);

  useEffect(() => {
    getStoreList().then(() => {});
  }, []);

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
          type: formData.get("type") as string,
          floor: formData.get("floor")
            ? parseInt(formData.get("floor") as string)
            : undefined,
          buildingId: selectedBuildingId,
          propertyId: selectedPropertyId,
          store: formData.get("store") as string,
        });
      }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Zone Name</label>
          <input
            type="text"
            name="name"
            defaultValue={initialData?.name}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
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
            value={selectedPropertyId}
            onChange={(e) => {
              setSelectedPropertyId(e.target.value);
              setSelectedBuildingId("");
            }}
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

        {type === "RETAIL" && (
          <div>
            <label className="block text-sm font-medium mb-1">Store</label>
            <select
              value={initialData?.store}
              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              required
            >
              <option value="">Select store</option>
              {stores.map((store: any) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedPropertyId && (
          <div>
            <label className="block text-sm font-medium mb-1">Building</label>
            <select
              name="buildingId"
              value={selectedBuildingId}
              onChange={(e) => setSelectedBuildingId(e.target.value)}
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

        <div>
          <label className="block text-sm font-medium mb-1">Floor</label>
          <input
            type="number"
            name="floor"
            defaultValue={initialData?.floor}
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
      </div>
    </form>
  );
}
