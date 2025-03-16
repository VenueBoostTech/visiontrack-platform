"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import BusinessForm, { BusinessFormData } from "@/components/BusinessForm";
import Modal from "@/components/Common/Modal";
import { Button } from "@/components/ui/button";

interface BusinessModalActionProps {
  onSuccess?: () => void;
}

export default function BusinessModalAction({ onSuccess }: BusinessModalActionProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: BusinessFormData) => {
    try {
      setIsSubmitting(true);
      
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

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to create business');
      }
      
      toast.success("Business created successfully!");
      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      console.error("Error creating business:", error);
      toast.error(error.message || "Failed to create business");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary hover:bg-primary/90 text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        <span className="hidden sm:inline">Add Business</span>
        <span className="sm:hidden">Add</span>
      </Button>

      <Modal
        title="Create New Business"
        description="Add a new business and assign an owner to manage it."
        isOpen={open}
        onClose={() => !isSubmitting && setOpen(false)}
      >
        <BusinessForm
          onSubmit={handleSubmit}
          onClose={() => !isSubmitting && setOpen(false)}
          isSubmitting={isSubmitting}
          mode="create"
        />
      </Modal>
    </>
  );
}