import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import "../style/AddedProducts.css";

const AddedProducts = () => {
  const userData = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);

  const getAddedProducts = async () => {
    if (userData?.userId && userData.role === "seller") {
      try {
        const response = await axios.post(
          "http://localhost:8000/api/V1/product/added-products",
          { userId: userData.userId }
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        toast.error("Failed to fetch products.");
      }
    }
  };

  useEffect(() => {
    getAddedProducts();
    if (userData && userData?.role !== "seller") {
      toast.error("You don't have access for this page.");
    }
  }, [userData]);
  console.log(products);

  return (
    <div className="added-products-container">
      <h1 className="added-products-title">Your Added Products</h1>
      <div className="products-flexbox">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h2 className="product-name">Name: {product.name}</h2>
              <p className="product-price">Price: ₹{product.price}</p>
              <p className="product-category">Category: {product.category}</p>
              <p className="product-description">
                Description: {product.description}
              </p>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AddedProducts;
