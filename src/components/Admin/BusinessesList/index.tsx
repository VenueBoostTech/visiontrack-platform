// components/Admin/BusinessesList/index.tsx
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListTopbar from "@/components/Admin/BusinessesList/BusinessListTopbar";
import BusinessListTable from "@/components/Admin/BusinessesList/BusinessListTable";
export const revalidate = 0;

export default async function BusinessListContainer() {
  const businesses = await VTSuperAdminService.listBusinesses();

  return (
    <>
      <div className="mb-5">
        <BusinessListTopbar />
      </div>
      <BusinessListTable businesses={businesses} />
    </>
  );
}
