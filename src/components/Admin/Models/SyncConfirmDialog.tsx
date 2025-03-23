// components/AI/SyncConfirmDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Cpu, RefreshCcw } from "lucide-react";

interface SyncConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isSyncing: boolean;
}

export function SyncConfirmDialog({ open, onClose, onConfirm, isSyncing }: SyncConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sync AI Models with VisionTrack</DialogTitle>
          <DialogDescription>
            This will synchronize all ReadyGo AI models from the NextJS platform to your VisionTrack backend.
            New models will be added and existing ones will be updated.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-800 flex items-start gap-3">
            <Cpu className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Sync will:</p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Import all ReadyGo AI models to VisionTrack</li>
                <li>Update existing models if they've changed</li>
                <li>Maintain proper references between platforms</li>
                <li>Enable AI model deployment on your cameras</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose}
            disabled={isSyncing}
          >
            Cancel
          </Button>
          <Button 
            type="button"
            onClick={onConfirm}
            disabled={isSyncing}
            className="bg-primary"
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}