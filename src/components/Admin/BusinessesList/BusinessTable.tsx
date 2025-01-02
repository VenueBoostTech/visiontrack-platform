import { Business, User } from "@prisma/client";

interface BusinessWithRelations extends Business {
  owner: User;
  staff: Array<{ user: User }>;
}

export default function BusinessTable({
  businesses,
}: {
  businesses: BusinessWithRelations[];
}) {
  return (
    <div className="rounded-lg border bg-white dark:bg-gray-800">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="px-4 py-3 text-left text-sm font-medium">
              Business Name
            </th>
            <th className="hidden lg:table-cell px-4 py-3 text-left text-sm font-medium">
              Updated
            </th>
            <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
              Local Test
            </th>
            <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
              Prod Test
            </th>
            <th className="hidden sm:table-cell px-4 py-3 text-left text-sm font-medium">
              Prod
            </th>
            <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business: any) => (
            <tr key={business.id} className="border-b last:border-0">
              <td className="px-4 py-3">
                <div>
                  <div className="font-medium">{business.name}</div>
                  <div className="text-sm text-gray-500">{business.email}</div>
                </div>
              </td>
              <td className="hidden lg:table-cell px-4 py-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100">
                  {business.updated_at
                    ? new Date(business.updated_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </td>
              <td className="hidden sm:table-cell px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{business?.is_local_test ? "True" : "False"}</span>
                </div>
              </td>
              <td className="hidden sm:table-cell px-4 py-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm">{business?.is_prod_test ? "True" : "False"}</span>
                </div>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center text-sm font-medium">
                  No
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {business?.is_active ? "Active" : "Inactive"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
