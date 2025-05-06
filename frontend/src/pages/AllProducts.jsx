import React, { useEffect, useState } from "react";
import "../style/AllProducts.css";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { categoryList, brandList } from "../utils/BrandAndCategory";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch all products with applied filters
  const getAllProducts = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();
      if (filters.category && filters.category !== "All Category") {
        queryParams.set("category", filters.category);
      }
      if (filters.brand && filters.brand !== "All Brands") {
        queryParams.set("brand", filters.brand);
      }
      if (filters.price) {
        queryParams.set("price", filters.price);
      }

      const response = await axiosInstance.get(
        `/product/all-products?${queryParams.toString()}`
      );

      if (response.data.success) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Update filters based on URL query parameters
  useEffect(() => {
    const queryParams = new  (location.search);
    setFilters({
      category: queryParams.get("category") || "",
      brand: queryParams.get("brand") || "",
      price: queryParams.get("price") || "",
    });
  }, [location.search]);

  // Fetch products when filters change
  useEffect(() => {
    getAllProducts();
  }, [filters]);

  // Handle filter changes and update URL query parameters
  const handleFilterChange = (e) => {
    const updatedFilters = {
      ...filters,
      [e.target.name]: e.target.value,
    };
    setFilters(updatedFilters);

    const queryParams = new URLSearchParams();

    if (updatedFilters.category && updatedFilters.category !== "All Category") {
      queryParams.set("category", updatedFilters.category);
    }
    if (updatedFilters.brand && updatedFilters.brand !== "All Brands") {
      queryParams.set("brand", updatedFilters.brand);
    }
    if (updatedFilters.price) {
      queryParams.set("price", updatedFilters.price);
    }

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <div className="products-list">
      <div className="category-name">
        <p>Category</p>
        <p>
          {filters.category ? filters.category : "All Products"}{" "}
          <span>({allProducts.length})</span>
        </p>
      </div>

      <div className="products-filter">
        <div className="category-filter">
          {/* Category */}
          <div className="dropdown">
            <select
              name="category"
              id="category"
              value={filters.category}
              onChange={handleFilterChange}
            >
              <option value="">All Categories</option>
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
            <select
              name="brand"
              id="brand"
              value={filters.brand}
              onChange={handleFilterChange}
            >
              <option value="">All Brands</option>
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
            <select
              name="price"
              id="price"
              value={filters.price}
              onChange={handleFilterChange}
            >
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
          <div className="loader"></div>
        ) : allProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          allProducts.map((product) => (
            <div
              className="single-product-container"
              key={product._id}
              onClick={() =>
                navigate(`/all-products/single-product/${product._id}`)
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
                    <p>₹{product.price.toLocaleString("en-IN")}</p>
                  </div>

                  <div className="save-price">
                    <p>₹{product.originalPrice.toLocaleString("en-IN")}</p>
                    <p>
                      (Save ₹
                      {product.originalPrice && product.price
                        ? (product.originalPrice - product.price)
                            .toFixed(2)
                            .toLocaleString("en-IN")
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
        )}
      </div>
    </div>
  );
};

export default AllProducts;
