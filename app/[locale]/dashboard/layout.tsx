"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  List,
  Activity,
  BarChart3,
  AlertCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/redux/user/hooks/useUser";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const { logout } = useUser();
  
  const [isOpen, setIsOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [casesOpen, setCasesOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push(`/${locale}/auth/login`);
  };

  const menuItems = [
    { 
      name: "Overview", 
      icon: LayoutDashboard, 
      href: `/${locale}/dashboard` 
    },
    {
      name: "Malaria Cases",
      icon: Activity,
      children: [
        { name: "All Cases", icon: List, href: `/${locale}/dashboard/cases` },
        { name: "Report Case", icon: PlusCircle, href: `/${locale}/dashboard/cases/report` },
        { name: "High Risk Areas", icon: AlertCircle, href: `/${locale}/dashboard/cases/risk-areas` },
      ],
    },
    {
      name: "Documents",
      icon: FileText,
      children: [
        { name: "All Documents", icon: List, href: `/${locale}/dashboard/documents` },
        { name: "Upload Document", icon: PlusCircle, href: `/${locale}/dashboard/documents/upload` },
      ],
    },
    {
      name: "Reports & Analytics",
      icon: BarChart3,
      children: [
        { name: "Statistics", icon: BarChart3, href: `/${locale}/dashboard/reports/statistics` },
        { name: "Export Data", icon: FileText, href: `/${locale}/dashboard/reports/export` },
      ],
    },
    { 
      name: "Users", 
      icon: Users, 
      href: `/${locale}/dashboard/users` 
    },
    { 
      name: "Settings", 
      icon: Settings, 
      href: `/${locale}/dashboard/settings` 
    },
  ];

  const toggleSubmenu = (itemName: string) => {
    if (itemName === "Documents") {
      setDocumentsOpen(!documentsOpen);
    } else if (itemName === "Reports & Analytics") {
      setReportsOpen(!reportsOpen);
    } else if (itemName === "Malaria Cases") {
      setCasesOpen(!casesOpen);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: isOpen ? 260 : 70 }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full shadow-lg transition-all duration-300 flex flex-col"
        >
          {/* Logo / Toggle */}
          <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
            {isOpen && (
              <span className="text-xl font-bold text-sky-600 dark:text-sky-400">
                Malaria System
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              ☰
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              if (item.children) {
                const isSubmenuOpen = 
                  item.name === "Documents" ? documentsOpen :
                  item.name === "Reports & Analytics" ? reportsOpen :
                  item.name === "Malaria Cases" ? casesOpen : false;

                return (
                  <div key={item.name}>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                        {isOpen && (
                          <span className="text-gray-700 dark:text-gray-200 font-medium">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {isOpen &&
                        (isSubmenuOpen ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        ))}
                    </button>

                    {/* Submenu */}
                    {isSubmenuOpen && isOpen && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 text-sm text-gray-600 dark:text-gray-300 hover:text-sky-700 dark:hover:text-sky-300 transition-colors"
                          >
                            <child.icon className="w-4 h-4" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                >
                  <item.icon className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                  {isOpen && (
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg w-full hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              {isOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
          {children}
        </main>
      </div>
    </section>
  );
}