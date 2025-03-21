"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Common/Modal";
import BusinessListForm from "@/components/BusinessListForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface BusinessListFormData {
  name: string;
  vt_platform_id: string;
  is_active: boolean;
  is_local_test: boolean;
  is_prod_test: boolean;
}

export default function BusinessListModalAction({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: BusinessListFormData) => {
    try {
      try {
        const response = await fetch("/api/admin/vtbusiness/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error("Failed to create business");
        }
        toast.success("Business addded successfully!");
        onSuccess?.();
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to add business"
        );
      }
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 h-9 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Sync Business
      </button>

      <Modal
        title="Sync Business with Core VT Platform"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <BusinessListForm
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
