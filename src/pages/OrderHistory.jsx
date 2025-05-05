import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../style/OrderHistory.css";
import axiosInstance from "../utils/axiosConfig";

const OrderHistory = () => {
  const userData = useSelector((state) => state.user.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrderHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/get-order-history", {
        userId: userData.userId,
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.userId) {
      getOrderHistory();
    }
  }, [userData]);

  return (
    <>
      {loading ? (
        <h1 className="loading">Loading...</h1>
      ) : (
        <div className="order-container">
          <h2 className="order-title">Order History</h2>
          {orders.length > 0 ? (
            <div className="order-list">
              {orders.map((order, idx) => (
                <div key={idx} className="order-card">
                  <h2 className="order-id">Order ID: {order._id}</h2>
                  <p className="order-price">Total Price: ₹{order.price}</p>
                  <p className="order-date">
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="product-list">
                    {order.products.map((item, index) => (
                      <div key={index} className="product-item">
                        <img
                          src={item.productId?.image}
                          alt="Product"
                          className="product-image"
                        />
                        <div>
                          <p className="product-name">{item.productId?.name}</p>
                          <p className="product-qty">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-orders">You haven't placed any orders yet.</p>
          )}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
