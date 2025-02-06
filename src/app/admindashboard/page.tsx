"use client";

import { useState, useEffect } from "react";
import { FaCar, FaShoppingCart, FaUsers, FaTags, FaChartLine, FaCog, FaArrowRight } from "react-icons/fa";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState<"cars" | "bookings" | "users" | "categories" | null>(null);

  // Static data for Quick Stats
  const statsData = [
    { title: "Total Cars", value: "1,234", icon: <FaCar className="text-blue-500 text-3xl" />, bgColor: "bg-blue-100" },
    { title: "Total Bookings", value: "567", icon: <FaShoppingCart className="text-green-500 text-3xl" />, bgColor: "bg-green-100" },
    { title: "Total Users", value: "89", icon: <FaUsers className="text-purple-500 text-3xl" />, bgColor: "bg-purple-100" },
    { title: "Total Categories", value: "5", icon: <FaTags className="text-orange-500 text-3xl" />, bgColor: "bg-orange-100" },
  ];

  // Static data for Management Tools
  const managementTools = [
    { title: "Cars", icon: <FaCar className="text-blue-500 text-2xl" />, bgColor: "bg-blue-50" },
    { title: "Bookings", icon: <FaShoppingCart className="text-green-500 text-2xl" />, bgColor: "bg-green-50" },
    { title: "Users", icon: <FaUsers className="text-purple-500 text-2xl" />, bgColor: "bg-purple-50" },
    { title: "Categories", icon: <FaTags className="text-orange-500 text-2xl" />, bgColor: "bg-orange-50" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back, Admin! Here is an overview of your platform.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-sm flex items-center justify-between ${stat.bgColor} hover:shadow-md transition-shadow`}
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
            <div className="p-3 rounded-full bg-white">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Management Tools Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Management Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {managementTools.map((tool, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl shadow-sm ${tool.bgColor} hover:shadow-md transition-shadow`}
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-white">
                  {tool.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
              </div>
              <button
                onClick={() => setActiveSection(tool.title.toLowerCase() as any)}
                className="mt-6 w-full flex items-center justify-between px-4 py-2 bg-white text-gray-800 rounded-lg hover:bg-gray-100 transition-all"
              >
                <span>Manage</span>
                <FaArrowRight className="text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Display Lists Based on Active Section */}
      {activeSection && (
        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>
            <button
              onClick={() => setActiveSection(null)}
              className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-all"
            >
              Close
            </button>
          </div>
          <p className="text-gray-600 mb-6">Here you can manage {activeSection}.</p>
          {/* Placeholder for dynamic content */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-500">Dynamic content for {activeSection} will appear here.</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500">
        <p>© 2023 Admin Dashboard. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;