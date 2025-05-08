import React, { useEffect, useState } from "react";
import "../style/AllProducts.css";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { mergedData } from "../utils/data";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const userSearch = useSelector((state) => state.user.query);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
  });
  const [search, setSearch] = useState(userSearch);

  const navigate = useNavigate();
  const location = useLocation();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (search) {
        queryParams.set("search", search);
      } else {
        if (filters.category && filters.category !== "All Category") {
          queryParams.set("category", filters.category);
        }
        if (filters.brand && filters.brand !== "All Brands") {
          queryParams.set("brand", filters.brand);
        }
        if (filters.price) {
          queryParams.set("price", filters.price);
        }
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

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const updatedCategory = queryParams.get("category") || "";
    const updatedBrand = queryParams.get("brand") || "";
    const updatedPrice = queryParams.get("price") || "";
    const updatedSearch = queryParams.get("search") || "";

    setFilters({
      category: updatedCategory,
      brand: updatedBrand,
      price: updatedPrice,
    });
    setSearch(updatedSearch);
  }, [search, location.search]);

  useEffect(() => {
    getAllProducts();
  }, [filters]);

  // useEffect(() => {
  //   getAllProducts();
  // }, [userSearch]);

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
          {filters.category
            ? filters.category
            : search
            ? search
            : "All Products"}{" "}
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
              <option value="All Category">All Categories</option>
              {mergedData.categories.map((name, idx) => (
                <option value={name.name} key={idx + 1}>
                  {name.name}
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
              <option value="All Brands">All Brands</option>
              {mergedData.brands.map((brand, idx) => (
                <option value={brand.name} key={idx + 1}>
                  {brand.name}
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
                        ? (
                            product.originalPrice - product.price
                          ).toLocaleString("en-IN")
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
