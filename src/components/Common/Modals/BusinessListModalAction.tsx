"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/components/Common/Modal";
import BusinessListForm from "@/components/BusinessListForm";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";

export interface BusinessListFormData {
  name: string;
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
      const response = await VTSuperAdminService.createBusiness({
        name: data.name,
        is_active: data.is_active,
        is_local_test: data.is_local_test,
        is_prod_test: data.is_prod_test,
        vt_platform_id: "",
        api_key: "",
      });

      console.log(response);

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
        title="Create New VT Business"
        description="Add a new business and assign an owner."
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
