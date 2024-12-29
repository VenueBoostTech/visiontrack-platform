import React, { useState, useEffect } from 'react';
import Modal from '@/components/Common/Modal';
import { Trash2 } from 'lucide-react';
import { NotificationChannel } from '@/types/notificationChannel';

interface NotificationConfigModalProps {
  channel: NotificationChannel;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedChannel: NotificationChannel) => void;
}

const NotificationConfigModal: React.FC<NotificationConfigModalProps> = ({ 
  channel, 
  isOpen, 
  onClose, 
  onSave 
}) => {
  const [config, setConfig] = useState(channel.config || { emails: [], phone_numbers: [] });
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");

  useEffect(() => {
    // Initialize config with empty arrays if they don't exist
    if (!config.emails) setConfig((prev) => ({ ...prev, emails: [] }));
    if (!config.phone_numbers) setConfig((prev) => ({ ...prev, phone_numbers: [] }));
  }, [config]);

  const handleSave = () => {
    onSave({ ...channel, config });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Configure ${channel.name}`}>
      <div className="space-y-4">
        {/* Email Configuration */}
        {channel.type === "email" && (
          <div>
            <label className="block text-sm font-medium mb-2">Email Addresses</label>
            <div className="space-y-2">
              {config.emails?.map((email, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{email}</span>
                  <button
                    type="button"
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    onClick={() => setConfig({
                      ...config,
                      emails: config.emails?.filter((_, i) => i !== index)
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="email"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Add email address"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-primary text-white rounded-lg"
                  onClick={() => {
                    if (newEmail) {
                      setConfig({
                        ...config,
                        emails: [...(config.emails || []), newEmail]
                      });
                      setNewEmail("");
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SMS Configuration */}
        {channel.type === "sms" && (
          <div>
            <label className="block text-sm font-medium mb-2">Phone Numbers</label>
            <div className="space-y-2">
              {config.phone_numbers?.map((phone, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{phone}</span>
                  <button
                    type="button"
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                    onClick={() => setConfig({
                      ...config,
                      phone_numbers: config.phone_numbers?.filter((_, i) => i !== index)
                    })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="tel"
                  className="flex-1 px-3 py-2 border rounded-lg"
                  placeholder="Add phone number"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-primary text-white rounded-lg"
                  onClick={() => {
                    if (newPhone) {
                      setConfig({
                        ...config,
                        phone_numbers: [...(config.phone_numbers || []), newPhone]
                      });
                      setNewPhone("");
                    }
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
          <button
            type="button"
            className="px-4 py-2 text-sm border rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm bg-primary text-white rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationConfigModal;
