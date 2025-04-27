import React, { useEffect, useState } from "react";
import "../style/LandingPage.css";
import Footer from "../components/Footer";

const LandingPage = () => {
  const imagesSlider = [
    "/assets/imageSlider_landingPage/1.jpg",
    "/assets/imageSlider_landingPage/2.jpg",
    "/assets/imageSlider_landingPage/3.jpg",
    "/assets/imageSlider_landingPage/4.jpg",
    "/assets/imageSlider_landingPage/5.jpg",
    "/assets/imageSlider_landingPage/6.jpg",
    "/assets/imageSlider_landingPage/7.jpg",
    "/assets/imageSlider_landingPage/8.jpg",
  ];

  const imagesCategory = [
    "/assets/category_images/Accessories_kefony.png",
    "/assets/category_images/Air_Conditioner_a4hg1z.png",
    "/assets/category_images/Cameras_a6n2jy.png",
    "/assets/category_images/D_Geyser_i5frr1.png",
    "assets/category_images/Fans_ecnoxj.png",
    "/assets/category_images/Grooming_vvxudd.png",
    "/assets/category_images/Head_set_xjj934.png",
    "/assets/category_images/Home_theatres_kpwvft.png",
    "/assets/category_images/Kitchen_Appliances_yhzevo.png",
    "/assets/category_images/Laptops_pzewpv.png",
    "/assets/category_images/LP_Cooler_ak2tjf.png",
    "/assets/category_images/Microwaves_otd6qq.png",
    "/assets/category_images/Mobile_sdtrdf.png",
    "/assets/category_images/Ref_biysg7.png",
    "/assets/category_images/Speaker_g2mbgn.png",
    "/assets/category_images/Tablets_yzod4f.png",
    "/assets/category_images/TV_vdemgc.png",
    "/assets/category_images/Washing_machines_izyrnd.png",
    "/assets/category_images/Water_Purifiers_Desktop_phji31.png",
    "/assets/category_images/Wearables_iunu7h.png",
  ];

  const imagesToShow = 10;
  const imagesToMove = 2;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesSlider.length);
    }, 5000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const nextImage = () => {
    if (curIndex + imagesToMove <= imagesCategory.length - imagesToShow) {
      setCurIndex(curIndex + imagesToMove);
    } else {
      setCurIndex(0);
    }
  };

  const prevImage = () => {
    if (curIndex - imagesToMove >= 0) {
      setCurIndex(curIndex - imagesToMove);
    } else {
      setCurIndex(imagesCategory.length - imagesToShow);
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
            {imagesCategory.map((src, index) => (
              <div
                key={index}
                className="category-images"
                style={{ flex: `0 0 ${100 / imagesToShow}%` }}
              >
                <img src={src} alt={`category ${index}`} />
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
            {[
              "1_maspxu",
              "2_bki1il",
              "3_voajbz",
              "4_wmg1qj",
              "1_maspxu",
              "5_pjm9wd",
              "6_cruwwo",
              "7_uvvozm",
              "8_dvwyxd",
              "9_rqohp4",
              "10_iobxyi",
              "11_tc1idk",
              "12_hfsle3",
            ].map((logo, index) => (
              <div className="brand-images" key={index}>
                <img
                  src={`./assets/brand_logos/${logo}.png`}
                  alt={`Logo ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="nextLogo" onClick={() => window.nextLogo()}>
          &#10095;
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
