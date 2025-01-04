// components/Admin/BusinessesList/index.tsx
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListTopbar from "@/components/Admin/BusinessesList/BusinessListTopbar";
import BusinessListTable from "@/components/Admin/BusinessesList/BusinessListTable";
export const revalidate = 1;

async function getVTBusinesses() {
  let vtBusinesses: any = [];
  try {
    vtBusinesses = await VTSuperAdminService.listBusinesses();
  } catch (error) {
    console.error("Error creating business:", error);
  }
  return vtBusinesses;
}

export default async function BusinessListContainer() {
  const vtBusinesses = await getVTBusinesses();

  return (
    <>
      <div className="mb-5">
        <BusinessListTopbar />
      </div>
      {/* @ts-ignore */}
      <BusinessListTable vtBusinesses={vtBusinesses} />
    </>
  );
}
