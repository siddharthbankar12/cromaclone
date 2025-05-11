import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/WishList.css";
import { useNavigate } from "react-router-dom";

const WishList = () => {
  const userData = useSelector((state) => state.user.user);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useNavigate();

  const getWishlistProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `/user/get-wishList/${userData?._id}`
      );
      setWishlist(response.data.wishlist.products || []);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getWishlistProducts();
    }
  }, [userData]);

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">My Wishlist</h2>
      {loading ? (
        <div className="loader"></div>
      ) : wishlist.length === 0 ? (
        <p className="wishlist-empty">Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-flex">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="wishlist-card"
              onClick={() =>
                route(`/all-products/single-product/${product._id}`)
              }
            >
              <img
                src={product.image}
                alt={product.name}
                className="wishlist-image"
                loading="lazy"
              />
              <h3 className="wishlist-name">{product.name}</h3>
              <p className="wishlist-category">{product.category}</p>

              <div className="wishlist-price-block">
                <span className="wishlist-price">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="wishlist-original-price">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
              </div>
              {product.discountPercentage && (
                <p className="wishlist-discount">
                  {product.discountPercentage}% off
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishList;
