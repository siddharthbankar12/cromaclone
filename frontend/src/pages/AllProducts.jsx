import React, { useEffect, useState } from "react";
import "../style/AllProducts.css";
import axiosInstance from "../axiosConfig";
import { useNavigate } from "react-router-dom";

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
          <div className="categories">
            <p>Categories</p>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>
          <div className="brand">
            <p>Brand</p>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>
          <div className="price">
            <p>Price</p>
            <span className="material-symbols-outlined mso">
              keyboard_arrow_down
            </span>
          </div>
        </div>

        <div className="amount-sort">
          <div className="featured-amount">
            <p>
              Sort By <b>Featured</b>
            </p>
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
                <div className="product-name">
                  {product.name} - {product.brand}
                </div>

                <div className="product-price">
                  <div className="price">
                    <p>₹{product.price}</p>
                  </div>

                  <div className="save-price">
                    <p>₹{product.price + 5000}</p>
                    <p>(Save ₹5000)</p>
                  </div>
                  <div className="price-off">
                    <p>6% Off</p>
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

      <div className="sort-filter-mobile">
        <div className="bottom-sort">
          <span className="material-symbols-outlined mso"> sort </span>
          <p>Sort</p>
        </div>
        <div className="bottom-filter">
          <span className="material-symbols-outlined mso"> filter_list </span>
          <p>Filter</p>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
