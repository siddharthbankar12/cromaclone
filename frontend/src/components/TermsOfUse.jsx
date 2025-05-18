import React from "react";
import "../style/UsefulLinksFooter.css";

const TermsOfUse = () => {
  return (
    <div className="terms-wrapper">
      <h1 className="terms-heading">Terms of Use</h1>

      <div className="terms-section">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Croma Clone. These Terms of Use govern your use of our
          website and services. By accessing or using the site, you agree to be
          bound by these terms.
        </p>
      </div>

      <div className="terms-section">
        <h2>2. User Obligations</h2>
        <ul>
          <li>You must provide accurate and up-to-date information.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account.
          </li>
          <li>You agree not to misuse the services for illegal activities.</li>
        </ul>
      </div>

      <div className="terms-section">
        <h2>3. Intellectual Property</h2>
        <p>
          All content, trademarks, logos, and other intellectual property
          displayed on this site are the property of their respective owners and
          protected by law.
        </p>
      </div>

      <div className="terms-section">
        <h2>4. Limitation of Liability</h2>
        <p>
          Croma Clone shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of our website or services.
        </p>
      </div>

      <div className="terms-section">
        <h2>5. Amendments</h2>
        <p>
          We reserve the right to update or modify these Terms of Use at any
          time without prior notice. Continued use of the site means you accept
          the changes.
        </p>
      </div>

      <div className="terms-section">
        <h2>6. Contact Information</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          support@croma-clone.com.
        </p>
      </div>
    </div>
  );
};

export default TermsOfUse;
