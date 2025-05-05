import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import "../style/AddedProducts.css";
import axiosInstance from "../utils/axiosConfig";

const AddedProducts = () => {
  const userData = useSelector((state) => state.user.user);
  const [products, setProducts] = useState([]);

  const getAddedProducts = async () => {
    if (userData?.userId && userData.role === "seller") {
      try {
        const response = await axiosInstance.post("/product/added-products", {
          userId: userData.userId,
        });
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
    <div className="added-products-containerr">
      <h1 className="added-products-titlee">Your Added Products</h1>
      <div className="products-flexboxx">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-cardd">
              <img
                src={product.image}
                alt={product.name}
                className="product-imagee"
              />
              <h2 className="product-namee">Name : {product.name}</h2>
              <p className="product-brandd">
                <b>Brand Name :</b> {product.brand}
              </p>
              <p className="product-pricee">
                <b>Price :</b> ₹{product.price}
              </p>
              <p className="product-categoryy">
                <b>Category :</b> {product.category}
              </p>
              <p className="product-descriptionn">
                <b>Description :</b> {product.description}
              </p>
            </div>
          ))
        ) : (
          <p className="loading-textt">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AddedProducts;
