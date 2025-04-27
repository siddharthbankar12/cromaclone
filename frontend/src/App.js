import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import CreateAccount from "./pages/CreateAccount";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/croma/create-account" element={<CreateAccount />} />
      </Routes>
    </>
  );
};

export default App;
