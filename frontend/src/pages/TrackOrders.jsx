import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/TrackOrders.css";

const TrackOrders = () => {
  const userData = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(null);
  const [showSellerPopup, setShowSellerPopup] = useState(null);

  console.log(orders);

  const getOrdersList = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/all-orders0");
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?._id) {
      getOrdersList();
    }
  }, [userData]);

  return (
    <div className="mo-orders-container">
      <h2 className="mo-orders-title">Track Orders</h2>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="mo-orders-table-wrapper">
          <table className="mo-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Products</th>
                <th>Total Price</th>
                <th>Order Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    <span
                      className="mo-clickable-id"
                      onClick={() => setShowUserPopup(order._id)}
                    >
                      {order.userId?._id}
                    </span>
                  </td>
                  <td>
                    {order.products.map((item) => (
                      <div key={item.productId._id} className="mo-product-item">
                        <img
                          src={item.productId.image}
                          alt={item.productId.name}
                          className="mo-product-img"
                        />
                        <span
                          className="mo-clickable-id"
                          onClick={() => setShowSellerPopup(item.productId._id)}
                        >
                          {item.productId._id}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td>₹{order.price}</td>
                  <td>{order.orderAdd}</td>
                  <td>
                    <span className="mo-order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* User Popup */}
      {showUserPopup && (
        <div
          className="mo-popup-overlay"
          onClick={() => setShowUserPopup(null)}
        >
          <div
            className="mo-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>User Details</h3>
            {orders.find((o) => o._id === showUserPopup)?.userId && (
              <ul>
                <li>
                  <strong>Name:</strong>{" "}
                  {orders.find((o) => o._id === showUserPopup).userId.firstName}{" "}
                  {orders.find((o) => o._id === showUserPopup).userId.lastName}
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  {orders.find((o) => o._id === showUserPopup).userId.email}
                </li>
                <li>
                  <strong>Phone:</strong>{" "}
                  {orders.find((o) => o._id === showUserPopup).userId.phoneNo}
                </li>
                <li>
                  <strong>Address:</strong>{" "}
                  {orders.find((o) => o._id === showUserPopup).userId.address}
                </li>
              </ul>
            )}
            <button
              className="mo-close-btn"
              onClick={() => setShowUserPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Seller/Product Popup */}
      {showSellerPopup && (
        <div
          className="mo-popup-overlay"
          onClick={() => setShowSellerPopup(null)}
        >
          <div
            className="mo-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Product Details</h3>
            {orders
              .flatMap((order) => order.products)
              .find((p) => p.productId._id === showSellerPopup)?.productId && (
              <ul>
                <li>
                  <strong>Product Name:</strong>{" "}
                  {
                    orders
                      .flatMap((order) => order.products)
                      .find((p) => p.productId._id === showSellerPopup)
                      .productId.name
                  }
                </li>
                <li>
                  <strong>Brand:</strong>{" "}
                  {
                    orders
                      .flatMap((order) => order.products)
                      .find((p) => p.productId._id === showSellerPopup)
                      .productId.brand
                  }
                </li>
                <li>
                  <strong>Category:</strong>{" "}
                  {
                    orders
                      .flatMap((order) => order.products)
                      .find((p) => p.productId._id === showSellerPopup)
                      .productId.category
                  }
                </li>
                <li>
                  <strong>Price:</strong> ₹
                  {orders
                    .flatMap((order) => order.products)
                    .find((p) => p.productId._id === showSellerPopup)
                    ?.productId.price.toLocaleString("en-IN")}
                </li>
                <li>
                  <strong>Original Price:</strong> ₹
                  {orders
                    .flatMap((order) => order.products)
                    .find((p) => p.productId._id === showSellerPopup)
                    ?.productId.originalPrice.toLocaleString("en-IN")}
                </li>
                <li>
                  <strong>Discount:</strong>{" "}
                  {
                    orders
                      .flatMap((order) => order.products)
                      .find((p) => p.productId._id === showSellerPopup)
                      .productId.discountPercentage
                  }
                  %
                </li>
                <li>
                  <strong>Seller ID:</strong>{" "}
                  {
                    orders
                      .flatMap((order) => order.products)
                      .find((p) => p.productId._id === showSellerPopup)
                      .productId.sellerId
                  }
                  %
                </li>
              </ul>
            )}
            <button
              className="mo-close-btn"
              onClick={() => setShowSellerPopup(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrders;
