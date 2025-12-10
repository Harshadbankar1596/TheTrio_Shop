import React from "react";
import { useGetCategoriesQuery } from "../redux/Admin/adminAPI";
import { useGetProductsQuery } from "../redux/Admin/adminAPI";
import { useGetOrdersQuery } from "../redux/Admin/adminAPI";
import { useGetUsersQuery } from "../redux/Admin/adminAPI";
import { Package, ShoppingCart, Users, FolderTree } from "lucide-react";

const DashboardHome = () => {
  const { data: categories } = useGetCategoriesQuery();
  const { data: products } = useGetProductsQuery();
  const { data: orders } = useGetOrdersQuery();
  const { data: users } = useGetUsersQuery();

  const stats = [
    {
      title: "Total Categories",
      value: categories?.data?.length || 0,
      icon: FolderTree,
      color: "bg-blue-600",
    },
    {
      title: "Total Products",
      value: products?.data?.length || 0,
      icon: Package,
      color: "bg-green-600",
    },
    {
      title: "Total Orders",
      value: orders?.data?.length || 0,
      icon: ShoppingCart,
      color: "bg-yellow-600",
    },
    {
      title: "Total Users",
      value: users?.data?.length || 0,
      icon: Users,
      color: "bg-purple-600",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-4 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;

