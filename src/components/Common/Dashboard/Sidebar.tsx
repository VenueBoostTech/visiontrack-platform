"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const MenuItem = ({ item, pathname, openMenus, toggleMenu }: any) => {
  const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
  
  return (
    <div key={item.id}>
      <Link
        href={item.children ? "#" : item.path}
        onClick={
          item.children
            ? (e) => {
                e.preventDefault();
                toggleMenu(item.id);
              }
            : undefined
        }
        className={`group flex w-full items-center rounded-lg p-2 text-sm font-medium transition-colors ${
          isActive
            ? "bg-[#5577ff]/10 text-[#5577ff] dark:bg-[#5577ff]/20 dark:text-white"
            : "text-gray-600 hover:bg-[#5577ff]/5 hover:text-[#5577ff] dark:text-gray-300 dark:hover:bg-[#5577ff]/10 dark:hover:text-white"
        }`}
      >
        <span className={`mr-3 ${isActive ? "text-[#5577ff]" : ""}`}>{item.icon}</span>
        <span className="flex-1">{item.title}</span>
        {item.children && (
          <span className="ml-auto">
            {openMenus[item.id] ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </Link>

      {item.children && openMenus[item.id] && (
        <div className="mt-1 space-y-1 pl-6">
          {item.children.map((child: any) => (
            <Link
              key={child.id}
              href={child.path}
              className={`group flex items-center rounded-lg p-2 text-sm font-medium transition-colors ${
                pathname === child.path
                  ? "bg-[#5577ff]/10 text-[#5577ff] dark:bg-[#5577ff]/20 dark:text-white"
                  : "text-gray-600 hover:bg-[#5577ff]/5 hover:text-[#5577ff] dark:text-gray-300 dark:hover:bg-[#5577ff]/10 dark:hover:text-white"
              }`}
            >
              <span className={`mr-3 ${pathname === child.path ? "text-[#5577ff]" : ""}`}>
                {child.icon}
              </span>
              <span className="flex-1">{child.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Sidebar({
  sidebarData,
  sidebarOthersData,
  sidebarRef,
}: any) {
  const pathname = usePathname();
  
  // Find the current open menu
  const currentOpenMenu = sidebarData.find(
    (i: any) => pathname === i.path || pathname.startsWith(i.path + "/")
  );
  
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({
    [currentOpenMenu?.id ?? 0]: true,
  });

  const toggleMenu = (id: number) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  // Determine if on admin page
  const isAdmin = pathname.includes('/admin');

  // Different groupings for admin vs user
  let groupedItems;
  
  if (isAdmin) {
    // Admin grouping
    groupedItems = [
      {
        title: "Overview",
        items: sidebarData.filter(item => 
          ["Dashboard"].includes(item.title)
        )
      },
      {
        title: "Management",
        items: sidebarData.filter(item => 
          ["Client Management", "User Management"].includes(item.title)
        )
      },
      {
        title: "AI Computer Vision", // New grouping for AI components
        items: sidebarData.filter(item => 
          ["AI Model Management", "AI Data Management"].includes(item.title)
        )
      },
      {
        title: "Infrastructure",
        items: sidebarData.filter(item => 
          ["Infrastructure", "Data Synchronization"].includes(item.title)
        )
      },
      {
        title: "Integrations",
        items: sidebarData.filter(item => 
          ["Integration & APIs"].includes(item.title)
        )
      },
      {
        title: "Analytics & Reports",
        items: sidebarData.filter(item => 
          ["Analytics & Reports"].includes(item.title)
        )
      },
      {
        title: "System",
        items: sidebarData.filter(item => 
          ["System Settings"].includes(item.title)
        )
      }
    ];
  } else {
    // User grouping
    groupedItems = [
      {
        title: "Main Menu",
        items: sidebarData.filter(item => 
          ["Dashboard"].includes(item.title)
        )
      },
      {
        title: "Infrastructure",
        items: sidebarData.filter(item => 
          ["Properties"].includes(item.title)
        )
      },
      {
        title: "Monitoring & Security",
        items: sidebarData.filter(item => 
          ["Live Monitoring", "Security"].includes(item.title)
        )
      },
      {
        title: "AI Computer Vision",  // New group name for AI components
        items: sidebarData.filter(item => 
          ["Data", "Models"].includes(item.title)
        )
      },
      {
        title: "Analytics",
        items: sidebarData.filter(item => 
          ["Analytics"].includes(item.title)
        )
      },
      {
        title: "Operations",
        items: sidebarData.filter(item => 
          ["Operations"].includes(item.title)
        )
      },
      {
        title: "Management",
        items: sidebarData.filter(item => 
          ["Staff"].includes(item.title)
        )
      },
      {
        title: "Settings",
        items: sidebarData.filter(item => 
          ["Settings"].includes(item.title)
        )
      }
    ];
  }

  // Filter out empty groups
  const nonEmptyGroups = groupedItems.filter(group => group.items.length > 0);

  return (
    <div ref={sidebarRef} className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex-shrink-0 bg-white dark:bg-gray-800">
        <div className="flex justify-center items-center h-[72px] px-6 border-b border-stroke dark:border-stroke-dark">
          <Link href="/" className="flex items-center justify-center">
            <Image
              src="/images/logo/logo.svg"
              alt="Logo"
              width={160}
              height={36}
              className="dark:hidden"
              priority
            />
            <Image
              src="/images/logo/logo-light.svg"
              alt="Logo"
              width={160}
              height={36}
              className="hidden dark:block"
              priority
            />
          </Link>
        </div>
      </div>

      {/* Scrollable Menu Section */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-8 space-y-8">
          {/* Display each non-empty group */}
          {nonEmptyGroups.map((group, index) => (
            <div key={index}>
              <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {group.title}
              </h3>
              <nav className="space-y-1">
                {group.items.map((item) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    openMenus={openMenus}
                    toggleMenu={toggleMenu}
                  />
                ))}
              </nav>
            </div>
          ))}

          {/* Others Section */}
          {sidebarOthersData && sidebarOthersData.length > 0 && (
            <div>
              <h3 className="px-2 mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Others
              </h3>
              <nav className="space-y-1">
                {sidebarOthersData.map((item: any) => (
                  <MenuItem
                    key={item.id}
                    item={item}
                    pathname={pathname}
                    openMenus={openMenus}
                    toggleMenu={toggleMenu}
                  />
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}