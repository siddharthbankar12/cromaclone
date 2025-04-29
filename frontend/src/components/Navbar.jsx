import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterPage from "./LoginRegister";
import axios from "axios";

const Navbar = () => {
  const route = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userLocation, setUserLocation] = useState({
    userCity: "",
    postalCode: "",
  });
  const token = localStorage.getItem("token");

  const LoginRegister = () => {
    if (token) {
      route("/user-profile");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getUserLocation = async () => {
    try {
      const response = await axios.get("https://ipinfo.io?d66a8f0420021a");
      const { city, postal } = response.data;
      setUserLocation((prevState) => ({
        ...prevState,
        userCity: city,
        postalCode: postal,
      }));
    } catch (error) {
      console.error("Error fetching user location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="navbar">
      <div className="containerNav">
        <div className="left-nav">
          <div className="menu-hidden">
            <span className="material-symbols-outlined" aria-label="Menu">
              menu
            </span>
          </div>
          <div
            className="croma-logo"
            onClick={() => {
              route("/");
            }}
          >
            <img src="/assets/croma_logo/Croma_Logo.svg" alt="Croma Logo" />
          </div>
          <div className="menu-bar">
            <span className="material-symbols-outlined" aria-label="Menu">
              menu
            </span>
            <p>Menu</p>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="What are you looking for ?"
              aria-label="Search"
            />
            <span className="material-symbols-outlined" aria-label="Search">
              search
            </span>
          </div>
        </div>

        <div className="right-nav">
          <div className="location">
            <span className="material-symbols-outlined" aria-label="Location">
              location_on
            </span>
            <p>
              {userLocation.userCity}, {userLocation.postalCode}
            </p>

            <span
              className="material-symbols-outlined"
              aria-label="Edit Location"
            >
              edit
            </span>
          </div>
          <div className="profile" onClick={LoginRegister}>
            <span className="material-symbols-outlined" aria-label="Profile">
              person
            </span>
          </div>
          <div className="cart">
            <span className="material-symbols-outlined" aria-label="Cart">
              shopping_cart
            </span>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <LoginRegisterPage closeModal={closeModal} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
