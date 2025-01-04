"use client";
import { VTBusiness } from "@/lib/vt-external-api/types/business.types";
import { Pencil, Trash } from "lucide-react";
import Modal from "@/components/Common/Modal";
import { useState } from "react";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListForm, {
  BusinessListFormData,
} from "@/components/BusinessListForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";

type BusinessUpdateFormData = BusinessListFormData & { id: string };

function Badge({ value }: { value: boolean }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
        value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {value ? "Yes" : "No"}
    </span>
  );
}

export default function BusinessListTable({
  vtBusinesses,
}: {
  vtBusinesses: VTBusiness[];
}) {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<BusinessUpdateFormData>();
  const [vtBusinessList, setVtBusinessList] = useState(vtBusinesses);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSubmit = async (data: BusinessListFormData) => {
    try {
      const response = await VTSuperAdminService.updateBusiness(data.id, {
        is_active: data.is_active,
        is_local_test: data.is_local_test,
        is_prod_test: data.is_prod_test,
      });
      setVtBusinessList(
        vtBusinessList.map((b: any) => (b.id === data.id ? response : b))
      );
    } catch (error) {
      console.error("Error creating business:", error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `/api/admin/vtbusiness/delete/${initialData?.id}/${initialData?.vt_platform_id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create business");
      }

      setVtBusinessList(
        vtBusinessList.filter((b: any) => b.id !== initialData?.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting business:", error);
      throw error;
    }
  };

  return (
    <div>
      <div className="rounded-lg border bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left text-sm font-medium">
                Business Name
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">
                Created at
              </th>
              <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">
                Updated at
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
                Local Test
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
                Prod Test
              </th>
              <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
                Prod
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">
                Status
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {vtBusinessList.map((business: any) => {
              const isProd =
                !business?.is_local_test && !business?.is_prod_test;

              return (
                <tr key={business.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{business.name}</div>
                      <div className="text-sm text-gray-500">
                        {business.email}
                      </div>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {business.created_at
                        ? new Date(business.created_at).toLocaleDateString(
                            "en-US"
                          )
                        : "N/A"}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                      {business.updated_at
                        ? new Date(business.updated_at).toLocaleDateString(
                            "en-US"
                          )
                        : "N/A"}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <Badge value={business?.is_local_test} />
                  </td>
                  <td className="hidden sm:table-cell px-4 py-3">
                    <Badge value={business?.is_prod_test} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge value={isProd} />
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        business?.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {business?.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-right items-right gap-2">
                      <button
                        className="p-1 text-gray-400 hover:text-gray-600"
                        onClick={() => {
                          setInitialData(business);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-gray-400 hover:text-red-600"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setInitialData(business);
                        }}
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {vtBusinesses.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center">
                  No VT Businesses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Modal
        title="Update VT Business"
        description="Update new business"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <BusinessListForm
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
          initialData={initialData}
        />
      </Modal>
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Delete Business"
        handleDelete={handleDelete}
      />
    </div>
  );
}
