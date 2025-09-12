"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  List,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [documentsOpen, setDocumentsOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    {
      name: "Documents",
      icon: FileText,
      children: [
        { name: "All Documents", icon: List, href: "/dashboard/documents" },
        {
          name: "Upload Document",
          icon: PlusCircle,
          href: "/dashboard/documents/upload",
        },
      ],
    },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-2 md:py-6 transition-colors duration-300">
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* Sidebar */}
        <motion.aside
          animate={{ width: isOpen ? 220 : 70 }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full shadow-lg transition-all duration-300 flex flex-col"
        >
          {/* Logo / Toggle */}
          <div className="flex items-center justify-between px-4 py-4">
            {isOpen && (
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                MyDashboard
              </span>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 dark:text-gray-300 hover:text-indigo-500"
            >
              ☰
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-2 space-y-2 mt-4">
            {menuItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.name}>
                    {/* Parent Menu Item */}
                    <button
                      onClick={() => setDocumentsOpen(!documentsOpen)}
                      className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-indigo-500" />
                        {isOpen && (
                          <span className="text-gray-700 dark:text-gray-200">
                            {item.name}
                          </span>
                        )}
                      </div>
                      {isOpen &&
                        (documentsOpen ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        ))}
                    </button>

                    {/* Submenu */}
                    {documentsOpen && isOpen && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 text-sm text-gray-600 dark:text-gray-300"
                          >
                            <child.icon className="w-4 h-4 text-indigo-400" />
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
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-indigo-500" />
                  {isOpen && (
                    <span className="text-gray-700 dark:text-gray-200">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </section>
  );
}
