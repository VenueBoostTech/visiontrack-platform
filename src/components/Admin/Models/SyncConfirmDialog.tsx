// components/AI/SyncConfirmDialog.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Cpu, RefreshCcw } from "lucide-react";
import Modal from "@/components/Common/Modal";

interface SyncConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isSyncing: boolean;
}

export function SyncConfirmDialog({ open, onClose, onConfirm, isSyncing }: SyncConfirmDialogProps) {
  return (
    <Modal
      title="Sync AI Models with VisionTrack/OmniStack Gateway"
      description="This will synchronize all ReadyGo AI models from the NextJS platform to your VisionTrack/OmniStack Gateway backend. New models will be added and existing ones will be updated."
      isOpen={open}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 flex items-start gap-3">
          <Cpu className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Sync will:</p>
            <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
              <li>Sync all ReadyGo AI models to VisionTrack/OmniStack Gateway</li>
              <li>Update existing models if they've changed</li>
              <li>Maintain proper references between platforms</li>
              <li>Enable AI model deployment on your cameras</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSyncing}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isSyncing}
            className="bg-primary text-white"
          >
            {isSyncing ? (
              <>
                <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <Cpu className="mr-2 h-4 w-4" />
                Sync Models
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}