import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Categories from "./pages/Categories";
import SubCategories from "./pages/SubCategories";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

const ProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin);
  return admin.isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="categories" element={<Categories />} />
          <Route path="subcategories" element={<SubCategories />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

