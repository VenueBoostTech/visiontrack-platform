import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Property {
  id: string;
  name: string;
  buildings: Building[];
}

interface Building {
  id: string;
  name: string;
  zones: Zone[];
}

interface Zone {
  id: string;
  name: string;
  type: string;
  building: {
    id: string;
    property: {
      id: string;
    }
  }
}

type CameraType = 'INDOOR' | 'OUTDOOR' | 'THERMAL';
type CameraStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';

interface CameraFormData {
  name: string;
  location?: string;
  rtspUrl: string;
  type: CameraType;
  status: CameraStatus;
  direction?: string;
  coverageArea?: any;
  capabilities?: Record<string, boolean>;
  zoneId: string;
}

interface CameraFormProps {
  initialData?: CameraFormData;
  onSubmit: (data: CameraFormData) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function CameraForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting = false
}: CameraFormProps) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<string>('');
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [selectedZone, setSelectedZone] = useState<string>(initialData?.zoneId || '');
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>(
    initialData?.capabilities ? Object.keys(initialData.capabilities) : []
  );
  const [loading, setLoading] = useState(true);

  const capabilities = [
    'motion_detection',
    'facial_recognition',
    'smoke_detection',
    'object_tracking',
    'vehicle_detection'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/user/properties?include=buildings.zones');
        if (!response.ok) throw new Error('Failed to fetch properties');
        const data = await response.json();
        setProperties(data);

        // If we have initialData, set the selections
        if (initialData?.zoneId) {
          const zone = await fetch(`/api/user/zones/${initialData.zoneId}`).then(res => res.json());
          setSelectedZone(zone.id);
          setSelectedBuilding(zone.building.id);
          setSelectedProperty(zone.building.property.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load form data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Reset form when initialData changes
    if (initialData) {
      setSelectedZone(initialData.zoneId);
    }
  }, [initialData]);

  const availableBuildings = selectedProperty 
    ? properties.find(p => p.id === selectedProperty)?.buildings || []
    : [];

  const availableZones = selectedBuilding
    ? availableBuildings.find(b => b.id === selectedBuilding)?.zones || []
    : [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data: CameraFormData = {
      name: formData.get('name') as string,
      location: formData.get('location') as string || undefined,
      rtspUrl: formData.get('rtspUrl') as string,
      type: formData.get('type') as CameraType,
      status: formData.get('status') as CameraStatus,
      direction: formData.get('direction') as string || undefined,
      capabilities: selectedCapabilities.length > 0 ? selectedCapabilities.reduce((acc, curr) => ({
        ...acc,
        [curr]: true
      }), {}) : null,
      zoneId: selectedZone,
    };

    onSubmit(data);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-32">Loading...</div>;
  }

  return (
    <div className="max-h-[90vh] flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="overflow-y-auto px-4 flex-1">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Camera Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={initialData?.name}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={initialData?.location}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">RTSP URL</label>
                <input
                  type="text"
                  name="rtspUrl"
                  defaultValue={initialData?.rtspUrl}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <select
                  name="type"
                  defaultValue={initialData?.type || 'INDOOR'}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="INDOOR">Indoor</option>
                  <option value="OUTDOOR">Outdoor</option>
                  <option value="THERMAL">Thermal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  name="status"
                  defaultValue={initialData?.status || 'ACTIVE'}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="MAINTENANCE">Maintenance</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Direction</label>
                <input
                  type="text"
                  name="direction"
                  defaultValue={initialData?.direction}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  placeholder="e.g., North, South-East"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Property</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => {
                    setSelectedProperty(e.target.value);
                    setSelectedBuilding('');
                    setSelectedZone('');
                  }}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select a property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProperty && (
                <div>
                  <label className="block text-sm font-medium mb-1">Building</label>
                  <select
                    value={selectedBuilding}
                    onChange={(e) => {
                      setSelectedBuilding(e.target.value);
                      setSelectedZone('');
                    }}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                    required
                  >
                    <option value="">Select a building</option>
                    {availableBuildings.map((building) => (
                      <option key={building.id} value={building.id}>
                        {building.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedBuilding && (
                <div>
                  <label className="block text-sm font-medium mb-1">Zone</label>
                  <select
                    value={selectedZone}
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                    required
                  >
                    <option value="">Select a zone</option>
                    {availableZones.map((zone) => (
                      <option key={zone.id} value={zone.id}>
                        {zone.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1">Capabilities</label>
                <div className="space-y-1">
                  {capabilities.map((capability) => (
                    <label key={capability} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={selectedCapabilities.includes(capability)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCapabilities([...selectedCapabilities, capability]);
                          } else {
                            setSelectedCapabilities(
                              selectedCapabilities.filter(cap => cap !== capability)
                            );
                          }
                        }}
                        className="rounded border-gray-300 dark:border-gray-600"
                      />
                      {capability.split('_').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-3 border-t px-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : initialData ? 'Update Camera' : 'Add Camera'}
          </button>
        </div>
      </form>
    </div>
  );
}