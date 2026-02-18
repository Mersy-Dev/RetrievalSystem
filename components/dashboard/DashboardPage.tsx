"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Activity,
  FileText,
  Users,
  MapPin,
  PlusCircle,
  Upload,
  BarChart3,
  UserPlus,
} from "lucide-react";
import { useUser } from "@/redux/user/hooks/useUser";

export default function DashboardPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const { user } = useUser();
  
  // Extract first name from user
  const firstName = user?.name?.split(' ')[0] || 'User';

  // Stats data - these would come from your API in production
  const stats = [
    {
      label: "Total Cases",
      value: "2,847",
      change: "+12.5% from last month",
      trend: "up" as const,
      icon: Activity,
      iconColor: "text-sky-600 dark:text-sky-400",
      bgColor: "bg-sky-100 dark:bg-sky-900",
      link: `/${locale}/dashboard/cases`,
    },
    {
      label: "Documents",
      value: "545",
      change: "+23 new this week",
      trend: "up" as const,
      icon: FileText,
      iconColor: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900",
      link: `/${locale}/dashboard/documents`,
    },
    {
      label: "Active Users",
      value: "1,245",
      change: "+5.2% this month",
      trend: "up" as const,
      icon: Users,
      iconColor: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900",
      link: `/${locale}/dashboard/users`,
    },
    {
      label: "High Risk Areas",
      value: "18",
      change: "3 areas need attention",
      trend: "down" as const,
      icon: AlertCircle,
      iconColor: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900",
      link: `/${locale}/dashboard/cases/risk-areas`,
    },
  ];

  // Quick actions
  const quickActions = [
    {
      title: "Report New Case",
      description: "Add a new malaria case to the system",
      icon: PlusCircle,
      href: `/${locale}/dashboard/cases/report`,
      color: "sky" as const,
    },
    {
      title: "Upload Document",
      description: "Add research papers or resources",
      icon: Upload,
      href: `/${locale}/dashboard/documents/upload`,
      color: "blue" as const,
    },
    {
      title: "View Analytics",
      description: "Check statistics and reports",
      icon: BarChart3,
      href: `/${locale}/dashboard/reports/statistics`,
      color: "purple" as const,
    },
    {
      title: "Add User",
      description: "Register a new system user",
      icon: UserPlus,
      href: `/${locale}/dashboard/users`,
      color: "green" as const,
    },
  ];

  // Recent activities - would come from API
  const recentActivities = [
    {
      type: "case",
      title: "New malaria case reported",
      location: "Lagos, Nigeria",
      time: "2 hours ago",
    },
    {
      type: "document",
      title: "Treatment guideline uploaded",
      location: "WHO - 2024 Edition",
      time: "5 hours ago",
    },
    {
      type: "user",
      title: "New user registered",
      location: "Dr. Sarah Johnson",
      time: "1 day ago",
    },
    {
      type: "alert",
      title: "High risk area identified",
      location: "Ibadan, Oyo State",
      time: "2 days ago",
    },
    {
      type: "case",
      title: "Case status updated",
      location: "Abuja, FCT",
      time: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r md:mt-20 from-sky-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-sky-100 text-sm md:text-base">
              Here&apos;s what&apos;s happening with your malaria information system today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2 backdrop-blur-sm">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-medium">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "short", 
                month: "short", 
                day: "numeric" 
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.link}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors" />
            </div>
            
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </p>
              <div className="flex items-center gap-1">
                {stat.trend === "up" && (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                )}
                {stat.trend === "down" && (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                )}
                <span className={`text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" :
                  stat.trend === "down" ? "text-green-600" :
                  "text-gray-600 dark:text-gray-400"
                }`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions - 2/3 width */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-sky-500 dark:hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200 group"
              >
                <div className={`${
                  action.color === "sky" ? "bg-sky-100 dark:bg-sky-900" :
                  action.color === "blue" ? "bg-blue-100 dark:bg-blue-900" :
                  action.color === "purple" ? "bg-purple-100 dark:bg-purple-900" :
                  "bg-green-100 dark:bg-green-900"
                } p-3 rounded-lg w-fit mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className={`w-6 h-6 ${
                    action.color === "sky" ? "text-sky-600 dark:text-sky-400" :
                    action.color === "blue" ? "text-blue-600 dark:text-blue-400" :
                    action.color === "purple" ? "text-purple-600 dark:text-purple-400" :
                    "text-green-600 dark:text-green-400"
                  }`} />
                </div>
                <p className="font-semibold text-gray-900 dark:text-white mb-1">
                  {action.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity - 1/3 width */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex gap-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === "case" ? "bg-sky-500" :
                  activity.type === "document" ? "bg-blue-500" :
                  activity.type === "user" ? "bg-purple-500" :
                  "bg-orange-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {activity.location}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* High Risk Areas Map Placeholder */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            High Risk Areas
          </h2>
          <Link 
            href={`/${locale}/dashboard/cases/risk-areas`}
            className="text-sm text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
          >
            View all
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Map visualization will be displayed here
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Integration with mapping service coming soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}