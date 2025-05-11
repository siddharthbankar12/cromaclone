import React from "react";
import "../style/AboutUs.css";
import {
  FaShoppingCart,
  FaUserShield,
  FaLaptopCode,
  FaServer,
  FaUsers,
} from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="aboutus-croma-wrapper">
      <div className="aboutus-croma-hero">
        <h1>Welcome to Croma Clone</h1>
        <p>Your one-stop shop for electronics and more!</p>
      </div>

      <div className="aboutus-croma-section aboutus-croma-mission">
        <h2>Our Mission</h2>
        <p>
          We aim to provide a seamless online shopping experience, mimicking the
          real Croma platform with core features like user management, cart
          system, and real-time updates.
        </p>
      </div>

      <div className="aboutus-croma-section aboutus-croma-roles">
        <h2>Roles and Functionalities</h2>
        <div className="aboutus-croma-role-cards">
          <div className="aboutus-croma-role-card">
            <FaUsers className="aboutus-croma-role-icon" />
            <h3>User</h3>
            <ul>
              <li>Add to cart & Buy Now</li>
              <li>Order History</li>
              <li>Wishlist</li>
              <li>Profile Management</li>
            </ul>
          </div>

          <div className="aboutus-croma-role-card">
            <FaLaptopCode className="aboutus-croma-role-icon" />
            <h3>Seller</h3>
            <ul>
              <li>Add Products</li>
              <li>Manage Listings</li>
              <li>Track Orders</li>
            </ul>
          </div>

          <div className="aboutus-croma-role-card">
            <FaUserShield className="aboutus-croma-role-icon" />
            <h3>Admin</h3>
            <ul>
              <li>Manage Products</li>
              <li>Monitor Users & Sellers</li>
              <li>Track Orders</li>
              <li>Dashboard Overview</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="aboutus-croma-section aboutus-croma-tech">
        <h2>Technologies Used</h2>
        <ul>
          <li>React.js & Redux for Frontend</li>
          <li>Node.js & Express.js for Backend</li>
          <li>MongoDB for Database</li>
          <li>Socket.io for Real-Time Features</li>
          <li>HTML, CSS, JavaScript for UI</li>
        </ul>
      </div>

      <div className="aboutus-croma-section aboutus-croma-author">
        <h2>Developer Info</h2>
        <p>
          <strong>Name:</strong> Siddharth Bankar
        </p>
        <p>
          <strong>Role:</strong> Full Stack Developer
        </p>
      </div>
      <div className="aboutus-croma-contact">
        <h2>Contact Me</h2>
        <div className="contact-details">
          <div className="contact-item">
            <a
              href="https://www.linkedin.com/in/siddharth-bankar-561a50236/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>
          <div className="contact-item">
            <a href="mailto:siddharthbankar1204@gmail.com">
              <i className="fa-solid fa-envelope"></i>
              Email
            </a>
          </div>
          <div className="contact-item">
            <a
              href="https://github.com/siddharthbankar12"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
