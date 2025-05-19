import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/Notification.css";

const Notification = () => {
  const userData = useSelector((state) => state.user.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNotification = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/notification", {
        sellerId: userData?._id,
      });
      setNotifications(response.data.notifications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      getNotification();
    }
  }, [userData]);

  return (
    <div className="croma-notification-container">
      <h2 className="croma-notification-heading">Notifications</h2>
      {loading ? (
        <div className="loader"></div>
      ) : notifications.length === 0 ? (
        <p className="croma-notification-empty">No notifications found.</p>
      ) : (
        notifications.map((notification) => (
          <div key={notification._id} className="croma-notification-card">
            <p className="croma-notification-msg">{notification.message}</p>
            <p className="croma-notification-user">
              <strong>By ID :</strong> {notification.userId?._id}
            </p>
            <p className="croma-notification-user">
              <strong>Quantity :</strong> {notification.quantity}
            </p>
            <p className="croma-notification-date">
              {new Date(notification.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
