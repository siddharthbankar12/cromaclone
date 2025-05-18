import React from "react";
import "../style/SideBar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";
import { logout } from "../store/userSlice";

const SideBar = ({ setIsSidebarOpen }) => {
  const route = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);

  const handleClick = (path) => {
    route(path);
    setIsSidebarOpen(false);
  };

  const handleUserClick = (path) => {
    if (!userData) {
      toast.warn("Please log in first to access this page.");
    } else if (userData.role === "user") {
      route(path);
      setIsSidebarOpen(false);
    } else {
      toast.error("You do not have access to this page.");
    }
  };

  const logOutUser = async () => {
    try {
      const response = await axiosInstance.put("/auth/logout");
      if (response.data.success) {
        dispatch(logout());
        toast.success(response.data.message);
        route("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error);
    }
    setIsSidebarOpen(false);
  };

  return (
    <div className="sidebar">
      <ul className="btns">
        <li onClick={() => handleClick("/all-products")}>All Products</li>
        {(!userData || userData.role === "user") && (
          <>
            <li onClick={() => handleUserClick("/cart")}>Cart</li>
            <li onClick={() => handleUserClick("/wishlist")}>My Wishlist</li>
            <li onClick={() => handleUserClick("/order-history")}>
              Order History
            </li>
          </>
        )}

        {userData?.role === "seller" && (
          <>
            <li onClick={() => handleClick("/seller/add-product")}>
              Add Product
            </li>
            <li onClick={() => handleClick("/seller/added-products")}>
              Added Products
            </li>
          </>
        )}

        {userData?.role === "admin" && (
          <>
            <li onClick={() => handleClick("/admin/manage-products")}>
              Manage Products
            </li>
            <li onClick={() => handleClick("/admin/manage-users")}>
              Manage Users
            </li>
            <li onClick={() => handleClick("/admin/manage-sellers")}>
              Manage Sellers
            </li>
            <li onClick={() => handleClick("/admin/track-orders")}>
              Track Orders
            </li>
          </>
        )}
        <li onClick={() => handleClick("/buying-guide")}>Buying Guide</li>
        <li onClick={() => handleClick("/help-and-support")}>Help & Support</li>
        <li onClick={() => handleClick("/privacy-policy")}>Privacy Policy</li>
        <li onClick={() => handleClick("/about-us")}>About us</li>
        {userData?.role && <li onClick={logOutUser}>Logout</li>}
      </ul>
    </div>
  );
};

export default SideBar;
