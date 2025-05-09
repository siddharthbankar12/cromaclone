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
  };

  return (
    <div className="sidebar">
      <ul className="btns">
        <li onClick={() => handleClick("/all-products")}>All Products</li>
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

        {userData?.role === "user" && (
          <>
            <li onClick={() => handleClick("/order-history")}>Order History</li>
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
          </>
        )}
        <li onClick={() => handleClick("/about-us")}>About us</li>
        {userData?.role && <li onClick={logOutUser}>Logout</li>}
      </ul>
    </div>
  );
};

export default SideBar;
