import axios from "axios";
import "../style/AddProduct.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const userData = useSelector((state) => state.user.user);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "computer",
    image: "",
    description: "",
  });
  const route = useNavigate();
  console.log(userData);
  const token = localStorage.getItem("token");

  const handleChange = (event) => {
    setProductData({ ...productData, [event.target.name]: event.target.value });
  };

  const handleChangeCategory = (event) => {
    setProductData({ ...productData, category: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userData?.userId) {
      return toast.error("Please login.");
    }

    try {
      if (
        productData.name &&
        productData.price &&
        productData.quantity &&
        productData.category &&
        productData.image &&
        productData.description
      ) {
        const response = await axios.post(
          "http://localhost:8000/api/v1/product/add-product",
          {
            productData,
            userId: userData.userId,
          }
        );
        if (response.data.success === true) {
          toast.success(response.data.message);
          setProductData({
            name: "",
            price: "",
            quantity: "",
            category: "computer",
            image: "",
            description: "",
          });
          route("/seller/added-products");
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error("All fields are required.");
      }
    } catch (error) {
      console.log(error, "error while submitting register.");
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (!userData || (userData && userData?.role !== "seller")) {
      toast.error("You don't have access for this page.");
      route("/");
    }
  }, [userData]);

  console.log(userData?.role);

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add a New Product</h1>

      <form className="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name :</label>
        <input
          className="add-product-input"
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={productData.name}
          placeholder="Enter product name"
          required
        />
        <label htmlFor="price">Product Price :</label>
        <input
          className="add-product-input"
          type="number"
          id="price"
          name="price"
          onChange={handleChange}
          value={productData.price}
          placeholder="Enter price"
          required
        />
        <label htmlFor="quantity">Total Quantity :</label>
        <input
          className="add-product-input"
          type="number"
          id="quantity"
          name="quantity"
          onChange={handleChange}
          value={productData.quantity}
          placeholder="Enter quantity"
          required
        />
        <label htmlFor="category">Category :</label>
        <select
          id="category"
          onChange={handleChangeCategory}
          value={productData.category}
          className="add-product-select"
        >
          <option value="computer">Computer</option>
          <option value="laptops">Laptops</option>
          <option value="mobiles">Mobiles</option>
          <option value="ac">AC</option>
          <option value="cpu">CPU</option>
          <option value="monitor">Monitor</option>
          <option value="pad">Pad</option>
          <option value="accessories">Accessories</option>
        </select>
        <label htmlFor="image">Product Image URL :</label>
        <input
          className="add-product-input"
          type="url"
          id="image"
          name="image"
          onChange={handleChange}
          value={productData.image}
          placeholder="Enter image URL"
          required
        />
        <label htmlFor="description">Product Description :</label>
        <input
          className="add-product-input"
          type="text"
          id="description"
          name="description"
          onChange={handleChange}
          value={productData.description}
          placeholder="Enter product description"
          required
        />
        <div className="add-product-buttons">
          <button type="submit" className="add-product-button">
            Add Product
          </button>
          <button
            type="button"
            onClick={() => route("/")}
            className="add-product-button"
          >
            Cancel
          </button>
        </div>
      </form>
      {productData.image && (
        <img
          src={productData.image}
          alt="Product Preview"
          className="product-preview"
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "contain",
            marginTop: "10px",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        />
      )}
    </div>
  );
};

export default AddProduct;
