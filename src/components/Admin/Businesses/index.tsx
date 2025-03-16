// components/Admin/Businesses/index.tsx
import { Suspense } from 'react';
import { prisma } from "@/libs/prismaDb";
import BusinessTable from "@/components/Admin/Businesses/BusinessTable";
import BusinessTopbar from "@/components/Admin/Businesses/BusinessTopbar";
import { Building2, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 0;

// Stats component showing counts
function BusinessStats({ counts }: { counts: { 
  total: number; 
  active: number; 
  vtConnected: number;
  totalStaff: number;
} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Businesses</p>
              <p className="text-2xl font-bold">{counts.total}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/30">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Active Businesses</p>
              <p className="text-2xl font-bold">{counts.active}</p>
            </div>
            <div className="p-3 rounded-full bg-green-50 dark:bg-green-900/30">
              <Building2 className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">VT Connected</p>
              <p className="text-2xl font-bold">{counts.vtConnected}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30">
              <Building2 className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total Staff</p>
              <p className="text-2xl font-bold">{counts.totalStaff}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
              <Users className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Loading placeholder
function BusinessLoading() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 mb-6 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 animate-pulse">
        <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 mb-4 rounded"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 w-full bg-gray-200 dark:bg-gray-700 mb-2 rounded"></div>
        ))}
      </div>
    </div>
  );
}

export default async function BusinessListContainer({ 
  searchParams 
}: { 
  searchParams?: { 
    search?: string; 
    type?: string;
    page?: string;
  } 
}) {
  const search = searchParams?.search || '';
  const type = searchParams?.type || '';
  const page = Number(searchParams?.page) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  
  // Build filters
  const filters: any = {};
  
  // Apply search filter if provided
  if (search) {
    filters.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { address: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  // Apply type filter if provided
  if (type) {
    let vtUseScenario;
    switch (type.toLowerCase()) {
      case 'retail':
        vtUseScenario = 'RETAIL';
        break;
      case 'commercial':
        vtUseScenario = 'COMMERCIAL_REAL_ESTATE';
        break;
      case 'manufacturing':
        vtUseScenario = 'MANUFACTURING_WAREHOUSING';
        break;
      case 'residential':
        vtUseScenario = 'MULTI_FAMILY_RESIDENTIAL';
        break;
    }
    
    if (vtUseScenario) {
      filters.vt_use_scenario = vtUseScenario;
    }
  }

  // Get businesses with pagination
  const businesses = await prisma.business.findMany({
    where: filters,
    include: {
      owner: true,
      staff: {
        include: {
          user: true
        }
      }
    },
    skip,
    take: pageSize,
    orderBy: {
      createdAt: 'desc'
    }
  });
  
  // Get total count for pagination
  const total = await prisma.business.count({
    where: filters
  });
  
  // Calculate statistics
  const totalBusinesses = await prisma.business.count();
  const activeBusinesses = await prisma.business.count({ where: { active: true } });
  const vtConnectedBusinesses = await prisma.business.count({ where: { vt_connected: true } });
  
  // Get total staff count
  const staffCounts = await prisma.business.aggregate({
    _sum: {
      _count: {
        select: {
          staff: true
        }
      }
    }
  });
  
  const totalStaff = staffCounts._sum?._count?.staff || 0;
  
  return (
    <Suspense fallback={<BusinessLoading />}>
      <BusinessTopbar />
      
      <BusinessStats 
        counts={{
          total: totalBusinesses,
          active: activeBusinesses,
          vtConnected: vtConnectedBusinesses,
          totalStaff: totalStaff
        }}
      />
      
      <BusinessTable 
        businesses={businesses} 
        totalItems={total}
        currentPage={page}
        pageSize={pageSize}
        totalPages={Math.ceil(total / pageSize)}
      />
    </Suspense>
  );
}