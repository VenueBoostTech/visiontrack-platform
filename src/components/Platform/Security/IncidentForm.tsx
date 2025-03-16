import { useState } from 'react';

interface IncidentFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function IncidentForm({ onSubmit, onClose, isSubmitting = false }: IncidentFormProps) {
  const [details, setDetails] = useState('');

  const incidentTypes = [
    { id: 'theft', label: 'Theft', description: 'Shoplifting or property theft' },
    { id: 'security', label: 'Security', description: 'Security breaches or threats' },
    { id: 'disturbance', label: 'Disturbance', description: 'Customer or staff disturbances' },
    { id: 'safety', label: 'Safety', description: 'Health and safety incidents' },
    { id: 'damage', label: 'Property Damage', description: 'Damage to store property' }
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      title: formData.get('title'),
      type: formData.get('type'),
      location: formData.get('location'),
      priority: formData.get('priority'),
      reportedBy: formData.get('reportedBy'),
      details: details,
      timestamp: new Date().toISOString(),
      status: 'Active'
    };

    onSubmit(data);
  };

  return (
    <div className="max-h-[90vh] flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col h-full">
        <div className="overflow-y-auto px-4 flex-1">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {/* Left Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Incident Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                  placeholder="Brief description of the incident"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Incident Type</label>
                <div className="space-y-2">
                  {incidentTypes.map((type) => (
                    <label key={type.id} className="flex items-start space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="type"
                        value={type.id}
                        className="mt-1"
                        required
                      />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  name="location"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select location</option>
                  <option value="entrance">Main Entrance</option>
                  <option value="electronics">Electronics Department</option>
                  <option value="apparel">Apparel Section</option>
                  <option value="checkout">Checkout Area</option>
                  <option value="parking">Parking Lot</option>
                  <option value="storage">Storage Area</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Priority Level</label>
                <select
                  name="priority"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select priority</option>
                  <option value="Low">Low - No immediate action required</option>
                  <option value="Medium">Medium - Requires attention</option>
                  <option value="High">High - Immediate action needed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Reported By</label>
                <input
                  type="text"
                  name="reportedBy"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                  placeholder="Name of the reporter"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Incident Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  name="details"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700 h-24"
                  required
                  placeholder="Provide detailed description of the incident..."
                />
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
            {isSubmitting ? 'Creating...' : 'Create Incident'}
          </button>
        </div>
      </form>
    </div>
  );
}