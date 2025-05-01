import React, { useEffect } from "react";
import "../style/SideBar.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SideBar = ({ setIsSidebarOpen }) => {
  const route = useNavigate();
  const userData = useSelector((state) => state.user.user);
  const tokenFromLS = localStorage.getItem("token");

  const handleClick = (path) => {
    route(path);
    setIsSidebarOpen(false);
  };

  const LogOutBtn = () => {
    localStorage.removeItem("token");
    setIsSidebarOpen(false);
    toast.success("Logout Successful");
    route("/");
  };

  return (
    <div className="sidebar">
      <ul className="btns">
        <li onClick={() => handleClick("/all-products")}>All Products</li>
        {tokenFromLS && userData?.role === "seller" && (
          <>
            {" "}
            <li onClick={() => handleClick("/seller/add-product")}>
              Add Product
            </li>
            <li onClick={() => handleClick("/seller/added-products")}>
              Added Products
            </li>
          </>
        )}

        {tokenFromLS && userData?.role === "user" && (
          <>
            <li onClick={() => setIsSidebarOpen(false)}>Order History</li>
          </>
        )}

        {tokenFromLS && <li onClick={LogOutBtn}>Logout</li>}
      </ul>
    </div>
  );
};

export default SideBar;
