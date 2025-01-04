"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import BusinessForm, { BusinessFormData } from "@/components/BusinessForm";
import Modal from "@/components/Common/Modal";

export default function BusinessModalAction({ onSuccess }: { onSuccess?: () => void }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (data: BusinessFormData) => {
    try {
      const response = await fetch("/api/business", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: {
            name: data.businessName,
            email: data.businessEmail,
            phone: data.businessPhone,
            address: data.businessAddress,
            vt_use_scenario: data.businessType,
          },
          owner: {
            name: data.ownerName,
            email: data.ownerEmail,
            password: data.ownerPassword,
            role: "BUSINESS_OWNER",
          },
        }),
      });

      onSuccess?.();
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Business
      </button>

      <Modal
        title="Create New Business"
        description="Add a new business and assign an owner."
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <BusinessForm
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}