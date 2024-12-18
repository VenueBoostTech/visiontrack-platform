import UsersListContainer from "@/components/Admin/Users";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: `Users - ${process.env.PLATFORM_NAME}`,
	description: `Users Description`,
};

export default function UsersPage({
	searchParams,
  }: {
	searchParams: { filter: string; search: string };
  }) {
	const { filter, search } = searchParams;
	
	// Update this to check for valid roles
	const validFilter = filter === "ADMIN" || 
					   filter === "BUSINESS_OWNER" || 
					   filter === "STAFF" 
					   ? filter 
					   : undefined;
  
	return (
	  <>
		<Breadcrumb pageTitle="Manage Users" />
		<UsersListContainer filter={validFilter} search={search} />
	  </>
	);
  }