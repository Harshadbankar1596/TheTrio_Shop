import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
// import LoginPopup from "./components/LoginPopup/LoginPopup";
// import { StoreContext } from "./context/StoreContext";
// import Products from "./pages/categoryproduct/products";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Footer from "./components/Footer/Footer";
import Verify from "./pages/Verify/Verify";
import Productdetails from "./pages/product/productdetails";
import MainSection from "./pages/categoryproduct/mainsection";
import PrivacyPolicy from "./components/privecypolicy/privecypolicy";
import ContactUs from "./components/contactus/contactus";
import TermsOfService from "./components/terms/terms";
import RefundPolicy from "./components/refundpolicy/refund";
import Success from "./pages/order-success/success";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

      <div className="app bg-black">
        <ToastContainer />

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/success" element={<Success />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/category/:id" element={<MainSection />} />
          <Route path="/product/:id" element={<Productdetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/termcondition" element={<TermsOfService />} />
          <Route path="/refundpolicy" element={<RefundPolicy />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
};

export default App;