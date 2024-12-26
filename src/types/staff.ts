export interface StaffMember {
    id: string;
    userId: string;
    businessId: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      createdAt: Date;
    };
    department: string;
  }
  
  export interface CreateStaffData {
    name: string;
    email: string;
    password: string;
    businessId: string;
    department: string;
  }
  
  export interface UpdateStaffData {
    name: string;
    email: string;
    department: string;
  }