import React, { useEffect, useState } from "react";
import "../style/LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { login } from "../store/userSlice";

const LoginRegisterPage = ({ closeModal }) => {
  const route = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const responseUser = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        { email: userData.email, password: userData.password }
      );

      if (responseUser.data.success === true) {
        dispatch(login(responseUser.data.userData));
        toast.success(responseUser.data.message);
        setUserData({ email: "", password: "" });
        closeModal();
      } else {
        toast.error(responseUser.data.message);
      }
    } catch (error) {
      toast.error(
        error.responseUser.data.message || error.responseUser.data.error
      );
    }
  };

  return (
    <div className="main-container">
      <span
        className="material-symbols-outlined shiftRight"
        onClick={closeModal}
      >
        close
      </span>

      <form className="containerLR" onSubmit={handleSubmit}>
        <div className="login-createaccount">
          <p style={{ cursor: "pointer" }}>Login</p>
          <p
            onClick={() => {
              route("/croma/create-account");
              closeModal();
            }}
            style={{ cursor: "pointer" }}
          >
            Create Account
          </p>
        </div>
        <p className="orContainer">OR</p>

        <p className="note-enterDetail">
          Please enter your Email ID and Password
        </p>
        <input
          type="email"
          name="email"
          id="email"
          value={userData.email}
          className="enter-id"
          placeholder="Enter your Email ID"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          id="password"
          value={userData.password}
          className="enter-password"
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        <div className="checkbox-singin">
          <input type="checkbox" name="" id="keep-singedin" />
          <label htmlFor="keep-singedin">Keep me signed in</label>
        </div>
        <p className="terms-policy">
          By continuing you agree to our <a href="/">Terms of Use</a> {""} &{" "}
          {""}
          <a href="/">Privacy Policy</a>
        </p>
        <button className="Continue-button" type="submit">
          Continue
        </button>
      </form>
    </div>
  );
};

export default LoginRegisterPage;
