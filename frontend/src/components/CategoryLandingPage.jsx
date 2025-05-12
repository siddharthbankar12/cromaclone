import React, { useState } from "react";
import { mergedData } from "../utils/data";
import "../style/LandingPage.css";
import { useNavigate } from "react-router-dom";

const CategoryLandingPage = () => {
  const [curIndex, setCurIndex] = useState(0);
  const route = useNavigate();

  const getImagesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) return 10;
    if (width >= 992) return 9;
    if (width >= 768) return 8;
    if (width >= 576) return 6;
    return 5;
  };

  const [imagesToShow, setImagesToShow] = useState(getImagesToShow());

  React.useEffect(() => {
    const handleResize = () => {
      setImagesToShow(getImagesToShow());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imagesToMove = 2;

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
  return (
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
  );
};

export default CategoryLandingPage;
