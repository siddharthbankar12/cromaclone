import React from "react";
import "../style/UsefulLinksFooter.css";

const Disclaimer = () => {
  return (
    <div className="croma-disclaimer-wrapper">
      <h1 className="croma-disclaimer-heading">Disclaimer</h1>

      <div className="croma-disclaimer-section">
        <h2>General Information</h2>
        <p>
          This website is a clone project of Croma and is intended solely for
          educational and demonstrational purposes. All product information,
          images, and branding used here are for UI/UX replication only and do
          not reflect the actual Croma website.
        </p>
      </div>

      <div className="croma-disclaimer-section">
        <h2>Ownership</h2>
        <p>
          We do not own any logos, trademarks, product data, or brand materials
          shown here. All rights belong to their respective owners. This site is
          not affiliated with or endorsed by Croma or Tata Group.
        </p>
      </div>

      <div className="croma-disclaimer-section">
        <h2>Liability</h2>
        <p>
          We are not responsible for any decisions made based on the content of
          this website. No purchases, transactions, or official services are
          available on this platform.
        </p>
      </div>

      <div className="croma-disclaimer-section">
        <h2>Contact</h2>
        <p>
          If you are a representative of Croma and wish to request removal of
          any content, please contact the project owner.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
