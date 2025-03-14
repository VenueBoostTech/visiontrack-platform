// Type for business form
export interface BusinessDetails {
    businessId: string;
    userId: string;
    businessType?: string;
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };
    taxId?: string;
    vatNumber?: string;
  }


  export interface BusinessFormData {
    businessType: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    taxId: string;
    vatNumber: string;
  }