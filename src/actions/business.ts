"use server";
import { prisma } from "@/libs/prismaDb";
import { isAuthorized } from "@/libs/isAuthorized";

// actions/user.ts
export async function getBusinesses(filter?: typeof UserRole) {
	const currentUser = await isAuthorized();
  
	const res = await prisma.business.findMany({
	  where: {
		owner: {
		  role: filter || undefined,
		},
	  },
	  include: {
		staff: {
		  include: {
			business: true
		  }
		}
	  }
	});
  
	const filteredBusinesses = res.filter(
	  (business) => business.email !== currentUser?.email && !business.email?.includes("demo-")
	);
  
	return filteredBusinesses;
  }

  
