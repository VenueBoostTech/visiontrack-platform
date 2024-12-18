"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";
import { UserRole } from "@prisma/client";


export async function getUsers(filter?: string) {
	const currentUser = await isAuthorized();
	
	// Convert filter for specific role queries
	const roleFilter = (filter && filter !== "all" && filter !== "undefined") 
	  ? { role: filter as UserRole }
	  : {};
	
	const users = await prisma.user.findMany({
	  where: roleFilter,
	  include: {
		ownedBusiness: true,
		workingAt: {
		  include: {
			business: true
		  }
		}
	  }
	});
  
	// Only filter out demo users and keep everyone else when showing all users
	return users.filter(user => {
	  // Always filter out demo users
	  if (user.email?.includes("demo-")) return false;
  
	  // If we're viewing all users or admins, show current user
	  if (!filter || filter === "all" || filter === "undefined" || filter === "ADMIN") {
		return true;
	  }
  
	  // For other filtered views, exclude current user
	  return user.email !== currentUser?.email;
	});
  }
export async function updateUser(data: any) {
	const { email } = data;
	return await prisma.user.update({
		where: {
			email: email.toLowerCase(),
		},
		data: {
			email: email.toLowerCase(),
			...data,
		},
	});
}

export async function deleteUser(user: any) {
	if (user?.email?.includes("demo-")) {
		return new Error("Can't delete demo user");
	}

	if (!user) {
		return new Error("User not found");
	}

	return await prisma.user.delete({
		where: {
			email: user?.email.toLowerCase() as string,
		},
	});
}

export async function serchUser(email: string) {
	return await prisma.user.findUnique({
		where: {
			email: email.toLowerCase(),
		},
	});
}
