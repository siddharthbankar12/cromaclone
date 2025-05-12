import React, { useEffect } from "react";
import { mergedData } from "../utils/data";
import "../style/LandingPage.css";
import { useNavigate } from "react-router-dom";

const LogoLandingPage = () => {
  const route = useNavigate();
  useEffect(() => {
    const logoContainer = document.querySelector(".brand-container");
    const logos = document.querySelectorAll(".brand-images");

    const getLogosToShow = () => {
      const width = window.innerWidth;
      if (width >= 1200) return 6;
      if (width >= 992) return 5;
      if (width >= 768) return 5;
      if (width >= 576) return 4;
      return 3;
    };

    let logosToShow = getLogosToShow();
    const logosToMove = 1;
    const logoWidth = 100 / logosToShow;
    let currentLogoIndex = 0;

    function updateLogoPosition() {
      const offset = -currentLogoIndex * logoWidth;
      logoContainer.style.transform = `translateX(${offset}%)`;
    }

    function nextLogo() {
      if (currentLogoIndex + logosToMove <= logos.length - logosToShow) {
        currentLogoIndex += logosToMove;
      } else {
        currentLogoIndex = logos.length - logosToShow;
      }
      updateLogoPosition();
    }

    function prevLogo() {
      if (currentLogoIndex - logosToMove >= 0) {
        currentLogoIndex -= logosToMove;
      } else {
        currentLogoIndex = 0;
      }
      updateLogoPosition();
    }

    logos.forEach((logo) => {
      logo.style.flex = `0 0 ${logoWidth}%`;
    });

    updateLogoPosition();

    window.nextLogo = nextLogo;
    window.prevLogo = prevLogo;

    const handleResize = () => {
      logosToShow = getLogosToShow();
      const newLogoWidth = 100 / logosToShow;
      logos.forEach((logo) => {
        logo.style.flex = `0 0 ${newLogoWidth}%`;
      });
      updateLogoPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="brands">
      <button className="prevLogo" onClick={() => window.prevLogo()}>
        &#10094;
      </button>

      <div className="logoWindow">
        <div className="brand-container">
          {mergedData.brands.slice(0, -1).map((logoPath, index) => (
            <div
              className="brand-images"
              key={index}
              onClick={() => {
                route(`/all-products?brand=${logoPath.name.trim()}`);
              }}
            >
              <img src={logoPath.logo} alt={logoPath.name} />
            </div>
          ))}
        </div>
      </div>

      <button className="nextLogo" onClick={() => window.nextLogo()}>
        &#10095;
      </button>
    </div>
  );
};

export default LogoLandingPage;
