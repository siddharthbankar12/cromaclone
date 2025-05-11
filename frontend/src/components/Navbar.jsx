import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginRegisterPage from "./LoginRegister";
import SideBar from "./SideBar";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Navbar = ({ setIsSidebarOpen, isSidebarOpen }) => {
  const route = useNavigate();
  const sidebarRef = useRef(null);
  const userData = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.user.cartCount);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useSelector((state) => state.user.location);
  const [searchTerm, setSearchTerm] = useState("");

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const LoginRegister = () => {
    if (userData) {
      route("/user-profile");
    } else {
      setIsModalOpen(true);
    }
  };

  const UserCart = () => {
    if (userData?.role === "admin" || userData?.role === "seller") {
      toast.error("You do not have access to this page.");
    } else if (userData?.role === "user") {
      route("/cart");
    } else {
      toast.warn("Please log in first to access this page.");
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      route(`/all-products?search=${searchTerm.trim()}`);

      setSearchTerm("");
    } else {
      toast.warn("Please type something");
    }
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
          {!isSidebarOpen && (
            <div onClick={() => setIsSidebarOpen(true)} className="menu-hidden">
              <span
                className="material-symbols-outlined"
                aria-label="Menu Toggle"
              >
                menu
              </span>
            </div>
          )}
          {isSidebarOpen && (
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="menu-hidden"
            >
              <span
                className="material-symbols-outlined"
                aria-label="Menu Toggle"
              >
                close
              </span>
            </div>
          )}

          <div
            className="croma-logo"
            onClick={() => {
              route("/");
            }}
          >
            <img src="/assets/croma_logo/Croma_Logo.svg" alt="Croma Logo" />
          </div>

          {!isSidebarOpen && (
            <div onClick={() => setIsSidebarOpen(true)} className="menu-bar">
              <span
                className="material-symbols-outlined"
                aria-label="Menu Toggle"
              >
                menu
              </span>
              <p>Menu</p>
            </div>
          )}
          {isSidebarOpen && (
            <div onClick={() => setIsSidebarOpen(false)} className="menu-bar">
              <span
                className="material-symbols-outlined"
                aria-label="Menu Toggle"
              >
                close
              </span>
              <p>Close</p>
            </div>
          )}

          <div className="search-bar">
            <input
              type="text"
              placeholder="What are you looking for ?"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  setSearchTerm(value.charAt(0).toUpperCase() + value.slice(1));
                } else {
                  setSearchTerm(value);
                }
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <span
              className="material-symbols-outlined"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onClick={handleSearch}
            >
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
              {location?.userCity || "Unknown City"},{" "}
              {location?.postalCode || "000000"}
            </p>

            {/* <span
              className="material-symbols-outlined"
              aria-label="Edit Location"
              onClick={() => {
                route("/user-profile");
              }}
            >
              edit
            </span> */}
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
