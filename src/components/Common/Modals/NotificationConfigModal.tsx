import React, { useState, useEffect } from 'react';
import Modal from '@/components/Common/Modal';
import { Trash2 } from 'lucide-react';
import { NotificationChannel } from '@/types/notificationChannel';
import toast from 'react-hot-toast';

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
  const [config, setConfig] = useState<{ emails?: string[], phone_numbers?: string[] }>(
    channel.config || { emails: [], phone_numbers: [] }
  );
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setConfig(channel.config || { emails: [], phone_numbers: [] });
    setNewEmail("");
    setNewPhone("");
  }, [channel]);

  const handleSave = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/business/notification-channels', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: channel.id,
          config: {
            emails: config.emails || [],
            phone_numbers: config.phone_numbers || []
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update configuration');
      }

      const updatedChannel = await response.json();
      onSave(updatedChannel);
      toast.success('Configuration updated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to save configuration');
      console.error('Save error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addItem = (type: 'email' | 'phone', value: string) => {
    if (!value.trim()) return;

    if (type === 'email' && !value.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setConfig(prev => {
      const key = type === 'email' ? 'emails' : 'phone_numbers';
      const currentArray = prev[key] || [];
      
      // Check for duplicates
      if (currentArray.includes(value)) {
        toast.error(`This ${type} is already added`);
        return prev;
      }

      return {
        ...prev,
        [key]: [...currentArray, value]
      };
    });

    // Clear input
    if (type === 'email') {
      setNewEmail('');
    } else {
      setNewPhone('');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Configure ${channel.name}`}>
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-1">
        <div className="space-y-4">
          {channel.type === "email" ? (
            <div>
              <label className="block text-sm font-medium mb-2">Email Addresses</label>
              <div className="space-y-2">
                {config.emails?.map((email, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{email}</span>
                    <button
                      type="button"
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        emails: prev.emails?.filter((_, i) => i !== index)
                      }))}
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
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('email', newEmail);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-primary text-white rounded-lg"
                    onClick={() => addItem('email', newEmail)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ) : channel.type === "sms" ? (
            <div>
              <label className="block text-sm font-medium mb-2">Phone Numbers</label>
              <div className="space-y-2">
                {config.phone_numbers?.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="flex-1 px-3 py-2 bg-gray-50 rounded-lg">{phone}</span>
                    <button
                      type="button"
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                      onClick={() => setConfig(prev => ({
                        ...prev,
                        phone_numbers: prev.phone_numbers?.filter((_, i) => i !== index)
                      }))}
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
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('phone', newPhone);
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="px-3 py-2 bg-primary text-white rounded-lg"
                    onClick={() => addItem('phone', newPhone)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 text-sm border rounded-lg"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg"
              onClick={handleSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationConfigModal;