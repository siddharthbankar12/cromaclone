import React from "react";
import "../style/LandingPage.css";
import { mergedData } from "../utils/data";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";

const Footer = () => {
  const route = useNavigate();

  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="usefulLinks">
            <p className="changeHead">Useful Links</p>
            <div className="twoSection">
              <p
                onClick={() => {
                  route("/about-us");
                }}
              >
                About Croma
              </p>
              <p
                onClick={() => {
                  route("/help-and-support");
                }}
              >
                Help And Support
              </p>

              <p
                onClick={() => {
                  route("/buying-guide");
                }}
              >
                Buying Guide
              </p>

              <p
                onClick={() => {
                  route("/terms-of-use");
                }}
              >
                Terms of Use
              </p>
              <p
                onClick={() => {
                  route("/disclaimer");
                }}
              >
                Disclaimer
              </p>
              <p
                onClick={() => {
                  route("/privacy-policy");
                }}
              >
                Privacy Policy
              </p>
            </div>
          </div>

          <div className="productLinks">
            <p className="changeHead">Products</p>
            <div className="twoSection">
              {mergedData.categories.map((src, index) => (
                <p
                  key={index}
                  onClick={() => {
                    route(`/all-products?category=${src.name.trim()}`);
                  }}
                >
                  {src.name}
                </p>
              ))}
              {/* <p>Televisions & Accessories</p>
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
              <p>Personal Care</p> */}
            </div>
          </div>
          <ContactForm />
        </div>
        <div className="footer-bottom">
          <div className="fb-left">
            <p>© Copyright 2025 Croma Clone by Siddharth Bankar.</p>
            <p>All rights reserved</p>
          </div>
          <div className="fb-right">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
