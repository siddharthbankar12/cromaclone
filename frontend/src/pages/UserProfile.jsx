import React from "react";
import "../style/UserProfile.css";

const UserProfile = () => {
  return (
    <div className="container">
      <div className="breadcrumb">
        <a href="/">My Account</a>
        <span className="material-symbols-outlined"> arrow_forward_ios </span>
        <a href="/">My Profile Page</a>
      </div>

      <p className="headingProfile">My Profile Page</p>

      <form>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <select id="title">
              <option value="mr">Mr</option>
              <option value="mrs">Mrs</option>
              <option value="ms">Ms</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name</label>
            <input type="text" id="first-name" placeholder="Enter First Name" />
          </div>
          <div className="form-group">
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              placeholder="Enter Middle Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name</label>
            <input type="text" id="last-name" placeholder="Enter Last Name" />
          </div>
        </div>

        <div className="gender-options">
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="male" />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="transgender" />
            Transgender
          </label>
          <label>
            <input type="radio" name="gender" value="other" /> I'd rather not
            say
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number </label>
            <input
              type="tel"
              id="mobile"
              placeholder="Enter Your Mobile Number"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID </label>
            <input type="email" id="email" placeholder="Enter Your Email ID" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" />
          </div>
          <div className="form-group">
            <label htmlFor="doa">Date of Anniversary</label>
            <input type="date" id="doa" />
          </div>
        </div>

        <div className="button">
          <button type="button" className="discard">
            DISCARD CHANGES
          </button>
          <button type="submit" className="save">
            SAVE CHANGES
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
