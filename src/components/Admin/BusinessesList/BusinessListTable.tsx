"use client";
import { VTBusiness } from "@/lib/vt-external-api/types/business.types";
import { MoreHorizontal, Building2, Mail, Calendar, Check, X, Edit, Trash2, Laptop, Server } from "lucide-react";
import Modal from "@/components/Common/Modal";
import { useState } from "react";
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListForm, { BusinessListFormData } from "@/components/BusinessListForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-hot-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type BusinessUpdateFormData = BusinessListFormData & { id: string };

export default function BusinessListTable({
  vtBusinesses,
}: {
  vtBusinesses: VTBusiness[];
}) {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<BusinessUpdateFormData>();
  const [vtBusinessList, setVtBusinessList] = useState(vtBusinesses);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate pagination
  const totalItems = vtBusinessList.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const currentItems = vtBusinessList.slice(startIndex, endIndex);

  const handleSubmit = async (data: BusinessListFormData) => {
    try {
      const response = await VTSuperAdminService.updateBusiness(data.id, {
        is_active: data.is_active,
        is_local_test: data.is_local_test,
        is_prod_test: data.is_prod_test,
      });
      
      const updatedList = vtBusinessList.map((b: any) => (b.id === data.id ? response : b));
      setVtBusinessList(updatedList);
      toast.success("Business updated successfully");
      setOpen(false);
    } catch (error) {
      console.error("Error updating business:", error);
      toast.error("Failed to update business");
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
      toast.success("Business deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting business:", error);
      toast.error("Failed to delete business");
      throw error;
    }
  };

  const getPageLink = (page: number) => {
    return `?page=${page}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Business Name
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created At
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Local Test
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prod Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Production
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No VT businesses found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by syncing a business with VisionTrack.
                    </p>
                  </td>
                </tr>
              ) : (
                currentItems.map((business: any) => {
                  const isProd = !business?.is_local_test && !business?.is_prod_test;
                  return (
                    <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white flex items-center">
                            {business.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                            <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" /> 
                            {business.email ?? 'No Email'}
                          </div>
                        </div>
                      </td>
                      <td className="hidden lg:table-cell px-6 py-4">
                        <div className="flex items-center">
                          <div className="p-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-md mr-2">
                            <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-sm text-gray-900 dark:text-white">
                            {business.created_at ? new Date(business.created_at).toLocaleDateString("en-US") : "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        {business?.is_local_test ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
                            <X className="w-3.5 h-3.5 mr-1" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        {business?.is_prod_test ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
                            <X className="w-3.5 h-3.5 mr-1" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isProd ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
                            <X className="w-3.5 h-3.5 mr-1" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {business?.is_active ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                            <X className="w-3.5 h-3.5 mr-1" />
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Open menu">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent 
                            align="end" 
                            className="w-56 bg-white dark:bg-gray-800 z-50"
                          >
                            <DropdownMenuItem 
                              className="cursor-pointer text-sm flex items-center"
                              onClick={() => {
                                setInitialData(business);
                                setOpen(true);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Business
                            </DropdownMenuItem>
                            
                            <DropdownMenuSeparator />
                            
                            <DropdownMenuItem 
                              className="cursor-pointer text-sm text-red-600 dark:text-red-400 flex items-center"
                              onClick={() => {
                                setShowDeleteModal(true);
                                setInitialData(business);
                              }}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Business
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {vtBusinessList.length > pageSize && (
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{Math.min(pageSize, endIndex - startIndex)}</span> of{" "}
            <span className="font-medium">{totalItems}</span> businesses
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={getPageLink(Math.max(1, currentPage - 1))}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = i + 1;
                
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    // Near the start
                    if (i < 4) {
                      pageNum = i + 1;
                    } else {
                      pageNum = totalPages;
                    }
                  } else if (currentPage >= totalPages - 2) {
                    // Near the end
                    if (i === 0) {
                      pageNum = 1;
                    } else {
                      pageNum = totalPages - 4 + i;
                    }
                  } else {
                    // In the middle
                    if (i === 0) {
                      pageNum = 1;
                    } else if (i === 4) {
                      pageNum = totalPages;
                    } else {
                      pageNum = currentPage - 1 + i;
                    }
                  }
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      href={getPageLink(pageNum)}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext 
                  href={getPageLink(Math.min(totalPages, currentPage + 1))}
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Update Business on VisionTrack Platform"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <BusinessListForm
          onSubmit={handleSubmit}
          onClose={() => setOpen(false)}
          initialData={initialData}
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText={`Delete ${initialData?.name}`}
        message={`Are you sure you want to delete ${initialData?.name}? This action cannot be undone and will remove the business from the VisionTrack platform.`}
        handleDelete={handleDelete}
        loading={false}
      />
    </div>
  );
}