import React, { useEffect, useState } from "react";
import "../style/UserProfile.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const userData = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const route = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    phoneNo: "",
    email: "",
    address: "",
    dob: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  async function getCurrentUserData(token) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/get-current-user",
        { token }
      );

      if (response.data.success) {
        dispatch(login(response.data.userData));
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function saveCurrentUserData(token) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/update-current-user",
        { formData, token }
      );

      if (response.data.success) {
        dispatch(login(response.data.userData));
        toast.success(response.data.message);
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getCurrentUserData(JSON.parse(token));
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setFormData({
        title: userData.gender === "male" ? "mr" : "mrs",
        role: userData.role || "",
        firstName: userData.firstName || "",
        middleName: userData.middleName || "",
        lastName: userData.lastName || "",
        gender: userData.gender || "",
        phoneNo: userData.phoneNo || "",
        email: userData.email || "",
        address: userData.address || "",
        dob: userData.dob ? userData.dob.split("T")[0] : "",
      });
      setLoading(false);
    }
  }, [userData]);

  const handleChange = (e) => {
    const { id, value, type } = e.target;

    if (type === "radio") {
      setFormData((prev) => ({ ...prev, gender: value }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const saveChanges = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    saveCurrentUserData(JSON.parse(token));
  };

  const discardChanges = () => {
    if (userData) {
      setFormData({
        title: userData.gender === "male" ? "mr" : "mrs",
        role: userData.role || "",
        firstName: userData.firstName || "",
        middleName: userData.middleName || "",
        lastName: userData.lastName || "",
        gender: userData.gender || "",
        phoneNo: userData.phoneNo || "",
        email: userData.email || "",
        address: userData.address || "",
        dob: userData.dob ? userData.dob.split("T")[0] : "",
      });
    }
    toast.success("Discard Changes");
  };

  console.log(formData);

  const logOutUser = () => {
    dispatch(logout());
    route("/");
  };

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading user data...</p>;
  }

  return (
    <div className="container">
      <div className="breadcrumb">
        <a href="#">My Account</a>
        <span className="material-symbols-outlined"> arrow_forward_ios </span>
        <a href="#">My Profile Page</a>
        <div className="logOutBtn" onClick={logOutUser}>
          LogOut
        </div>
      </div>

      <p className="headingProfile">
        {formData.role.charAt(0).toUpperCase() +
          formData.role.slice(1).toLowerCase()}{" "}
        Profile Page
      </p>

      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select id="title" value={formData.title} onChange={handleChange}>
              <option value="">Select</option>
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="ms">Ms</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              placeholder="Enter First Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="middleName">Middle Name</label>
            <input
              type="text"
              id="middleName"
              value={formData.middleName}
              placeholder="Enter Middle Name"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              placeholder="Enter Last Name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="gender-options">
          {["female", "male", "transgender", "other"].map((gender) => (
            <label key={gender}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={handleChange}
              />{" "}
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </label>
          ))}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phoneNo">Mobile Number </label>
            <input
              type="tel"
              id="phoneNo"
              value={formData.phoneNo}
              placeholder="Enter Your Mobile Number"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email ID </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email ID"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              placeholder="Enter Address"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              style={{ backgroundColor: "#505050", color: "white" }}
            />
          </div>
        </div>

        <div className="button">
          <button type="button" className="discard" onClick={discardChanges}>
            DISCARD CHANGES
          </button>
          <button type="submit" className="save" onClick={saveChanges}>
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
