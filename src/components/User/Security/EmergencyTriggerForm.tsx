// components/Security/EmergencyTriggerForm.tsx
import { useState } from 'react';

interface EmergencyTriggerFormProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
  isSubmitting?: boolean;
}

export default function EmergencyTriggerForm({ onSubmit, onClose, isSubmitting = false }: EmergencyTriggerFormProps) {
  const [selectedType, setSelectedType] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState('');
  const [details, setDetails] = useState('');

  const emergencyTypes = [
    { id: 'medical', label: 'Medical Emergency', description: 'Health-related incidents requiring immediate attention' },
    { id: 'security', label: 'Security Threat', description: 'Immediate security concerns or threats' },
    { id: 'fire', label: 'Fire/Hazard', description: 'Fire or environmental hazards' },
    { id: 'suspicious', label: 'Suspicious Activity', description: 'Suspicious behavior or packages' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      type: selectedType,
      location,
      severity,
      details,
      timestamp: new Date().toISOString()
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
                <label className="block text-sm font-medium mb-1">Emergency Type</label>
                <div className="space-y-2">
                  {emergencyTypes.map((type) => (
                    <label key={type.id} className="flex items-start space-x-2 p-2 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                      <input
                        type="radio"
                        name="emergencyType"
                        value={type.id}
                        checked={selectedType === type.id}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="mt-1"
                      />
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Emergency Details</label>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Provide detailed information about the emergency..."
                  className="w-full px-3 py-1.5 rounded-md border h-24 dark:bg-gray-800 dark:border-gray-700"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select location</option>
                  <option value="entrance">Main Entrance</option>
                  <option value="foodcourt">Food Court</option>
                  <option value="parking">Parking Area</option>
                  <option value="electronics">Electronics Section</option>
                  <option value="apparel">Apparel Section</option>
                  <option value="checkout">Checkout Area</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Severity Level</label>
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  required
                >
                  <option value="">Select severity</option>
                  <option value="low">Low - Requires Attention</option>
                  <option value="medium">Medium - Urgent Response Needed</option>
                  <option value="high">High - Immediate Action Required</option>
                  <option value="critical">Critical - Life-Threatening</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Response Team</label>
                <select
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  defaultValue=""
                >
                  <option value="">Auto-assign based on type</option>
                  <option value="security">Security Team</option>
                  <option value="medical">Medical Team</option>
                  <option value="fire">Fire Response Team</option>
                </select>
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
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
            disabled={isSubmitting || !selectedType || !location || !severity}
          >
            {isSubmitting ? "Triggering Alert..." : "Trigger Emergency Alert"}
          </button>
        </div>
      </form>
    </div>
  );
}