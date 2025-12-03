import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );

    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="w-full px-6 md:px-16 mt-16">

      {/* Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-8">My Orders</h2>

      {/* Orders Container */}
      <div className="flex flex-col gap-6">
        {data.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-5 gap-6 border border-gray-200"
          >
            {/* Icon */}
            <img
              src={assets.parcel_icon}
              alt="parcel"
              className="w-16 h-16"
            />

            {/* Ordered Items */}
            <p className="flex-1 text-gray-700 text-center md:text-left">
              {order.items.map((item, i) => (
                <span key={i}>
                  {item.name} X {item.quantity}
                  {i !== order.items.length - 1 && ", "}
                </span>
              ))}
            </p>

            {/* Amount */}
            <p className="text-lg font-semibold text-gray-900">
              ${order.amount}.00
            </p>

            {/* Total Items */}
            <p className="text-gray-700">
              Items: <b>{order.items.length}</b>
            </p>

            {/* Status */}
            <p className="flex items-center gap-2 text-gray-900 font-medium">
              <span className="text-green-500 text-xl">&#x25cf;</span>
              <b>{order.status}</b>
            </p>

            {/* Track Order Button */}
            <button
              onClick={fetchOrders}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Track Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
