import React, { useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
// import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import { StoreContext } from "./context/StoreContext";
import Products from "./pages/categoryproduct/products";
import Productdetails from "./pages/product/productdetails";
import MainSection from "./pages/categoryproduct/mainsection";
import PrivacyPolicy from "./components/privecypolicy/privecypolicy";
import ContactUs from "./components/contactus/contactus";
import TermsOfService from "./components/terms/terms";
import RefundPolicy from "./components/refundpolicy/refund";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const { token, setToken } = useContext(StoreContext);

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}

      <div className="app bg-black">
        <ToastContainer />

        <Navbar
          setShowLogin={setShowLogin}
          token={token}
          setToken={setToken}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
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
