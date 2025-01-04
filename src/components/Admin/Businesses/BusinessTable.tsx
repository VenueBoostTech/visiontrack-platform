"use client";

import { Business, User, BusinessType } from "@prisma/client";
import { MoreHorizontal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Modal from "@/components/Common/Modal";
import BusinessForm, { BusinessFormData } from "@/components/BusinessForm";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import { toast } from "react-hot-toast";

interface BusinessWithRelations extends Business {
  owner: User;
  staff: Array<{ user: User }>;
}

interface BusinessTableProps {
  businesses: BusinessWithRelations[];
  onRefresh?: () => void;
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

export default function BusinessTable({ businesses, onRefresh }: BusinessTableProps) {


  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
        throw new Error('Failed to delete business');
      }

      toast.success("Business deleted successfully");
      setShowDeleteModal(false);
      onRefresh?.();
    } catch (error) {
      console.error('Error deleting business:', error);
      toast.error("Failed to delete business");
    } finally {
      setIsLoading(false);
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
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Owner
                  </th>
                  <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Type
                  </th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Staff
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                    Vt Connected
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {businesses.map((business) => (
                  <tr key={business.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {business.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {business.email}
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {business.owner.image ? (
                          <img 
                            src={business.owner.image} 
                            alt={business.owner.name || ''} 
                            className="w-6 h-6 rounded-full"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm">
                            {business.owner.name?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-sm text-gray-900 dark:text-gray-100">
                          {business.owner.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {getBusinessTypeDisplay(business.vt_use_scenario)}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-900 dark:text-gray-100">
                          {business.staff.length}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        business.vt_connected 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                          : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                      }`}>
                        {business.vt_connected ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent 
                          align="end" 
                          className="w-[160px] bg-white dark:bg-gray-800 z-50" // Added z-50
                        >
                        <DropdownMenuItem 
                          className="cursor-pointer text-sm"
                          onClick={() => {
                            setSelectedBusiness(business);
                            setShowEditModal(true);
                          }}
                        >
                          Edit Business
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-sm text-red-600 dark:text-red-400"
                          onClick={() => {
                            setSelectedBusiness(business);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete Business
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
        deleteText="Delete business?"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}