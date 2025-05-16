import React, { useEffect, useState } from "react";
import "../style/AllProducts.css";
import axiosInstance from "../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { mergedData } from "../utils/data";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const userData = useSelector((state) => state.user.user);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    price: "",
  });
  const [search, setSearch] = useState("");

  const route = useNavigate();
  const location = useLocation();

  const getAllProducts = async (category, brand, price, searchValue) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (searchValue) {
        queryParams.set("search", searchValue);
      } else {
        if (category && category !== "All Category") {
          queryParams.set("category", category);
        }
        if (brand && brand !== "All Brands") {
          queryParams.set("brand", brand);
        }
        if (price) {
          queryParams.set("price", price);
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

    route(`?${queryParams.toString()}`);
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

    getAllProducts(updatedCategory, updatedBrand, updatedPrice, updatedSearch);
  }, [location.search]);

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
              className="drop-select-option"
            >
              <option value="All Category" className="drop-select-option">
                All Categories
              </option>
              {mergedData.categories.map((name, idx) => (
                <option
                  className="drop-select-option"
                  value={name.name}
                  key={idx + 1}
                >
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
              className="drop-select-option"
            >
              <option value="All Brands" className="drop-select-option">
                All Brands
              </option>
              {mergedData.brands.map((brand, idx) => (
                <option
                  value={brand.name}
                  key={idx + 1}
                  className="drop-select-option"
                >
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
              className="drop-select-option"
            >
              <option value="" className="drop-select-option">
                Price
              </option>
              <option value="0-999" className="drop-select-option">
                Below ₹1000
              </option>
              <option value="1000-5000" className="drop-select-option">
                ₹1000 - ₹5000
              </option>
              <option value="5000-25000" className="drop-select-option">
                ₹5000 - ₹25000
              </option>
              <option value="25000-50000" className="drop-select-option">
                ₹25000 - ₹50000
              </option>
              <option value="50000+" className="drop-select-option">
                Above ₹50000
              </option>
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
          allProducts.map((product) => {
            return (
              <div
                className="single-product-container"
                key={product._id}
                onClick={() =>
                  route(`/all-products/single-product/${product._id}`)
                }
              >
                <div className="all-product-image">
                  <img src={product.image} alt={product.name} />
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
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllProducts;
