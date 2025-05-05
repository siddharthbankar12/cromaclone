import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterPage from "./LoginRegister";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const route = useNavigate();
  const sidebarRef = useRef(null);
  const userData = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.user.cartCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useSelector((state) => state.user.location);

  const LoginRegister = () => {
    if (userData) {
      route("/user-profile");
    } else {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const UserCart = () => {
    route("/cart");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="navbar">
      <div className="containerNav">
        <div className="left-nav">
          <div
            className="menu-hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span
              className="material-symbols-outlined"
              aria-label="Menu Toggle"
            >
              {isSidebarOpen ? "close" : "menu"}
            </span>
            <p>{isSidebarOpen ? "Menu" : "Menu"}</p>
          </div>

          <div
            className="croma-logo"
            onClick={() => {
              route("/");
            }}
          >
            <img src="/assets/croma_logo/Croma_Logo.svg" alt="Croma Logo" />
          </div>

          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="menu-bar"
          >
            <span
              className="material-symbols-outlined"
              aria-label="Menu Toggle"
            >
              {isSidebarOpen ? "close" : "menu"}
            </span>
            <p>{isSidebarOpen ? "Menu" : "Menu"}</p>
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
              {location.userCity}, {location.postalCode}
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

          <div className="cart" onClick={UserCart}>
            <p className="cart-count-nav">{cartCount}</p>
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

      {isSidebarOpen && (
        <div className="sidebar-modal" ref={sidebarRef}>
          <SideBar setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
