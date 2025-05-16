import React, { useEffect, useState } from "react";
import "../style/LandingPage.css";
import { imagesSlider } from "../utils/data";
import CategoryLandingPage from "../components/CategoryLandingPage";
import LogoLandingPage from "../components/LogoLandingPage";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSlider.length);
    }, 5000);

    return () => clearInterval(interval);
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

      <CategoryLandingPage />

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
              onClick={() => {
                route("/all-products");
              }}
            />
          </div>
          <div className="tfv">
            <img
              src="./assets/new_favourites/HP_2Split_SOH_Winter_13Dec2024_cw4pe0.jpg"
              alt=""
              onClick={() => {
                route("/all-products");
              }}
            />
          </div>
        </div>
        <div className="fav-images">
          <img
            src="./assets/new_favourites/HP_SingleSplit_13R_13Jan2025_rroxr9.jpg"
            alt=""
            onClick={() => {
              route("/all-products?category=Mobiles&brand=OnePlus");
            }}
          />
        </div>
        <div className="fav-images">
          <img
            src="./assets/new_favourites/HP_SingleSplit_JBLBeam3_13Jan2025_pxlh9h.jpg"
            alt=""
            onClick={() => {
              route(
                "/all-products?category=Headphones+%26+Earphones&brand=JBL"
              );
            }}
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
            onClick={() => {
              route("/all-products?category=Air%20Conditioners");
            }}
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_Laptops_13Jan2025_agf06d.jpg"
            alt=""
            onClick={() => {
              route("/all-products?category=Laptops");
            }}
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_Ref_13Jan2025_ckquqt.jpg"
            alt=""
            onClick={() => {
              route("/all-products?category=refrigerator");
            }}
          />
          <img
            src="./assets/whats_hot/HP_Whats_Hot_TV_13Jan2025_tzbq8z.jpg"
            alt=""
            onClick={() => {
              route("/all-products?category=Television");
            }}
          />
        </div>
      </div>

      <div className="repairing-appliances">
        <p>No More Worrying About Your Appliances</p>
        <img
          src="./assets/repairing/D_zipcare_njguxg.png"
          alt=""
          onClick={() => {
            route("/all-products");
          }}
        />
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

      <LogoLandingPage />
    </div>
  );
};

export default LandingPage;
