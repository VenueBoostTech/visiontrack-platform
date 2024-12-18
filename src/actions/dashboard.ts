// actions/dashboard.ts
"use server";

import { prisma } from "@/libs/prismaDb";
import { User, Business, UserRole } from "@prisma/client";

export async function getDashboardStats() {
  const allUsers = await prisma.user.findMany({
    where: {
      email: {
        not: {
          contains: "demo-"
        }
      }
    }
  });

  const businesses = await prisma.business.findMany();

  return {
    totalUsers: allUsers.length,
    businessOwners: allUsers.filter((u: User) => u.role === UserRole.BUSINESS_OWNER).length,
    staffMembers: allUsers.filter((u: User) => u.role === UserRole.STAFF).length,
    adminUsers: allUsers.filter((u: User) => u.role === UserRole.ADMIN).length,
    activeBusinesses: businesses.length
  };
}