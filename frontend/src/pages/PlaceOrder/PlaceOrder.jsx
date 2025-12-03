import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        orderItems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    let response = await axios.post(
      url + "/api/order/place",
      orderData,
      { headers: { token } }
    );

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      toast.error("Error!");
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      toast.error("Please add items to cart");
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="w-full flex flex-col lg:flex-row gap-10 px-6 md:px-16 mt-16 mb-16"
    >
      {/* Left Section - Delivery Form */}
      <div className="w-full lg:w-2/3 bg-white shadow-md p-8 rounded-xl">

        <p className="text-2xl font-semibold text-gray-800 mb-6">
          Delivery Information
        </p>

        {/* First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />

          <input
            required
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <input
          required
          type="text"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email Address"
          className="w-full mt-4 border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />

        {/* Street */}
        <input
          required
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
          className="w-full mt-4 border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />

        {/* City & State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            required
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />

          <input
            required
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Zipcode & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <input
            required
            type="text"
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />

          <input
            required
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
            className="border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <input
          required
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
          className="w-full mt-4 border border-gray-300 px-4 py-2 rounded-lg focus:border-orange-500 focus:outline-none"
        />
      </div>

      {/* Right Section - Cart Total */}
      <div className="w-full lg:w-1/3 bg-white shadow-md p-8 rounded-xl h-fit">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart Totals</h2>

        <div className="flex justify-between py-2 text-gray-700">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />

        <div className="flex justify-between py-2 text-gray-700">
          <p>Delivery Fee</p>
          <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />

        <div className="flex justify-between py-2 text-gray-900 font-semibold">
          <p>Total</p>
          <p>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg mt-4 font-semibold transition"
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </form>
  );
};

export default PlaceOrder;