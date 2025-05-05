import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/SingleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartButtonDisable, setCartButtonDisable] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const location = useSelector((state) => state.user.location);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) getSingleProductData();
  }, [id]);

  const getSingleProductData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        "/product/single-product-data",
        {
          productId: id,
        }
      );
      if (response.data.success) {
        setSingleProduct(response.data.productData);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async () => {
    try {
      setCartButtonDisable(true);
      if (!userData?.userId) {
        setCartButtonDisable(false);
        return toast.error("Please login to add product to cart");
      }

      if (userData?.role !== "user") {
        return toast.error("You don't have access cart option");
      }

      const response = await axiosInstance.post("/user/add-to-cart", {
        productId: id,
        userId: userData.userId,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    } finally {
      setCartButtonDisable(false);
    }
  };

  console.log(userData);

  if (loading) return <p>Loading...</p>;
  if (!singleProduct) return <p>No product found.</p>;

  return (
    <div className="mainSingle">
      <div className="single-product">
        <div className="path">
          <p>{singleProduct.category}</p>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
          <p>{singleProduct.brand}</p>
          <span className="material-symbols-outlined">arrow_forward_ios</span>
          <p>{singleProduct.name}</p>
        </div>

        <div className="product">
          <div className="main-container-single">
            <div className="product-images">
              <img src={singleProduct.image} alt={singleProduct.name} />
            </div>
            <div className="product-details">
              <div className="single-product-name">
                <p>{singleProduct.name}</p>
              </div>

              <div className="product-rating">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>

              <div className="product-amount">
                <div className="pa-top">
                  <div className="product-total-amount">
                    <p>₹ {singleProduct.price.toLocaleString("en-IN")}</p>
                    <p>(Incl. all Taxes)</p>
                  </div>
                  <div className="product-emi-amount">
                    <p>₹ {(singleProduct.price / 24).toFixed(0)}/mo*</p>
                    <a href="#">EMI Options</a>
                  </div>
                </div>
                <div className="product-saves-amount">
                  <p>
                    MRP ₹{(singleProduct.price + 5000).toLocaleString("en-IN")}
                  </p>
                  <p>(Save ₹5,000.00)</p>
                </div>
              </div>

              <div className="address">
                <div className="left-add">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div className="right-add">
                  <p>
                    Delivery at :{" "}
                    <span>
                      {location.userCity}, {location.postalCode}{" "}
                    </span>
                    .
                  </p>
                  <p>Will be delivered by 20 January 2025.</p>
                </div>
              </div>

              <div className="product-feature">
                <p>Brand Name : {singleProduct.brand}</p>
                <br />
                <p>Description</p>
                <ul>
                  {singleProduct.description?.split(",").map((desc, index) => (
                    <li key={index}>{desc.trim()}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {userData?.role === "user" && (
        <div className="buy-option">
          <div className="buy-container">
            <div className="left-side-buy">
              <div className="pro-img">
                <img src={singleProduct.image} alt={singleProduct.name} />
              </div>
              <div className="pro-detail">
                <p>{singleProduct.name}</p>
                <p>₹ {singleProduct.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <div className="right-side-buy">
              <button className="buy-button">Buy Now</button>
              <button
                className="addCart-button"
                onClick={addToCart}
                disabled={cartButtonDisable}
              >
                {cartButtonDisable ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
