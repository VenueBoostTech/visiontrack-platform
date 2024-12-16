import Modal from "@/components/Common/Modal";
export default function POSSettingsModal({ isOpen, onClose, onSave, isSubmitting }: {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    isSubmitting: boolean;
  }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      
      const data = {
        syncInterval: formData.get('syncInterval'),
        autoSync: formData.get('autoSync') === 'true',
        backupFrequency: formData.get('backupFrequency'),
        alertThreshold: formData.get('alertThreshold'),
        retryAttempts: formData.get('retryAttempts'),
        timeoutDuration: formData.get('timeoutDuration'),
      };
  
      onSave(data);
    };
  
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="POS System Settings"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Sync Interval</label>
                <select
                  name="syncInterval"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  defaultValue="15"
                >
                  <option value="5">Every 5 minutes</option>
                  <option value="15">Every 15 minutes</option>
                  <option value="30">Every 30 minutes</option>
                  <option value="60">Every hour</option>
                </select>
              </div>
  
              <div>
                <label className="block text-sm font-medium mb-1">Auto Sync</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="autoSync"
                      value="true"
                      defaultChecked
                      className="rounded-full"
                    />
                    <span>Enabled</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="autoSync"
                      value="false"
                      className="rounded-full"
                    />
                    <span>Disabled</span>
                  </label>
                </div>
              </div>
  
              <div>
                <label className="block text-sm font-medium mb-1">Backup Frequency</label>
                <select
                  name="backupFrequency"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                  defaultValue="daily"
                >
                  <option value="hourly">Every Hour</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>
  
            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Alert Threshold (%)</label>
                <input
                  type="number"
                  name="alertThreshold"
                  defaultValue="95"
                  min="0"
                  max="100"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium mb-1">Retry Attempts</label>
                <input
                  type="number"
                  name="retryAttempts"
                  defaultValue="3"
                  min="1"
                  max="10"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium mb-1">Timeout Duration (s)</label>
                <input
                  type="number"
                  name="timeoutDuration"
                  defaultValue="30"
                  min="5"
                  max="120"
                  className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                />
              </div>
            </div>
          </div>
  
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
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
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </Modal>
    );
  }