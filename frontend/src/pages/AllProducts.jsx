import React, { useEffect, useState } from "react";
import "../style/AllProducts.css";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { categoryList, brandList } from "../utils/BrandAndCategory";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const route = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/product/all-products");
      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  console.log(allProducts);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="products-list">
      <div className="category-name">
        <p>Category</p>
        <p>
          Phones & Wearables <span>(6504)</span>
        </p>
      </div>

      <div className="products-filter">
        <div className="category-filter">
          {/* Category */}
          <div className="dropdown">
            <select name="category" id="category">
              <option value="">Category</option>
              {categoryList.map((name, idx) => (
                <option value={name} key={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>

          {/* Brand */}
          <div className="dropdown">
            <select name="brand" id="brand">
              <option value="">Brand</option>
              {brandList.map((brand, idx) => (
                <option value={brand} key={idx + 1}>
                  {brand}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>

          {/* Price */}
          <div className="dropdown">
            <select name="price" id="price">
              <option value="">Price</option>
              <option value="0-999">Below ₹1000</option>
              <option value="1000-5000">₹1000 - ₹5000</option>
              <option value="5000-25000">₹5000 - ₹25000</option>
              <option value="25000-50000">₹25000 - ₹50000</option>
              <option value="50000+">Above ₹50000</option>
            </select>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>
        </div>
      </div>

      <div className="list-of-products">
        {loading ? (
          <p>Loading products...</p>
        ) : allProducts.length > 0 ? (
          allProducts.map((product) => (
            <div
              className="single-product-container"
              key={product._id}
              onClick={() =>
                route(`/all-products/single-product/${product._id}`)
              }
            >
              <div className="all-product-image">
                <img src={product.image} alt={product.name} />
                <i className="fa-regular fa-heart"></i>
              </div>

              <div className="product-name-price-delivery">
                <div className="product-namee">
                  {product.name} - {product.brand}
                </div>

                <div className="product-price">
                  <div className="price">
                    <p>₹{product.price}</p>
                  </div>

                  <div className="save-price">
                    <p>₹{product.originalPrice}</p>
                    <p>
                      (Save ₹
                      {product.originalPrice && product.price
                        ? (product.originalPrice - product.price).toFixed(2)
                        : "N/A"}
                      )
                    </p>
                  </div>
                  <div className="price-off">
                    <p>{product.discountPercentage}% Off</p>
                  </div>
                </div>

                <div className="product-delivery-date">
                  <span className="material-symbols-outlined mso">
                    delivery_truck_speed
                  </span>
                  <p>Standard Delivery by Mon, 20th Jan</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
