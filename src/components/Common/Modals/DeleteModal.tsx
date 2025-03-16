"use client";

import { useEffect, useRef } from "react";
import { AlertTriangleIcon, Trash2Icon, XIcon, LoaderIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  deleteText: string;
  message?: string;
  handleDelete: () => Promise<void>;
  loading: boolean;
}

export default function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  deleteText,
  message = "Are you sure about that? This action cannot be undone.",
  handleDelete,
  loading
}: DeleteModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus on cancel button when modal opens
  useEffect(() => {
    if (showDeleteModal && cancelButtonRef.current) {
      setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
    }
  }, [showDeleteModal]);

  // Handle Escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDeleteModal) {
        setShowDeleteModal(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showDeleteModal, setShowDeleteModal]);

  return (
    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <DialogTitle className="text-xl font-bold">{deleteText}</DialogTitle>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{message}</p>
        </DialogHeader>
        
        <DialogFooter className="mt-4 flex justify-center sm:justify-center">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button
              ref={cancelButtonRef}
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setShowDeleteModal(false)}
            >
              <XIcon className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full sm:w-auto" 
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2Icon className="mr-2 h-4 w-4" />
                  Delete
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}