"use client";

// components/Admin/Users/UserListTable.tsx
import { User, UserRole } from "@prisma/client";
import UserAction from "./UserAction";

const getRoleDisplay = (role: UserRole) => {
  switch (role) {
    case 'ADMIN':
      return 'Administrator';
    case 'BUSINESS_OWNER':
      return 'Business Owner';
    case 'STAFF':
      return 'Staff Member';
    default:
      return 'Unknown Role';
  }
};

const getBusinessName = (user: User) => {
	if (user.role === 'BUSINESS_OWNER') {
    // @ts-ignore - this is a temporary fix to allow the user to be a business owner
	  return user.ownedBusiness?.name;
	} else if (user.role === 'STAFF') {
	  // @ts-ignore - this is a temporary fix to allow the user to be a staff member
	  return user.workingAt?.business?.name;
	}
	return '-';
  };


  const formatDate = (date: Date | null | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  
export default function UserListTable({ users }: { users: User[] }) {
  return (
    <div className='rounded-10 bg-white shadow-1 dark:bg-gray-dark'>
      <table className='w-full'>
        <thead>
          <tr className='hidden border-b border-stroke dark:border-stroke-dark lsm:table-row'>
            <th className='min-w-[150px] px-4 py-5 text-left font-medium'>Name</th>
            <th className='hidden px-4 py-5 text-left font-medium xl:table-cell'>Email</th>
            <th className='hidden px-4 py-5 text-left font-medium xl:table-cell'>Role</th>
            <th className='hidden px-4 py-5 text-left font-medium md:table-cell'>Business</th>
            <th className='hidden px-4 py-5 text-left font-medium md:table-cell'>Registered</th>
            <th className='hidden px-4 py-5 text-right font-medium lsm:table-cell sm:pr-7.5'>Action</th>
          </tr>
        </thead>

        <tbody>
          {users?.map((user) => (
            <tr key={user?.id} className='border-b border-stroke last:border-b-0'>
              <td className='p-4 text-left sm:pl-7.5'>
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img src={user.image} alt={user.name || ''} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500 xl:hidden">{user?.email}</p>
                  </div>
                </div>
              </td>
              <td className='hidden xl:table-cell p-4 text-left'>{user?.email}</td>
              <td className='hidden xl:table-cell p-4 text-left'>
                <span className={`px-2.5 py-1 rounded-full text-sm ${
                  user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                  user.role === 'BUSINESS_OWNER' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {getRoleDisplay(user.role)}
                </span>
              </td>
              <td className='hidden md:table-cell p-4 text-left'>
                {getBusinessName(user)}
              </td>
              <td className='hidden md:table-cell p-4 text-left'>
              {formatDate(user?.createdAt)}
              </td>
			  <td className='hidden lsm:table-cell p-4 text-right sm:pr-7.5'>
                <div className="flex items-center justify-end gap-2">
                    <UserAction user={user} />
                </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}