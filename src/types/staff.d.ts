export type StaffStatus = "active" | "inactive";

// remember to map the staff role select box from staff role constants
export type StaffRole = "admin" | "cashier" | "super-admin";

export type Staff = {
  id: string;
  image: string;
  name: string;
  email: string;
  phone: string;
  role: StaffRole;
  status: StaffStatus;
  createdAt: string;
  updatedAt: string;
};
