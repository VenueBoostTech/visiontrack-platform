"use client";
import { VTBusiness } from "@/lib/vt-external-api/types/business.types";
import { Pencil, Trash } from "lucide-react";
import Modal from "@/components/Common/Modal";
import { useState } from "react";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListForm, { BusinessListFormData } from "@/components/BusinessListForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";

type BusinessUpdateFormData = BusinessListFormData & { id: string };

function Badge({ value }: { value: boolean }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
      value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
    }`}>
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
      setVtBusinessList(vtBusinessList.map((b: any) => (b.id === data.id ? response : b)));
    } catch (error) {
      console.error("Error update business:", error);
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
        throw new Error("Failed to delete business");
      }

      setVtBusinessList(vtBusinessList.filter((b: any) => b.id !== initialData?.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting business:", error);
      throw error;
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Business Name
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Created at
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Updated at
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Local Test
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Prod Test
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Prod
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                {vtBusinessList.map((business: any) => {
                  const isProd = !business?.is_local_test && !business?.is_prod_test;
                  return (
                    <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{business.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{business.email}</div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                          {business.created_at ? new Date(business.created_at).toLocaleDateString("en-US") : "N/A"}
                        </span>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700">
                          {business.updated_at ? new Date(business.updated_at).toLocaleDateString("en-US") : "N/A"}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                        <Badge value={business?.is_local_test} />
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                        <Badge value={business?.is_prod_test} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge value={isProd} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          business?.is_active
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}>
                          {business?.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            onClick={() => {
                              setInitialData(business);
                              setOpen(true);
                            }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
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
                {vtBusinessList.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      No VT Businesses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        title="Update synced business data on Core VT Platform"
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