import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Name from "../Name";
import {
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  LogOut
} from "lucide-react";

const Navbar = ({ setShowLogin, token, setToken }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);


  const navItems = [
    { label: "Home", to: "/" },
    { label: "Shirts", to: "/shirts" },
    { label: "Pants", to: "/pants" },
    { label: "T-Shirts", to: "/tshirts" },
    { label: "New Arrivals", to: "/new" },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 select-none">
          <div className="leading-none">
            <h1 className="text-white text-xl font-semibold tracking-wide">
              <Name />
            </h1>
            <p className="text-xs text-white/60 tracking-wide">
              Minimal Fashion
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <motion.li
              key={item.label}
              whileHover={{ scale: 1.05, y: -3 }}
              onClick={() => setActive(item.label)}
            >
              <Link
                to={item.to}
                className={`relative text-sm tracking-wide ${active === item.label
                  ? "text-white"
                  : "text-white/70 hover:text-white"
                  }`}
              >
                {item.label}

                {active === item.label && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"
                  />
                )}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <motion.button whileHover={{ scale: 1.2 }}>
            <Search size={20} className="text-white/80" />
          </motion.button>

          <motion.div whileHover={{ scale: 1.15 }} className="relative">
            <Link to="/cart">
              <ShoppingBag size={22} className="text-white/90" />
            </Link>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-indigo-400 rounded-full" />
          </motion.div>

          {token ? (
            <div className="relative hidden md:block">
              <motion.button
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                whileHover={{ scale: 1.15 }}
              >
                <User size={22} className="text-white/90" />
              </motion.button>

              <ul
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className={`
        absolute right-0 mt-3 w-40 bg-black/90 border border-white/10 shadow-xl rounded-xl
        transition-all duration-200 backdrop-blur-xl
        ${open ? "opacity-100 translate-y-0" : "opacity-0 pointer-events-none -translate-y-2"}
      `}
              >
                <li className="px-4 py-2 text-white/80 hover:bg-white/10 cursor-pointer">
                  <Link to="/myorders">Orders</Link>
                </li>

                <li
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-2 text-white/80 hover:bg-white/10 cursor-pointer"
                >
                  <LogOut size={18} /> Logout
                </li>
              </ul>
            </div>
          ) : (
            <button>Login</button>
          )}


          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {
        menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 border-t border-white/10 backdrop-blur-xl"
          >
            <ul className="
  absolute right-0 mt-3 w-40 bg-black/90 border border-white/10 shadow-xl rounded-xl 
  opacity-0 group-hover:opacity-100 
  transition-opacity duration-300 ease-in-out 
  pointer-events-none group-hover:pointer-events-auto
  delay-150
">

              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    onClick={() => {
                      setActive(item.label);
                      setMenuOpen(false);
                    }}
                    className="text-white/80 hover:text-white text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {token ? (
                <li
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="text-white/80 hover:text-white cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                <li
                  onClick={() => {
                    setShowLogin(true);
                    setMenuOpen(false);
                  }}
                  className="text-white/80 hover:text-white cursor-pointer"
                >
                  Login
                </li>
              )}
            </ul>
          </motion.div>
        )
      }
    </motion.header >
  );
};

export default Navbar;
