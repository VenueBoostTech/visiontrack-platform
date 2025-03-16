"use client";

import { useState, useEffect, useRef } from "react";
import { BusinessType } from "@prisma/client";
import { Eye, EyeOff, Check, X, Info } from "lucide-react";

export interface BusinessFormData {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  businessType: BusinessType;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
}

interface BusinessFormProps {
  initialData?: Partial<BusinessFormData>;
  onSubmit: (data: BusinessFormData) => Promise<void>;
  onClose: () => void;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
}

// Form validation
interface ValidationErrors {
  businessName?: string;
  businessEmail?: string;
  businessPhone?: string;
  businessAddress?: string;
  ownerName?: string;
  ownerEmail?: string;
  ownerPassword?: string;
}

export default function BusinessForm({
  initialData,
  onSubmit,
  onClose,
  isSubmitting,
  mode = 'create'
}: BusinessFormProps) {
  const [formData, setFormData] = useState<BusinessFormData>({
    businessName: initialData?.businessName || '',
    businessEmail: initialData?.businessEmail || '',
    businessPhone: initialData?.businessPhone || '',
    businessAddress: initialData?.businessAddress || '',
    businessType: initialData?.businessType || 'RETAIL',
    ownerName: initialData?.ownerName || '',
    ownerEmail: initialData?.ownerEmail || '',
    ownerPassword: initialData?.ownerPassword || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  // Ref for first input field
  const firstInputRef = useRef<HTMLInputElement>(null);
  
  // Focus first input when form opens
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);
  
  // Validate password strength
  useEffect(() => {
    if (!formData.ownerPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    // Length check
    if (formData.ownerPassword.length >= 8) strength += 1;
    
    // Contains number
    if (/\d/.test(formData.ownerPassword)) strength += 1;
    
    // Contains uppercase
    if (/[A-Z]/.test(formData.ownerPassword)) strength += 1;
    
    // Contains lowercase
    if (/[a-z]/.test(formData.ownerPassword)) strength += 1;
    
    // Contains special character
    if (/[^A-Za-z0-9]/.test(formData.ownerPassword)) strength += 1;
    
    setPasswordStrength(strength);
  }, [formData.ownerPassword]);
  
  const validateField = (name: keyof BusinessFormData, value: string) => {
    let error = '';
    
    switch (name) {
      case 'businessName':
        if (!value) error = 'Business name is required';
        else if (value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'businessEmail':
        if (!value) error = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email';
        break;
      case 'businessPhone':
        if (!value) error = 'Phone number is required';
        else if (!/^[+\d\s()-]{7,20}$/.test(value)) error = 'Please enter a valid phone number';
        break;
      case 'businessAddress':
        if (!value) error = 'Address is required';
        else if (value.length < 5) error = 'Please enter a complete address';
        break;
      case 'ownerName':
        if (mode === 'create' && !value) error = 'Owner name is required';
        else if (value && value.length < 2) error = 'Name must be at least 2 characters';
        break;
      case 'ownerEmail':
        if (mode === 'create' && !value) error = 'Owner email is required';
        else if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Please enter a valid email';
        break;
      case 'ownerPassword':
        if (mode === 'create' && !value) error = 'Password is required';
        else if (value && value.length < 8) error = 'Password must be at least 8 characters';
        else if (value && passwordStrength < 3) error = 'Password is too weak';
        break;
    }
    
    return error;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Validate field if it has been touched
    if (touched[name]) {
      setErrors({
        ...errors,
        [name]: validateField(name as keyof BusinessFormData, value)
      });
    }
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      [name]: validateField(name as keyof BusinessFormData, value)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const formErrors: ValidationErrors = {};
    let hasErrors = false;
    
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const error = validateField(key as keyof BusinessFormData, value);
        if (error) {
          formErrors[key as keyof ValidationErrors] = error;
          hasErrors = true;
        }
      }
    });
    
    // Don't proceed if there are errors
    if (hasErrors) {
      setErrors(formErrors);
      setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
      return;
    }
    
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  // Helper for password strength indicator
  const getPasswordStrengthText = () => {
    if (!formData.ownerPassword) return '';
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };
  
  const getPasswordStrengthColor = () => {
    if (!formData.ownerPassword) return 'bg-gray-200';
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Business Name */}
        <div className="col-span-1">
          <label htmlFor="businessName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Business Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              ref={firstInputRef}
              id="businessName"
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.businessName && touched.businessName 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
              required
            />
            {errors.businessName && touched.businessName && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                <Info size={16} />
              </div>
            )}
          </div>
          {errors.businessName && touched.businessName && (
            <p className="mt-1 text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>

        {/* Business Email */}
        <div className="col-span-1">
          <label htmlFor="businessEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Business Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="businessEmail"
              name="businessEmail"
              type="email"
              value={formData.businessEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.businessEmail && touched.businessEmail 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
              required
            />
            {errors.businessEmail && touched.businessEmail && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                <Info size={16} />
              </div>
            )}
          </div>
          {errors.businessEmail && touched.businessEmail && (
            <p className="mt-1 text-sm text-red-500">{errors.businessEmail}</p>
          )}
        </div>

        {/* Business Phone */}
        <div className="col-span-1">
          <label htmlFor="businessPhone" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Business Phone <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              id="businessPhone"
              name="businessPhone"
              type="tel"
              value={formData.businessPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2.5 rounded-lg border ${
                errors.businessPhone && touched.businessPhone 
                  ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
              placeholder="+1 (123) 456-7890"
              required
            />
            {errors.businessPhone && touched.businessPhone && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                <Info size={16} />
              </div>
            )}
          </div>
          {errors.businessPhone && touched.businessPhone && (
            <p className="mt-1 text-sm text-red-500">{errors.businessPhone}</p>
          )}
        </div>

        {/* Business Type */}
        <div className="col-span-1">
          <label htmlFor="businessType" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Business Type <span className="text-red-500">*</span>
          </label>
          <select
            id="businessType"
            name="businessType"
            value={formData.businessType}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          >
            <option value="RETAIL">Retail</option>
            <option value="COMMERCIAL_REAL_ESTATE">Commercial Real Estate</option>
            <option value="MANUFACTURING_WAREHOUSING">Manufacturing & Warehousing</option>
            <option value="MULTI_FAMILY_RESIDENTIAL">Multi-Family Residential</option>
          </select>
        </div>
      </div>

      {/* Business Address */}
      <div>
        <label htmlFor="businessAddress" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Business Address <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="businessAddress"
            name="businessAddress"
            type="text"
            value={formData.businessAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-2.5 rounded-lg border ${
              errors.businessAddress && touched.businessAddress 
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
            placeholder="123 Business St, City, State, ZIP"
            required
          />
          {errors.businessAddress && touched.businessAddress && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
              <Info size={16} />
            </div>
          )}
        </div>
        {errors.businessAddress && touched.businessAddress && (
          <p className="mt-1 text-sm text-red-500">{errors.businessAddress}</p>
        )}
      </div>

      {/* Owner Information (for create mode only) */}
      {mode === 'create' && (
        <div className="border-t pt-5 mt-5">
          <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-4">Owner Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Owner Name */}
            <div className="col-span-1">
              <label htmlFor="ownerName" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Owner Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="ownerName"
                  name="ownerName"
                  type="text"
                  value={formData.ownerName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.ownerName && touched.ownerName 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
                  required
                />
                {errors.ownerName && touched.ownerName && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                    <Info size={16} />
                  </div>
                )}
              </div>
              {errors.ownerName && touched.ownerName && (
                <p className="mt-1 text-sm text-red-500">{errors.ownerName}</p>
              )}
            </div>

            {/* Owner Email */}
            <div className="col-span-1">
              <label htmlFor="ownerEmail" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                Owner Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="ownerEmail"
                  name="ownerEmail"
                  type="email"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.ownerEmail && touched.ownerEmail 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
                  required
                />
                {errors.ownerEmail && touched.ownerEmail && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-red-500">
                    <Info size={16} />
                  </div>
                )}
              </div>
              {errors.ownerEmail && touched.ownerEmail && (
                <p className="mt-1 text-sm text-red-500">{errors.ownerEmail}</p>
              )}
            </div>
          </div>

          {/* Owner Password */}
          <div className="mt-5">
            <label htmlFor="ownerPassword" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Owner Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="ownerPassword"
                name="ownerPassword"
                type={showPassword ? "text" : "password"}
                value={formData.ownerPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2.5 pr-10 rounded-lg border ${
                  errors.ownerPassword && touched.ownerPassword 
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-colors`}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {/* Password strength indicator */}
            {formData.ownerPassword && (
              <div className="mt-2">
                <div className="flex items-center mb-1">
                  <div className="w-full h-1.5 bg-gray-200 rounded overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()}`} 
                      style={{ width: `${(passwordStrength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium">{getPasswordStrengthText()}</span>
                </div>
                <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-2">
                  <li className={`flex items-center ${formData.ownerPassword.length >= 8 ? 'text-green-500' : ''}`}>
                    {formData.ownerPassword.length >= 8 ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                    At least 8 characters
                  </li>
                  <li className={`flex items-center ${/[A-Z]/.test(formData.ownerPassword) ? 'text-green-500' : ''}`}>
                    {/[A-Z]/.test(formData.ownerPassword) ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                    Contains uppercase letter
                  </li>
                  <li className={`flex items-center ${/[a-z]/.test(formData.ownerPassword) ? 'text-green-500' : ''}`}>
                    {/[a-z]/.test(formData.ownerPassword) ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                    Contains lowercase letter
                  </li>
                  <li className={`flex items-center ${/\d/.test(formData.ownerPassword) ? 'text-green-500' : ''}`}>
                    {/\d/.test(formData.ownerPassword) ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                    Contains number
                  </li>
                  <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.ownerPassword) ? 'text-green-500' : ''}`}>
                    {/[^A-Za-z0-9]/.test(formData.ownerPassword) ? <Check size={12} className="mr-1" /> : <X size={12} className="mr-1" />}
                    Contains special character
                  </li>
                </ul>
              </div>
            )}
            
            {errors.ownerPassword && touched.ownerPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.ownerPassword}</p>
            )}
          </div>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-6">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : mode === 'create' ? 'Create' : 'Update'}
        </button>
      </div>
    </form>
  );
}