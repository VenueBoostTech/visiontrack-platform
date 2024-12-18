// components/Admin/Businesses/index.tsx
import { prisma } from "@/libs/prismaDb";
import BusinessTable from "@/components/Admin/Businesses/BusinessTable";
import BusinessTopbar from "@/components/Admin/Businesses/BusinessTopbar";

export const revalidate = 0;

export default async function BusinessListContainer() {
  const businesses = await prisma.business.findMany({
    include: {
      owner: true,
      staff: {
        include: {
          user: true
        }
      }
    }
  });

  return (
    <>
      <div className="mb-5">
        <BusinessTopbar />
      </div>
      <BusinessTable businesses={businesses} />
    </>
  );
}