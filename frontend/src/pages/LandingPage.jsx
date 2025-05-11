import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LandingPage.css";
import { mergedData, imagesSlider } from "../utils/data";

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [curIndex, setCurIndex] = useState(0);
  const route = useNavigate();

  const imagesToShow = 10;
  const imagesToMove = 2;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSlider.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    if (
      curIndex + imagesToMove <=
      mergedData.categories.length - imagesToShow
    ) {
      setCurIndex(curIndex + imagesToMove);
    } else {
      setCurIndex(0);
    }
  };

  const prevImage = () => {
    if (curIndex - imagesToMove >= 0) {
      setCurIndex(curIndex - imagesToMove);
    } else {
      setCurIndex(mergedData.categories.length - imagesToShow);
    }
  };

  const offset = -(curIndex * (100 / imagesToShow));

  useEffect(() => {
    const logoContainer = document.querySelector(".brand-container");
    const logos = document.querySelectorAll(".brand-images");
    const logosToShow = 5;
    const logosToMove = 2;
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
  }, []);

  return (
    <div className="croma">
      <div className="imageSlider">
        {imagesSlider.map((imgSrc, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <img src={imgSrc} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="category">
        <button className="prev" onClick={prevImage}>
          &#10094;
        </button>

        <div className="imageWindow">
          <div
            className="category-container"
            style={{ transform: `translateX(${offset}%)` }}
          >
            {mergedData.categories.map((src, index) => (
              <div
                key={index}
                className="category-images"
                style={{ flex: `0 0 ${100 / imagesToShow}%` }}
                onClick={() => {
                  route(`/all-products?category=${src.name.trim()}`);
                }}
              >
                <img src={src.image} alt={src.name} />
              </div>
            ))}
          </div>
        </div>

        <button className="next" onClick={nextImage}>
          &#10095;
        </button>
      </div>

      <div className="bank-offers">
        <p>Exciting Bank Offers For You</p>
        <div className="offer-images">
          <img src="./assets/bank_offers/neu_offers_desk_tkq4lf.jpg" alt="" />
          <img
            src="./assets/bank_offers/HP_2Split_MFYMP_Brands_HDFC_ICIC_30May2024_kzbaou.jpg"
            alt=""
          />
          <img
            src="./assets/bank_offers/HP_2Split_MFYMP_1500_30July2024_sxfs6y.jpg"
            alt=""
          />
          <img
            src="./assets/bank_offers/HP_2Split_MFYMP_Tue-BOB2_28June2024_nx4jqe.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="new-favourites">
        <p>Our New Favourites</p>
        <div className="fav-images">
          <div className="ofv">
            <img
              src="./assets/new_favourites/HP_2Split_SOH_Exchange_13Dec2024_kfuopd.jpg"
              alt=""
            />
          </div>
          <div className="tfv">
            <img
              src="./assets/new_favourites/HP_2Split_SOH_Winter_13Dec2024_cw4pe0.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="fav-images">
          <img
            src="./assets/new_favourites/HP_SingleSplit_13R_13Jan2025_rroxr9.jpg"
            alt=""
          />
        </div>
        <div className="fav-images">
          <img
            src="./assets/new_favourites/HP_SingleSplit_JBLBeam3_13Jan2025_pxlh9h.jpg"
            alt=""
          />
        </div>
        <div className="fav-images"></div>
      </div>

      <div className="whats-hot">
        <p>What’s Hot</p>
        <div className="hot-images">
          <img
            src="./assets/whats_hot/HP_Whats_Hot_ACs_13Jan2025_a2hphd.jpg"
            alt=""
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_Laptops_13Jan2025_agf06d.jpg"
            alt=""
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_Ref_13Jan2025_ckquqt.jpg"
            alt=""
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_TV_13Jan2025_tzbq8z.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="repairing-appliances">
        <p>No More Worrying About Your Appliances</p>
        <img src="./assets/repairing/D_zipcare_njguxg.png" alt="" />
      </div>

      <div className="exclusively-curated">
        <p>Exclusively Curated For You</p>
        <div className="curated-images">
          <img
            src="./assets/curated_iamges/Croma_Collections_aer8cq.png"
            alt=""
          />

          <img src="./assets/curated_iamges/03_30_fhwssf.png" alt="" />

          <img src="./assets/curated_iamges/01_50_sa0hk3.png" alt="" />

          <img src="./assets/curated_iamges/02_17_epxyzy.png" alt="" />

          <img
            src="./assets/curated_iamges/E-waste_disposal_-_Desktop_wewkot.png"
            alt=""
          />

          <img
            src="./assets/curated_iamges/Deals_of_the_week_-_Desktop_cdvjjx.png"
            alt=""
          />
        </div>
      </div>

      <div className="why-croma">
        <p>Why Croma?</p>
        <img src="./assets/why_croma/Why-Croma_t2lgxr.png" alt="" />
      </div>

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
    </div>
  );
};

export default LandingPage;
