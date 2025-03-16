"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import ModalCloseButton from "./ModalCloseButton";
import toast from "react-hot-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// Schema for validation
const inviteUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a user role"),
});

type InviteUserFormData = z.infer<typeof inviteUserSchema>;

interface InviteUserModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  text: string;
}

export default function InviteUserModal({ showModal, setShowModal, text }: InviteUserModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form with validation
  const form = useForm<InviteUserFormData>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      role: "",
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (showModal) {
      form.reset();
    }
  }, [showModal, form]);

  const handleSubmit = async (data: InviteUserFormData) => {
    setIsSubmitting(true);
    
    try {
      const invite = await axios.post("/api/platform/invite/send", data);
      toast.success(invite.data);
      setShowModal(false);
    } catch (error: any) {
      toast.error(error?.response?.data || "Failed to send invitation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Click outside to close
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showModal, setShowModal]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 px-4 py-7.6 dark:bg-dark/70 sm:px-8">
      <div 
        ref={modalRef}
        className="relative w-full max-w-[600px] max-h-[calc(100vh-60px)] overflow-y-auto rounded-lg border bg-white shadow-lg dark:bg-gray-900"
      >
        <ModalCloseButton closeModal={setShowModal} />
        
        <div className="p-6">
          <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
            Add New User
          </h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="john@example.com" 
                        type="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Role</FormLabel>
                    <FormControl>
                      <select
                        className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        {...field}
                      >
                        <option value="">Select a role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="BUSINESS_OWNER">Business Owner</option>
                        <option value="STAFF">Staff</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
				  className="text-white"
                >
                  {isSubmitting ? 'Sending...' : text}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}