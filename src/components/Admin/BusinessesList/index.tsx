// components/Admin/BusinessesList/index.tsx
import { Suspense } from 'react';
import { VTSuperAdminService } from "@/lib/vt-external-api/services/vt-superadmin-service";
import BusinessListTopbar from "@/components/Admin/BusinessesList/BusinessListTopbar";
import BusinessListTable from "@/components/Admin/BusinessesList/BusinessListTable";
import { Building2, Users, CheckCircle, Laptop, Server } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const revalidate = 0;

// Stats component showing counts
function VTBusinessStats({ counts }: { counts: { 
  total: number; 
  active: number; 
  inactive: number;
  localTest: number;
  prodTest: number;
} }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
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
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Inactive</p>
              <p className="text-2xl font-bold">{counts.inactive}</p>
            </div>
            <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/30">
              <Building2 className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Local Test</p>
              <p className="text-2xl font-bold">{counts.localTest}</p>
            </div>
            <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
              <Laptop className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Production Test</p>
              <p className="text-2xl font-bold">{counts.prodTest}</p>
            </div>
            <div className="p-3 rounded-full bg-purple-50 dark:bg-purple-900/30">
              <Server className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Loading placeholder
function BusinessListLoading() {
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, i) => (
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
    status?: string;
    page?: string;
  } 
}) {
  const search = searchParams?.search || '';
  const status = searchParams?.status || '';
  
  let vtBusinesses = [];
  
  try {
    // Fetch VT businesses
    let businesses = await VTSuperAdminService.listBusinesses();
    
    // Apply search filter if provided
    if (search) {
      businesses = businesses.filter((business: any) => 
        business.name.toLowerCase().includes(search.toLowerCase()) || 
        business.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply status filter if provided
    if (status) {
      switch (status.toLowerCase()) {
        case 'active':
          businesses = businesses.filter((business: any) => business.is_active);
          break;
        case 'inactive':
          businesses = businesses.filter((business: any) => !business.is_active);
          break;
        case 'localtest':
          businesses = businesses.filter((business: any) => business.is_local_test);
          break;
        case 'prodtest':
          businesses = businesses.filter((business: any) => business.is_prod_test);
          break;
      }
    }
    
    vtBusinesses = businesses;
  } catch (error) {
    console.error("Error fetching VT businesses:", error);
  }
  
  // Calculate statistics
  const totalBusinesses = vtBusinesses.length;
  const activeBusinesses = vtBusinesses.filter((business: any) => business.is_active).length;
  const inactiveBusinesses = vtBusinesses.filter((business: any) => !business.is_active).length;
  const localTestBusinesses = vtBusinesses.filter((business: any) => business.is_local_test).length;
  const prodTestBusinesses = vtBusinesses.filter((business: any) => business.is_prod_test).length;
  
  return (
    <Suspense fallback={<BusinessListLoading />}>
      <BusinessListTopbar />
      
      <VTBusinessStats 
        counts={{
          total: totalBusinesses,
          active: activeBusinesses,
          inactive: inactiveBusinesses,
          localTest: localTestBusinesses,
          prodTest: prodTestBusinesses
        }}
      />
      
      <BusinessListTable vtBusinesses={vtBusinesses} />
    </Suspense>
  );
}