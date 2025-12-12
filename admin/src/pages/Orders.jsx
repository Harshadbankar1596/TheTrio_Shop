import React from "react";
import { toast } from "react-toastify";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../redux/Admin/adminAPI";

const Orders = () => {
  const { data, isLoading } = useGetOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const statusOptions = [
    "Placed",
    "Packed",
    "Shipped",
    "OutForDelivery",
    "Delivered",
    "Cancelled",
  ];

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Update failed");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Placed: "bg-blue-500",
      Packed: "bg-yellow-500",
      Shipped: "bg-purple-500",
      OutForDelivery: "bg-orange-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="space-y-4">
          {data?.data?.map((order) => (
            <div
              key={order._id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order._id.slice(-6)}</h3>
                  <p className="text-gray-400 text-sm">
                    User: {order.User?.name || "N/A"} ({order.User?.email || "N/A"})
                  </p>
                  <p className="text-gray-400 text-sm">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">₹{order.TotalAmount}</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.DeliveryStatus
                    )}`}
                  >
                    {order.DeliveryStatus}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Products:</h4>
                <div className="space-y-2">
                  {order.Products?.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>
                        {item.product?.title || "N/A"} (Qty: {item.quantity}, Size: {item.size})
                      </span>
                      <span>₹{item.product?.finalPrice * item.quantity || 0}</span>
                    </div>
                  ))}
                </div>
              </div>

              {order.Address && (
                <div className="mb-4 text-sm text-gray-400">
                  <p>
                    Address: {order.Address.addressLine1}, {order.Address.city},{" "}
                    {order.Address.state} - {order.Address.postalCode}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-4">
                <label className="font-semibold">Update Status:</label>
                <select
                  value={order.DeliveryStatus}
                  onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                  className="px-4 py-2 bg-gray-700 rounded-lg"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;


