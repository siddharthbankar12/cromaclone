import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import "../style/ManageProducts.css";

const ManageProducts = () => {
  const userData = useSelector((state) => state.user.user);
  const [products, setAllProducts] = useState([]);
  const [discountInputs, setDiscountInputs] = useState({});
  const [loading, setLoading] = useState(false);

  console.log(products);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/all-products0");
      if (response.data.success === true) {
        setAllProducts(response.data.products);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete("/admin/delete-product0", {
        data: { productId },
      });

      if (response.data.success) {
        toast.success("Product deleted successfully!");
        getAllProducts();
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete the product.");
    }
  };

  const handleQuantityChange = async (productId, action) => {
    try {
      const response = await axiosInstance.put(
        "/admin/update-product-quantity0",
        {
          productId,
          action,
        }
      );

      if (response.data.success) {
        toast.success("Product quantity updated successfully!");
        getAllProducts();
      }
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Failed to update product quantity.");
    }
  };

  const handleDiscountApply = async (productId) => {
    const discountPercentage = discountInputs[productId];
    if (
      discountPercentage === undefined ||
      isNaN(discountPercentage) ||
      discountPercentage < 1 ||
      discountPercentage > 90
    ) {
      return toast.error("Enter a valid discount between 1% and 90%");
    }

    try {
      const response = await axiosInstance.post("/admin/discount0", {
        productId,
        discountPercentage,
      });

      if (response.data.success) {
        toast.success("Discount applied!");
        getAllProducts();
        setDiscountInputs((prev) => ({ ...prev, [productId]: "" }));
      }
    } catch (error) {
      console.error("Discount error:", error);
      toast.error("Failed to apply discount.");
    }
  };

  useEffect(() => {
    if (userData?.role === "admin") {
      getAllProducts();
    }
  }, [userData]);

  return (
    <div className="admin-container">
      <h2>Manage Products</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th style={{ width: "260px" }}>Name</th>
                <th>Brand</th>
                <th>Seller ID</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price (₹) / Discount (%)</th>
                <th>Original Price (₹)</th>
                <th>Discount (%)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="9" style={{ textAlign: "center" }}>
                    No products available
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-img"
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.sellerId._id}</td>
                    <td>{product.category}</td>
                    <td>
                      <div className="quantity-actions">
                        <p
                          className="quantity-btn"
                          onClick={() =>
                            handleQuantityChange(product._id, "decrease")
                          }
                          disabled={product.quantity <= 1}
                        >
                          -
                        </p>
                        {product.quantity}
                        <p
                          className="quantity-btn"
                          onClick={() =>
                            handleQuantityChange(product._id, "increase")
                          }
                        >
                          +
                        </p>
                      </div>
                    </td>
                    <td>
                      {product.price.toLocaleString("en-IN")} /{" "}
                      {product.discountPercentage}%
                    </td>
                    <td>{product.originalPrice.toLocaleString("en-IN")}</td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        value={discountInputs[product._id] || ""}
                        onChange={(e) =>
                          setDiscountInputs((prev) => ({
                            ...prev,
                            [product._id]: e.target.value,
                          }))
                        }
                        className="discount-input"
                        min={1}
                        max={90}
                        style={{ width: "60px", marginRight: "5px" }}
                      />
                      <button
                        onClick={() => handleDiscountApply(product._id)}
                        className="apply-discount-btn"
                      >
                        Apply
                      </button>
                    </td>
                    <td className="delete-product-btn-admin">
                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDelete(product._id)}
                        title="Delete Product"
                      >
                        <MdDelete size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
