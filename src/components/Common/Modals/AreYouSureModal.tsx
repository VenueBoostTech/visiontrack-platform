"use client";

import { useEffect, useRef } from "react";

interface AreYouSureModalProps {
  showAreYouSureModal: boolean;
  setShowAreYouSureModal: (show: boolean) => void;
  areYouSureText: string;
  message?: string;
  handleAreYouSure: () => Promise<void>;
  loading: boolean;
}

export default function AreYouSureModal({
  showAreYouSureModal,
  setShowAreYouSureModal,
  areYouSureText,
  message = "Are you sure about that? This action cannot be undone.",
  handleAreYouSure,
  loading
}: AreYouSureModalProps) {
  // ===== click outside of dropdown =====
  const divRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
          setShowAreYouSureModal(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  });
  
  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAreYouSureModal(false);
      }
    };

    if (showAreYouSureModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showAreYouSureModal, setShowAreYouSureModal]);
  
  return (
    <>
      {showAreYouSureModal && (
        <div
          className="fixed left-0 top-0 z-[99999] flex h-screen w-full items-center justify-center bg-black/80 px-4 py-7.6 dark:bg-dark/70 sm:px-8"
        >
          <div
            ref={divRef}
            className="relative h-auto w-full max-w-lg scale-100 transform overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-gray-900"
          >
            {/* Header */}
            <div className="p-6">
              <div className="flex flex-col space-y-2 text-center sm:text-left">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Are you sure?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {message}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 bg-gray-50 dark:bg-gray-800 px-6 py-4">
              <button
                onClick={() => setShowAreYouSureModal(false)}
                disabled={loading}
                className="mt-3 sm:mt-0 inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              
              <button
                onClick={handleAreYouSure}
                disabled={loading}
                className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary focus:outline-none"
              >
                {loading ? "Loading..." : areYouSureText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}