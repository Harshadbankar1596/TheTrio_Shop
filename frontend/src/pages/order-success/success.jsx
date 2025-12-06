import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";


const Success = () => {
  const { state } = useLocation();
  const obj = state || {};
  console.log(obj);
  


  useEffect(() => {
    async function verifyOrder() {
      try {
        const res = await axios.post("http://localhost:5000/api/user/verify-payment" , {
          razorpay_order_id: obj.orderId,
          razorpay_payment_id: obj.paymentId,
          razorpay_signature: obj.signature,
          TotalAmount: obj.TotalAmount,
          TotalDiscount: obj.TotalDiscount,
          userId: obj.User.id,
          addressId: obj.Address._id,
          Products: obj.Products,
          PaymentType: obj.paymenttype,
          cuponCode: obj.cuponCode || null,
        });

        if (res.error) {
          toast.error("Payment verification failed");
        } else {
          toast.success("Order Placed Successfully");
        }
      } catch (error) {
        toast.error("Error placing order");
      }
    }

    if (obj) {
      verifyOrder();
    }
  }, []); 

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Payment Successful 🎉</h1>
    </div>
  );
};

export default Success;