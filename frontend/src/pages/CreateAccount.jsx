import React, { useState } from "react";
import "../style/CreateAccount.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const [newUserData, setNewUserData] = useState({
    role: "user",
    firstName: "",
    lastName: "",
    gender: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const route = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      "http://localhost:8000/api/v1/auth/register",
      { newUserData }
    );

    try {
      if (
        newUserData.role &&
        newUserData.firstName &&
        newUserData.lastName &&
        newUserData.email
      ) {
        if (newUserData.password === newUserData.confirmPassword) {
          if (response.data.success === true) {
            toast.success(response.data.message);

            setNewUserData({
              role: "user",
              firstName: "",
              lastName: "",
              gender: "",
              phoneNo: "",
              email: "",
              password: "",
              confirmPassword: "",
            });

            route("/");
          } else {
            toast.error(response.data.message);
          }
        } else {
          toast.error(response.data.message);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="container">
      <p className="headingProfile">Create Account</p>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              onChange={handleChange}
              value={newUserData.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              onChange={handleChange}
              placeholder="Enter First Name"
              value={newUserData.firstName}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              placeholder="Enter Last Name"
              value={newUserData.lastName}
            />
          </div>
        </div>

        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleChange}
              checked={newUserData.gender === "female"}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleChange}
              checked={newUserData.gender === "male"}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="transgender"
              onChange={handleChange}
              checked={newUserData.gender === "transgender"}
            />
            Transgender
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleChange}
              checked={newUserData.gender === "other"}
            />
            I'd rather not say
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number </label>
            <input
              type="tel"
              id="mobile"
              name="phoneNo"
              onChange={handleChange}
              placeholder="Enter Your Mobile Number"
              value={newUserData.phoneNo}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter Your Email ID"
              value={newUserData.email}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter Your Password"
              value={newUserData.password}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm Password"
              value={newUserData.confirmPassword}
            />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="create">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
