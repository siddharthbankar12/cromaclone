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
  const [quantityInputs, setQuantityInputs] = useState({});

  console.log(products);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/all-products0");
      if (response.data.success === true) {
        const fetchedProducts = response.data.products;
        setAllProducts(fetchedProducts);

        const quantityData = {};
        const discountData = {};
        fetchedProducts.forEach((product) => {
          quantityData[product._id] = product.quantity;
          discountData[product._id] = product.discountPercentage ?? 0;
        });
        setQuantityInputs(quantityData);
        setDiscountInputs(discountData);
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
  const handleQuantityChange = async (productId, quantity) => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      return toast.error("Enter a valid quantity (min: 1)");
    }

    try {
      const response = await axiosInstance.put(
        "/admin/update-product-quantity0",
        {
          productId,
          quantity,
        }
      );

      if (response.data.success) {
        toast.success("Product quantity updated!");
        getAllProducts();
      }
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Failed to update quantity.");
    }
  };

  const handleDiscountApply = async (productId) => {
    const discountValue = Number(discountInputs[productId]);

    if (isNaN(discountValue) || discountValue < 0 || discountValue > 90) {
      return toast.error("Enter a valid discount between 0% and 90%");
    }

    try {
      const response = await axiosInstance.post("/admin/discount0", {
        productId,
        discountPercentage: discountValue,
      });

      if (response.data.success) {
        toast.success("Discount applied!");
        getAllProducts();
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
                <th>Price (₹) </th>
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
                      <div className="quantity-update">
                        <input
                          type="number"
                          min={1}
                          value={
                            quantityInputs[product._id] ?? product.quantity
                          }
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            if (!isNaN(val)) {
                              setQuantityInputs((prev) => ({
                                ...prev,
                                [product._id]: val,
                              }));
                            }
                          }}
                          className="quantity-input"
                          style={{ width: "60px", marginRight: "6px" }}
                        />

                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product._id,
                              quantityInputs[product._id]
                            )
                          }
                          className="apply-qty-btn"
                        >
                          Apply
                        </button>
                      </div>
                    </td>
                    <td>{product.price.toLocaleString("en-IN")}</td>
                    <td>{product.originalPrice.toLocaleString("en-IN")}</td>
                    <td>
                      <input
                        type="number"
                        min={0}
                        max={90}
                        placeholder="0"
                        value={discountInputs[product._id] ?? ""}
                        onChange={(e) =>
                          setDiscountInputs((prev) => ({
                            ...prev,
                            [product._id]:
                              e.target.value === ""
                                ? ""
                                : Number(e.target.value),
                          }))
                        }
                        className="discount-input"
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
