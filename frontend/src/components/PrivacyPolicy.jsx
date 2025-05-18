import React from "react";
import "../style/UsefulLinksFooter.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-wrapper">
      <h1 className="privacy-heading">Privacy Policy</h1>

      <div className="privacy-section">
        <h2>1. Introduction</h2>
        <p>
          At Croma Clone, we respect your privacy and are committed to
          protecting the personal information you share with us. This policy
          outlines how we collect, use, and safeguard your data.
        </p>
      </div>

      <div className="privacy-section">
        <h2>2. Information We Collect</h2>
        <ul>
          <li>
            Personal information like name, email, address, and phone number.
          </li>
          <li>
            Usage data including pages visited, time spent, and user activity.
          </li>
          <li>
            Device and browser information via cookies and analytics tools.
          </li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2>3. How We Use Your Information</h2>
        <p>
          We use your data to improve our services, personalize user experience,
          process transactions, send updates, and for security purposes.
        </p>
      </div>

      <div className="privacy-section">
        <h2>4. Sharing Your Data</h2>
        <p>
          We do not sell or rent your personal data. We may share information
          with trusted third parties who assist in service delivery, under
          confidentiality agreements.
        </p>
      </div>

      <div className="privacy-section">
        <h2>5. Your Choices</h2>
        <p>
          You may opt out of promotional emails, manage cookie preferences, and
          request data deletion by contacting us at privacy@croma-clone.com.
        </p>
      </div>

      <div className="privacy-section">
        <h2>6. Security</h2>
        <p>
          We use industry-standard security measures to protect your information
          from unauthorized access or disclosure.
        </p>
      </div>

      <div className="privacy-section">
        <h2>7. Policy Updates</h2>
        <p>
          This Privacy Policy may be updated periodically. Any changes will be
          posted here, and continued use of our services implies acceptance.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
