import { AlertCircle, Database, RefreshCcw } from "lucide-react";

import Modal from "@/components/Common/Modal";

export default function ConfirmSyncModal({ isOpen, onClose, onConfirm, isLoading }: {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
  }) {
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm POS Sync"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to synchronize all POS terminals? This will:
          </p>
          
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <RefreshCcw className="w-4 h-4 mt-0.5 text-gray-500" />
              <span>Update all transaction data across terminals</span>
            </li>
            <li className="flex items-start gap-2">
              <Database className="w-4 h-4 mt-0.5 text-gray-500" />
              <span>Sync inventory and pricing information</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 text-gray-500" />
              <span>This process may take a few minutes</span>
            </li>
          </ul>
  
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCcw className="w-4 h-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                'Confirm Sync'
              )}
            </button>
          </div>
        </div>
      </Modal>
    );
  }