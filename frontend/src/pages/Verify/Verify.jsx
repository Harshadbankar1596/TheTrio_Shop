import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success) {
      toast.success("Order Placed Successfully");
      navigate("/myorders");
    } else {
      toast.error("Something went wrong");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      {/* Spinner */}
      <div className="w-14 h-14 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Verify;