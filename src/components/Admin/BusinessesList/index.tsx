// components/Admin/BusinessesList/index.tsx
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessTopbar from "./BusinessTopbar";
import BusinessTable from "./BusinessTable";

export const revalidate = 0;

export default async function BusinessListContainer() {
  const businesses = await VTSuperAdminService.listBusinesses();
  
  return (
    <>
      <div className="mb-5">
        <BusinessTopbar />
      </div>
      <BusinessTable businesses={businesses} />
    </>
  );
}