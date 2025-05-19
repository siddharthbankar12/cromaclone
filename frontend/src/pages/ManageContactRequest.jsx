import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosConfig";
import "../style/ManageContactRequest.css";

const ManageContactRequest = () => {
  const userData = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);

  const getFormsRequestData = async () => {
    try {
      const response = await axiosInstance.post("/form/get-contact-request", {
        adminId: userData?.userId,
      });

      if (response.data.success === true) {
        setData(response.data.requestData);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    if (userData) {
      getFormsRequestData();
    }
  }, [userData]);

  return (
    <div className="croma-contact-request">
      <h2>Contact Requests</h2>
      {data.length > 0 ? (
        <div className="request-list">
          {data.map((item) => (
            <div className="request-card" key={item._id}>
              <div className="request-row">
                <span className="request-label">Email:</span>
                <span>{item.email}</span>
              </div>
              <div className="request-row">
                <span className="request-label">Message:</span>
                <span>{item.message}</span>
              </div>
              <div className="request-footer">
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No contact requests found.</p>
      )}
    </div>
  );
};

export default ManageContactRequest;
