"use client";

import { useState, useEffect } from 'react';
import { Plus, Users, UserCheck, Crown, Search, Filter, Trash2, Edit } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '@/components/Common/Modal';
import DeleteModal from '@/components/Common/Modals/DeleteModal';
import StaffForm from '@/components/Platform/Staff/StaffForm';
import { CreateStaffData, StaffMember, UpdateStaffData } from '@/types/staff';
import { Department } from '@/types/department';

interface StaffContentProps {
  initialStaff: StaffMember[];
  businessId: string;
  departmentList: Department[];
  owner:any;
}

export default function StaffContent({ 
  initialStaff,
  businessId,
  departmentList,
  owner
}: StaffContentProps) {
  const router = useRouter();
  const { data: session } = useSession();
  
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = session?.user?.role === "BUSINESS_OWNER";

  const handleCreate = async (data: CreateStaffData) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/user/staff', data);
      setStaff(prev => [response.data, ...prev]);
      setShowCreateModal(false);
      toast.success("Staff member added successfully!");
    } catch (error: any) {
      toast.error(error.response?.data || 'Failed to add staff member');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateStaffData) => {
    if (!selectedStaff) return;
    
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/user/staff/${selectedStaff.id}`, data);
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      setStaff(prev => prev.map(s => s.id === selectedStaff.id ? response.data : s));
      setShowEditModal(false);
      toast.success("Staff member updated successfully!");
    } catch (error: any) {
      // Handle the error message properly
      const errorMessage = error.response?.data?.error || error.message || 'Failed to update staff member';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setSelectedStaff(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedStaff) return;

    setIsLoading(true);
    try {
      await axios.delete(`/api/user/staff/${selectedStaff.id}`);
      setStaff(prev => prev.filter(s => s.id !== selectedStaff.id));
      toast.success('Staff member removed successfully');
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error.response?.data || 'Failed to remove staff member');
    } finally {
      setIsLoading(false);
      setSelectedStaff(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl text-gray-700 font-bold">Staff Management</h2>
          <p className="text-gray-700 mt-1">Manage your business owner and staff members</p>
        </div>
        {isOwner && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            Add Staff
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <Crown className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Business Owner</p>
              <h3 className="text-xl font-bold">1</h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Staff Members</p>
              <h3 className="text-xl font-bold">
                {staff?.filter(s => s.user.role === "STAFF")?.length}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <UserCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Members</p>
              <h3 className="text-xl font-bold">{staff?.length + 1}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
        {/* Search and Filter */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                placeholder="Search members..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Staff Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Joined</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {/* Owner Row - Always visible */}
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap font-medium flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  {owner?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{owner?.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                    Business Owner
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  All Departments
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                  {formatDate(owner?.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* No actions for owner */}
                </td>
              </tr>

              {/* Staff Rows */}
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    <div className="flex flex-col items-center py-6">
                      <Users className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg font-medium">No staff members yet</p>
                      <p className="text-sm text-gray-500">Add staff members to get started</p>
                    </div>
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{member.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{member.user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        Staff Member
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {member.department?.name || 'No Department'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">
                      {formatDate(member.user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-right gap-2">
                        <button
                          onClick={() => {
                            setSelectedStaff(member);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          disabled={isLoading}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedStaff(member);
                            setShowDeleteModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-red-600"
                          disabled={isLoading}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Staff Member"
      >
        <StaffForm 
          businessId={businessId}
          // @ts-ignore
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
          departmentList={departmentList}
          isSubmitting={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Staff Member"
      >
        <StaffForm 
          // @ts-ignore
          initialData={selectedStaff}
          businessId={businessId}
          onSubmit={handleUpdate}
          departmentList={departmentList}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Remove Staff Member"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}