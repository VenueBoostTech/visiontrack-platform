// components/Admin/BusinessesList/index.tsx
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListTopbar from "@/components/Admin/BusinessesList/BusinessListTopbar";
import BusinessListTable from "@/components/Admin/BusinessesList/BusinessListTable";
export const revalidate = 0;

export default async function BusinessListContainer() {
  // const businesses = await VTSuperAdminService.listBusinesses();
  // @ts-ignore
  const businesses = [];

  return (
    <>
      <div className="mb-5">
        <BusinessListTopbar />
      </div>
      {/* @ts-ignore */}
      <BusinessListTable businesses={businesses} />
    </>
  );
}
