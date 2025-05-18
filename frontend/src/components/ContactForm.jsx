import React, { useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosConfig";

const ContactForm = () => {
  const [formDetails, setFormDetails] = useState({
    email: "",
    message: "",
  });

  const handleChangeForm = (e) => {
    setFormDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/form/contact-request", {
        email: formDetails.email,
        message: formDetails.message,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormDetails({ email: "", message: "" });
      }
    } catch (error) {
      toast.warn(error.response?.data?.message);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmitContact}>
      <p className="changeHeadForm">Connect with us</p>
      <div className="enter-email">
        <input
          type="text"
          placeholder="Enter Email ID"
          name="email"
          value={formDetails.email}
          onChange={handleChangeForm}
        />
      </div>
      <div className="enter-message">
        <textarea
          type="text"
          placeholder="Enter your message"
          name="message"
          value={formDetails.message}
          onChange={handleChangeForm}
        ></textarea>
      </div>
      <button>Submit</button>
    </form>
  );
};

export default ContactForm;
