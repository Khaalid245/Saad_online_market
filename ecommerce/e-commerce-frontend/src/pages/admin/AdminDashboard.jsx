// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li>
            <Link to="/admin/products" className="hover:text-blue-400">
              Manage Products
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="hover:text-blue-400">
              Manage Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className="hover:text-blue-400">
              Manage Users
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
