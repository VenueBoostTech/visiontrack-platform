"use client";
import { useRef, useState, useEffect } from "react";
import Sidebar from "@/components/Common/Dashboard/Sidebar";
import Header from "@/components/Common/Dashboard/Header";
import {
  adminSidebarData,
  adminSidebarOtherData,
} from "@/staticData/sidebarData";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024
      ) {
        setOpenSidebar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 ease-in-out dark:bg-gray-800 lg:static lg:translate-x-0 ${
          openSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar
          sidebarData={adminSidebarData}
          sidebarOthersData={adminSidebarOtherData}
          sidebarRef={sidebarRef}
        />
      </aside>

      {/* Main Content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="flex-1 overflow-auto bg-gray-50 p-4 md:p-6 dark:bg-gray-900">
          {children}
        </div>
      </main>

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminLayout;