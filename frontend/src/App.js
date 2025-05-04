import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import CreateAccount from "./pages/CreateAccount";
import AddProduct from "./pages/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./store/userSlice";
import AddedProducts from "./pages/AddedProducts";
import AllProducts from "./pages/AllProducts";
import axiosInstance from "./axiosConfig";
import SingleProduct from "./pages/SingleProduct";

const App = () => {
  const userData = useSelector((state) => state.user.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  async function getCurrentUserData() {
    try {
      const response = await axiosInstance.post("/auth/get-current-user");

      if (response.data.success) {
        dispatch(login(response.data.userData));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!userData) {
      getCurrentUserData();
    }
  }, [userData]);

  return (
    <>
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        isSidebarOpen={isSidebarOpen}
      />

      <div className={`main-content ${isSidebarOpen ? "blurred" : ""}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/croma/create-account" element={<CreateAccount />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path="/seller/added-products" element={<AddedProducts />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route
            path="/all-products/single-product/:id"
            element={<SingleProduct />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
