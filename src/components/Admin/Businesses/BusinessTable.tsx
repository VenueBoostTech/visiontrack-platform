"use client";

import { Business, User, BusinessType } from "@prisma/client";
import { MoreHorizontal, Users, Building2, Mail, Phone, MapPin, Check, X, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Modal from "@/components/Common/Modal";
import BusinessForm, { BusinessFormData } from "@/components/BusinessForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BusinessWithRelations extends Business {
  owner: User;
  staff: Array<{ user: User }>;
}

interface BusinessTableProps {
  businesses: BusinessWithRelations[];
  onRefresh?: () => void;
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}

const getBusinessTypeDisplay = (type: BusinessType) => {
  switch(type) {
    case 'COMMERCIAL_REAL_ESTATE':
      return 'Commercial Real Estate';
    case 'MANUFACTURING_WAREHOUSING':
      return 'Manufacturing & Warehousing';
    case 'MULTI_FAMILY_RESIDENTIAL':
      return 'Multi-Family Residential';
    case 'RETAIL':
      return 'Retail';
    default:
      return type;
  }
};

const getBusinessTypeIcon = (type: BusinessType) => {
  switch(type) {
    case 'COMMERCIAL_REAL_ESTATE':
      return <Building2 className="w-3 h-3 mr-1" />;
    case 'MANUFACTURING_WAREHOUSING':
      return <Building2 className="w-3 h-3 mr-1" />;
    case 'MULTI_FAMILY_RESIDENTIAL':
      return <Building2 className="w-3 h-3 mr-1" />;
    case 'RETAIL':
      return <Building2 className="w-3 h-3 mr-1" />;
    default:
      return <Building2 className="w-3 h-3 mr-1" />;
  }
};

export default function BusinessTable({ 
  businesses, 
  onRefresh,
  totalItems = 0,
  currentPage = 1,
  pageSize = 10,
  totalPages = 1
}: BusinessTableProps) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessWithRelations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async (data: BusinessFormData) => {
    if (!selectedBusiness) return;
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/business/${selectedBusiness.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: {
            name: data.businessName,
            email: data.businessEmail,
            phone: data.businessPhone,
            address: data.businessAddress,
            vt_use_scenario: data.businessType,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update business');
      }

      toast.success("Business updated successfully");
      setShowEditModal(false);
      onRefresh?.();
    } catch (error) {
      console.error('Error updating business:', error);
      toast.error("Failed to update business");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedBusiness) return;
    setIsLoading(true);
  
    try {
      const response = await fetch(`/api/business/${selectedBusiness.id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.details || 'Failed to delete business');
      }
  
      toast.success("Business deleted successfully");
      setShowDeleteModal(false);
      onRefresh?.();
    } catch (error) {
      console.error('Error deleting business:', error);
      // @ts-ignore
      toast.error(error.message || "Failed to delete business");
    } finally {
      setIsLoading(false);
    }
  };

  const getPageLink = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('page', page.toString());
    return `?${searchParams.toString()}`;
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
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  VT Connected
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {businesses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-10 text-center">
                    <Building2 className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No businesses found</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by creating a new business.
                    </p>
                  </td>
                </tr>
              ) : (
                businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/70 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white flex items-center">
                          {business.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                          <Mail className="w-3.5 h-3.5 mr-1 text-gray-400" /> 
                          {business.email}
                        </div>
                        {business.phone && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-0.5">
                            <Phone className="w-3.5 h-3.5 mr-1 text-gray-400" /> 
                            {business.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4">
                      <div className="flex items-center gap-2">
                        {business.owner.image ? (
                          <img 
                            src={business.owner.image} 
                            alt={business.owner.name || ''} 
                            className="w-7 h-7 rounded-full"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-sm text-primary font-medium">
                            {business.owner.name?.charAt(0).toUpperCase() || business.owner.email?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {business.owner.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {business.owner.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4">
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {getBusinessTypeIcon(business.vt_use_scenario)}
                        {getBusinessTypeDisplay(business.vt_use_scenario)}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="flex items-center gap-1">
                        <div className="p-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-md">
                          <Users className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span className="text-sm font-medium">
                          {business.staff.length}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {business.vt_connected ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                          <Check className="w-3.5 h-3.5 mr-1" />
                          Connected
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                          <X className="w-3.5 h-3.5 mr-1" />
                          Not Connected
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
                          <Link href={`/admin/businesses/${business.id}`} className="w-full">
                            <DropdownMenuItem className="cursor-pointer text-sm flex items-center">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                          
                          <DropdownMenuItem 
                            className="cursor-pointer text-sm flex items-center"
                            onClick={() => {
                              setSelectedBusiness(business);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Business
                          </DropdownMenuItem>
                          
                          <DropdownMenuSeparator />
                          
                          <DropdownMenuItem 
                            className="cursor-pointer text-sm text-red-600 dark:text-red-400 flex items-center"
                            onClick={() => {
                              setSelectedBusiness(business);
                              setShowDeleteModal(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Business
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {businesses.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 py-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{businesses.length}</span> of{" "}
            <span className="font-medium">{totalItems}</span> businesses
          </div>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href={getPageLink(Math.max(1, currentPage - 1))}
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
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        title="Edit Business"
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <BusinessForm
          initialData={{
            businessName: selectedBusiness?.name || '',
            businessEmail: selectedBusiness?.email || '',
            businessPhone: selectedBusiness?.phone || '',
            businessAddress: selectedBusiness?.address || '',
            businessType: selectedBusiness?.vt_use_scenario || 'RETAIL',
          }}
          onSubmit={handleEdit}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
          mode="edit"
        />
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText={`Delete ${selectedBusiness?.name}`}
        message={`Are you sure you want to delete ${selectedBusiness?.name}? This action cannot be undone and will remove all associated data.`}
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}