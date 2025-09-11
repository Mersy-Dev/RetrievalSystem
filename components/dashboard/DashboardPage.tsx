"use client";

import { useState } from "react";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Documents", icon: FileText, href: "/dashboard/documents" },
    { name: "Users", icon: Users, href: "/dashboard/users" },
    { name: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <section className="bg-sky-50 dark:bg-gray-900 py-2 md:py-2 transition-colors duration-300">
      <div className="flex h-screen bg-gray-100 py-6 dark:bg-gray-900">
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
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
            >
              <item.icon className="w-5 h-5 text-indigo-500" />
              {isOpen && <span className="text-gray-700 dark:text-gray-200">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Welcome to Your Dashboard
        </h1>

        {/* Example content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Total Users
            </h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">1,245</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Documents
            </h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">320</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Active Sessions
            </h2>
            <p className="mt-2 text-3xl font-bold text-indigo-600">58</p>
          </div>
        </div>
      </main>
    </div>
    </section>
  );
}
