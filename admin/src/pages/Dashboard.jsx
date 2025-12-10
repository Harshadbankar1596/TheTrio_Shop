import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../redux/Admin/adminSlice";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  ShoppingCart,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAdmin());
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: FolderTree, label: "Categories", path: "/categories" },
    { icon: FolderTree, label: "Sub Categories", path: "/subcategories" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: ShoppingCart, label: "Orders", path: "/orders" },
    { icon: Users, label: "Users", path: "/users" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden bg-gray-800 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300`}
        >
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
            <p className="text-gray-400 text-sm mt-1">{admin.email}</p>
          </div>
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600 transition-colors text-left"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

