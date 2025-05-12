import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/SingleProduct.css";
import { MdFavorite } from "react-icons/md";

const SingleProduct = () => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cartButtonDisable, setCartButtonDisable] = useState(false);
  const userData = useSelector((state) => state.user.user);
  const location = useSelector((state) => state.user.location);
  const [wishListProducts, setWishListProducts] = useState([]);
  const isInWishlist = wishListProducts.includes(id);

  const route = useNavigate();

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

  const addToWishList = async (productId) => {
    try {
      const response = await axiosInstance.post("/user/update-wishlist", {
        userId: userData?._id,
        productId,
        action: "add",
      });

      if (response.data.success === true) {
        setWishListProducts((prev) => [...prev, productId]);
        toast.success("Product added to the wishlist");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishList = async (productId) => {
    try {
      const response = await axiosInstance.post("/user/update-wishlist", {
        userId: userData?._id,
        productId,
        action: "remove",
      });
      if (response.data.success === true) {
        setWishListProducts((prev) => prev.filter((id) => id !== productId));
        toast.success("Product removed from the wishlist");
      } else {
        toast.warn(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    if (userData?.role === "user") {
      console.log(userData);
      try {
        setCartButtonDisable(true);

        const response = await axiosInstance.post("/user/add-to-cart", {
          productId: id,
          userId: userData._id,
        });
        if (response.data.success) {
          toast.success(response.data.message);
          route("/cart");
        }
      } catch (error) {
        console.error("Add to cart error:", error);
      } finally {
        setCartButtonDisable(false);
      }
    } else if (userData?.role === "admin" || userData?.role === "seller") {
      return toast.warn("You don't have access add to cart option");
    } else {
      toast.warn("Please login first to add product to cart");
    }
  };

  const buyNow = async () => {
    if (userData?.role === "user") {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/user/buy-now", {
          userId: userData._id,
          product: singleProduct,
          userAddress: userData.address,
        });
        if (response.data.success) {
          toast.success(response.data.message);

          route("/order-history");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else if (userData?.role === "admin" || userData?.role === "seller") {
      return toast.warn("You don't have access buy option");
    } else {
      return toast.warn("Please login first to buy product");
    }
  };

  useEffect(() => {
    if (userData?.role) {
      const fetchWishlist = async () => {
        try {
          const res = await axiosInstance.get(
            `/user/get-wishlist/${userData?._id}`
          );

          const ids = res?.data?.wishlist?.products?.map((p) =>
            typeof p === "string" ? p : p._id
          );
          setWishListProducts(ids || []);
        } catch (err) {
          console.log("Error fetching wishlist", err);
        }
      };

      fetchWishlist();
    }
  }, [userData?.role]);

  if (loading) return <div className="loader"></div>;
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
                <p>{singleProduct.name}</p>{" "}
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
                    MRP ₹{singleProduct.originalPrice.toLocaleString("en-IN")}
                  </p>
                  <p>
                    (Save ₹
                    {(
                      singleProduct.originalPrice - singleProduct.price
                    ).toLocaleString("en-IN")}
                    )
                  </p>
                </div>
              </div>

              <div
                className="wishLiBt"
                onClick={() => {
                  isInWishlist
                    ? removeFromWishList(singleProduct._id)
                    : addToWishList(singleProduct._id);
                }}
              >
                <MdFavorite
                  className="wishListBtn"
                  color={isInWishlist ? "red" : "white"}
                />

                <p>
                  {" "}
                  {isInWishlist
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}{" "}
                </p>
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
            <button className="buy-button" onClick={buyNow}>
              Buy Now
            </button>
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
    </div>
  );
};

export default SingleProduct;
