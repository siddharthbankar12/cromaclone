import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import CreateAccount from "./pages/CreateAccount";
import AddProduct from "./pages/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./store/userSlice";

const App = () => {
  const userData = useSelector((state) => state.user.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  async function getCurrentUserData(token) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/get-current-user",
        { token }
      );

      if (response.data.success) {
        dispatch(login(response.data.userData));
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!userData) {
      const token = localStorage.getItem("token");
      if (token) {
        getCurrentUserData(JSON.parse(token));
      }
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
        </Routes>
      </div>
    </>
  );
};

export default App;
