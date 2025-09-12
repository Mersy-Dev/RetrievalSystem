"use client";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Welcome to Your Dashboard
      </h1>

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
    </>
  );
}
