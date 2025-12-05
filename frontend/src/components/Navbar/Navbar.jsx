import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Name from "../Name";
import { ShoppingBag, Search, User as UserIcon, Menu, X, LogOut } from "lucide-react";
import RegisterModal from "./register";
import LoginModal from "./loginmodel";
import UserComponent from "./user"; 
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/Admin/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = user?.token;

  const [menuOpen, setMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUserCard, setShowUserCard] = useState(false);

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Contact Us", to: "/contact" },
    { label: "Privacy & Policy", to: "/privacypolicy" },
    { label: "Term & Condition", to: "/termcondition" },
    { label: "Refund Policy", to: "/refundpolicy" },
  ];

  const logout = () => {
    dispatch(setUser({ user: {}, token: "" }));
    localStorage.removeItem("token");
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 select-none">
            <div>
              <h1 className="text-white text-xl font-semibold tracking-wide">
                <Name />
              </h1>
              <p className="text-xs text-white/60">Minimal Fashion</p>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="text-white/70 hover:text-white text-sm tracking-wide transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ICONS + AUTH */}
          <div className="flex items-center gap-6">

            <Search size={20} className="text-white/80 cursor-pointer" />

            <Link to="/cart">
              <ShoppingBag size={22} className="text-white/90 cursor-pointer" />
            </Link>

            {/* ======== IF USER NOT LOGGED IN ======== */}
            {!token ? (
              <div className="hidden md:flex gap-4">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-white/80 hover:text-white"
                >
                  Login
                </button>

                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="text-white/80 hover:text-indigo-400"
                >
                  Register
                </button>
              </div>
            ) : (
              /* ======== USER PROFILE DROPDOWN ======== */
              <div className="hidden md:block relative">
                <motion.div
                  onMouseEnter={() => setShowUserCard(true)}
                  onMouseLeave={() => setShowUserCard(false)}
                >
                  <UserIcon size={24} className="text-white cursor-pointer" />

                  {showUserCard && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-black/80 border border-white/10 
                                 backdrop-blur-xl rounded-xl shadow-lg p-4 z-50"
                    >
                      {/* USER CARD */}
                      <UserComponent user={user} />

                      <div className="h-px bg-white/10 my-3"></div>

                      <Link
                        to="/myorders"
                        className="block text-white/80 hover:text-white py-1"
                      >
                        My Orders
                      </Link>

                      <button
                        onClick={logout}
                        className="w-full text-left text-white/80 hover:text-white py-1"
                      >
                        <LogOut size={16} className="inline mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 border-t border-white/10 backdrop-blur-xl py-4"
          >
            <ul className="space-y-4 px-6 text-white/80">

              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {!token ? (
                <>
                  <li onClick={() => { setShowLoginModal(true); setMenuOpen(false); }}>Login</li>
                  <li onClick={() => { setShowRegisterModal(true); setMenuOpen(false); }}>Register</li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/myorders" onClick={() => setMenuOpen(false)}>
                      Orders
                    </Link>
                  </li>
                  <li onClick={() => { logout(); setMenuOpen(false); }}>Logout</li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </motion.header>

      {/* MODALS */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      {showRegisterModal && <RegisterModal onClose={() => setShowRegisterModal(false)} />}
    </>
  );
};

export default Navbar;
