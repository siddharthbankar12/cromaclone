import React from "react";
import "../style/LandingPage.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="usefulLinks">
            <p className="changeHead">Useful Links</p>
            <div className="twosection">
              <p>About Croma</p>
              <p>Help And Support</p>
              <p>FAQs</p>
              <p>Buying Guide</p>
              <p>Return Policy</p>
              <p>B2B Orders</p>
              <p>Store Locator</p>
              <p>E-Waste</p>
              <p>Franchise Opportunity</p>
              <p>Site Map</p>
              <p>Careers At Croma</p>
              <p>Terms of Use</p>
              <p>Disclaimer</p>
              <p>Privacy Policy</p>
              <p>Unboxed</p>
              <p>Gift Card</p>
              <p>Croma E-Star</p>
            </div>
          </div>

          <div className="productLinks">
            <p className="changeHead">Products</p>
            <div className="twosection">
              <p>Televisions & Accessories</p>
              <p>Home Appliances</p>
              <p>Phones & Wearables</p>
              <p>Computers & Tablets</p>
              <p>Kitchen Appliances</p>
              <p>Audio & Video</p>
              <p>Health & Fitness</p>
              <p>Cameras & Accessories</p>
              <p>Smart Devices</p>
              <p>Gaming</p>
              <p>Accessories</p>
              <p>Top Brands</p>
              <p>Personal Care</p>
            </div>
          </div>

          <form className="contact-form">
            <p className="changeHead">Connect with us</p>
            <div className="enter-email">
              <input type="text" placeholder="Enter Email ID" />
            </div>
            <div className="enter-message">
              <textarea type="text" placeholder="Enter your message"></textarea>
            </div>
            <button>Submit</button>
          </form>
        </div>
        <div className="footer-bottom">
          <div className="fb-left">
            <p>© Copyright 2025 Croma Clone by Siddharth Bankar.</p>
            <p>All rights reserved</p>
          </div>
          <div className="fb-right">
            <i className="fa-brands fa-linkedin-in"></i>
            <i className="fa-brands fa-youtube"></i>
            <i className="fa-brands fa-twitter"></i>
            <i className="fa-brands fa-facebook-f"></i>
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
