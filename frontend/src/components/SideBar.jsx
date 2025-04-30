import React from "react";
import "../style/SideBar.css";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const route = useNavigate();
  return (
    <div className="sidebar">
      <ul className="btns">
        <li
          onClick={() => {
            route("/seller/add-product");
          }}
        >
          Add Product
        </li>
        <li>Added Product</li>
        <li>All Products</li>
        <li>Order History</li>
        <li>LogOut</li>
      </ul>
    </div>
  );
};

export default SideBar;
