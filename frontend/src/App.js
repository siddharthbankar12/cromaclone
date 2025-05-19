import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import CreateAccount from "./pages/CreateAccount";
import AddProduct from "./pages/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { login, setLocation } from "./store/userSlice";
import AddedProducts from "./pages/AddedProducts";
import AllProducts from "./pages/AllProducts";
import axiosInstance from "./utils/axiosConfig";
import SingleProduct from "./pages/SingleProduct";
import axios from "axios";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import Footer from "./components/Footer";
import ManageProducts from "./pages/ManageProducts";
import AboutUs from "./pages/AboutUs";
import ManageUsers from "./pages/ManageUsers";
import ManageSellers from "./pages/ManageSellers";
import WishList from "./pages/WishList";
import TrackOrders from "./pages/TrackOrders";
import { FaArrowUp } from "react-icons/fa";
import "./style/index.css";
import ScrollToTop from "./components/ScrollToTop";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Disclaimer from "./components/Disclaimer";
import TermsOfUse from "./components/TermsOfUse";
import BuyingGuide from "./components/BuyingGuide";
import HelpSupport from "./components/HelpSupport";
import serverSocket from "./utils/serverSocket.js";
import ManageContactRequest from "./pages/ManageContactRequest.jsx";
import Notification from "./pages/Notification.jsx";

const App = () => {
  const userData = useSelector((state) => state.user.user);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  serverSocket();
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

  const getUserLocation = async () => {
    try {
      const response = await axios.get("https://ipinfo.io?d66a8f0420021a");
      const { city, postal } = response.data;

      const locationData = {
        userCity: city,
        postalCode: postal,
      };

      dispatch(setLocation(locationData));
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    if (!userData) {
      getCurrentUserData();
    }
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollPosition / windowHeight) * 100;

      if (scrollPercent > 20) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="superApp">
      <ScrollToTop />
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
          <Route path="/seller/notifications" element={<Notification />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route
            path="/all-products/single-product/:id"
            element={<SingleProduct />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/admin/manage-products" element={<ManageProducts />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-sellers" element={<ManageSellers />} />
          <Route path="/admin/track-orders" element={<TrackOrders />} />
          <Route
            path="/admin/manage-contact-requests"
            element={<ManageContactRequest />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/buying-guide" element={<BuyingGuide />} />
          <Route path="/help-and-support" element={<HelpSupport />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      <Footer />

      {showScrollTop && (
        <div
          className="TopWindowArrow"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default App;
