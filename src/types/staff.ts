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
    departmentId: string;
  }
  
  export interface CreateStaffData {
    name: string;
    email: string;
    password: string;
    businessId: string;
    departmentId: string;
  }
  
  export interface UpdateStaffData {
    name: string;
    email: string;
    departmentId: string;
  }