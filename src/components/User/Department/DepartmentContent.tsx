"use client";

import { useState } from "react";
import {
  Plus,
  Users,
  UserCheck,
  Search,
  Filter,
  Trash2,
  Edit,
  Users2,
  Layers,
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "@/components/Common/Modal";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from "@/types/department";
import DepartmentForm from "./DepartmentForm";

interface DepartmentContentProps {
  initialDepartment: Department[];
}

export default function DepartmentContent({
  initialDepartment
}: DepartmentContentProps) {
  const { data: session } = useSession();

  const [department, setDepartment] = useState<Department[]>(initialDepartment);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectDepartment, setSelectDepartment] = useState<Department | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const isOwner = session?.user?.role === "BUSINESS_OWNER";

  const departmentName = (name: string) => {
    switch (name) {
      case "BRAND_MANAGER":
        return "Brand Manager";
      case "SALES_ASSOCIATE":
        return "Sales Associate";
      case "SECURITY":
        return "Security";
      case "SALES":
        return "Sales";
      case "MARKETING":
        return "Marketing";
      case "FINANCE":
        return "Finance";
      default:
        return name;
    }
  };

  const handleCreate = async (data: CreateDepartment) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/user/department", data);
      setDepartment((prev) => [response.data, ...prev]);
      setShowCreateModal(false);
      toast.success("Department added successfully!");
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to add Department");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (data: UpdateDepartment) => {
    if (!selectDepartment) return;

    setIsLoading(true);
    try {
      const response = await axios.put(
        `/api/user/department/${selectDepartment.id}`,
        data
      );
      setDepartment((prev) =>
        prev.map((s) => (s.id === selectDepartment.id ? response.data : s))
      );
      setShowEditModal(false);
      toast.success("Department updated successfully!");
    } catch (error: any) {
      toast.error(error.response?.data.error || "Failed to update Department");
    } finally {
      setIsLoading(false);
      setSelectDepartment(null);
    }
  };

  const handleDelete = async () => {
    if (!selectDepartment) return;

    setIsLoading(true);
    try {
      await axios.delete(`/api/user/department/${selectDepartment.id}`);
      setDepartment((prev) => prev.filter((s) => s.id !== selectDepartment.id));
      toast.success("Department removed successfully");
      setShowDeleteModal(false);
    } catch (error: any) {
      toast.error(error.response?.data || "Failed to remove Department");
    } finally {
      setIsLoading(false);
      setSelectDepartment(null);
    }
  };
  
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">Department</h2>
          <p className="text-sm text-gray-500 mt-1">
            View and manage all departments
          </p>
        </div>
        {isOwner && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
            disabled={isLoading}
          >
            <Plus className="w-4 h-4" />
            Add Department
          </button>
        )}
      </div>

     {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Total Departments */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
              <Layers className="w-6 h-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Departments</p>
              <h3 className="text-xl font-bold">{department?.length}</h3>
            </div>
          </div>
        </div>

        {/* Departments with Staff */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg dark:bg-emerald-900">
              <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Departments</p>
              <h3 className="text-xl font-bold">
                {/* @ts-ignore  */}
                {department?.filter(dept => dept.staff?.length > 0).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Total Staff in Departments */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
              <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Staff</p>
              <h3 className="text-xl font-bold">
                {/* @ts-ignore  */}
                {department?.reduce((total, dept) => total + (dept.staff?.length || 0), 0)}
              </h3>
            </div>
          </div>
        </div>

        {/* Average Staff per Department */}
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900">
              <Users2 className="w-6 h-6 text-amber-600 dark:text-amber-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg Staff per Dept</p>
              <h3 className="text-xl font-bold">
                {department?.length > 0
                  // @ts-ignore 
                  ? Math.round(department?.reduce((total, dept) => total + (dept.staff?.length || 0), 0) / department?.length)
                  : 0}
              </h3>
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
                placeholder="Search departments..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                  Business Name
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                    </div>
                  </td>
                </tr>
              ) : department?.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center py-6">
                      <Users className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg font-medium">No departments yet</p>
                      <p className="text-sm text-gray-500">
                        Add a department to get started
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                department?.map((department: any) => (
                  <tr
                    key={department.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {departmentName(department?.name)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {department?.business?.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-right gap-2">
                        <button
                          onClick={() => {
                            setSelectDepartment(department);
                            setShowEditModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          disabled={isLoading}
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectDepartment(department);
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
        title="Add New Department"
      >
        <DepartmentForm
          // @ts-ignore
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Department"
      >
        <DepartmentForm
          // @ts-ignore
          initialData={selectDepartment}
          onSubmit={handleUpdate}
          onClose={() => setShowEditModal(false)}
          isSubmitting={isLoading}
        />
      </Modal>

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText="Remove Department"
        handleDelete={handleDelete}
        loading={isLoading}
      />
    </div>
  );
}
