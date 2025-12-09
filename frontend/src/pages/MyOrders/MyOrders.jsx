import { useEffect } from "react";
import {
  useGetAllOrdersQuery,
  useCancleOrderMutation,
} from "../../redux/Admin/userAPI";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const statusColors = {
  Placed: "bg-blue-600",
  Packed: "bg-yellow-500",
  Shipped: "bg-purple-500",
  OutForDelivery: "bg-orange-500",
  Delivered: "bg-green-600",
  Cancelled: "bg-red-600",
};

const trackingSteps = [
  "Placed",
  "Packed",
  "Shipped",
  "OutForDelivery",
  "Delivered",
];

const MyOrders = () => {
  const user = useSelector((state) => state.user);
  const { data: orders, isLoading } = useGetAllOrdersQuery(user.id);
  console.log(orders);

  const [cancleorder, { isLoading: loadingcancle }] = useCancleOrderMutation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [orders]);

  async function CancleOrder(orderId) {
    try {
      console.log(orderId);

      const res = await cancleorder(orderId);
      if (res.error) {
        toast.error("Error in Cancle order");
      } else {
        toast.success("order cancled");
      }
    } catch (error) {
      toast.error("Error in Cancle order");
      console.log(error);
    }
  }

  return (
    <div className="p-5 bg-black min-h-screen text-white">
      <h1 className="text-2xl font-semibold mb-5">My Orders</h1>

      <div className="space-y-5">
        {orders?.Orders?.map((order) => (
          <div
            key={order._id}
            className={`p-5 rounded-xl shadow-md border 
              ${
                order.isCancel
                  ? "bg-[#2a0000] border-red-800/40 opacity-80"
                  : "border-gray-700"
              }`}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Order ID: #{order._id.slice(-6)}
                </h2>
                <p className="text-gray-400 text-sm">
                  Placed on: {new Date(order.createdAt).toDateString()}
                </p>
              </div>

              {/* Delivery Status Badge */}
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium ${
                  statusColors[order.DeliveryStatus]
                }`}
              >
                {order.isCancel ? "Cancelled" : order.DeliveryStatus}
              </span>
            </div>

            {/* Products */}
            <div className="space-y-4">
              {order.Products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 bg-[#111827] border border-gray-700 rounded-lg p-4"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.title}</h3>
                    <p className="text-gray-400 text-sm">
                      Color: {item.product.colors} | Size: {item.size}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹{item.product.finalPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-sm line-through">
                      ₹{item.product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Address */}
            <div className="mt-4 text-gray-300 text-sm">
              <p>
                <span className="font-semibold text-white">Delivery to:</span>{" "}
                {order.Address.addressLine1}, {order.Address.city},{" "}
                {order.Address.state} - {order.Address.postalCode}
              </p>
            </div>

            {/* Cancelled Message */}
            {order.isCancel && (
              <div className="mt-4 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm font-semibold">
                This order has been cancelled.
              </div>
            )}

            {/* Order Tracking */}
            {!order.isCancel && (
              <div className="mt-6">
                <h2 className="font-semibold mb-2">Order Tracking</h2>

                <div className="flex items-center justify-between relative">
                  {trackingSteps.map((step, index) => {
                    const currentIndex = trackingSteps.indexOf(
                      order.DeliveryStatus
                    );
                    const isCompleted = index <= currentIndex;

                    return (
                      <div
                        key={step}
                        className="flex flex-col items-center w-full relative"
                      >
                        {/* Line */}
                        {index !== 0 && (
                          <div
                            className={`absolute -left-1 top-3 h-1 w-full ${
                              isCompleted ? "bg-green-500" : "bg-gray-600"
                            }`}
                          ></div>
                        )}

                        {/* Step Circle */}
                        <div
                          className={`w-6 h-6 flex items-center justify-center rounded-full z-10 ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : "bg-gray-600"
                          }`}
                        >
                          {isCompleted ? "✓" : ""}
                        </div>

                        {/* Step Label */}
                        <span className="text-xs mt-2 text-center">
                          {step.replace("OutForDelivery", "Out For Delivery")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Footer Section */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="font-semibold">
                  Total: ₹{order.TotalAmount.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">
                  Discount: ₹{order.TotalDiscount}
                </p>
              </div>

              {/* Cancel Button */}
              {order.isCancel ? (
                <button className="px-4 py-2 bg-gray-700 rounded-lg text-sm cursor-not-allowed">
                  Cancelled
                </button>
              ) : order.DeliveryStatus !== "Delivered" ? (
                <button
                  onClick={() => CancleOrder(order._id)}
                  className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 text-sm"
                >
                  Cancel Order
                </button>
              ) : (
                <button className="px-4 py-2 bg-green-700 rounded-lg text-sm cursor-not-allowed">
                  Delivered
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
