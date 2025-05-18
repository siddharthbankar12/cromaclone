import React from "react";
import "../style/UsefulLinksFooter.css";

const HelpSupport = () => {
  return (
    <div className="croma-help-wrapper">
      <h1 className="croma-help-heading">Help & Support</h1>

      <div className="croma-help-section">
        <h2>Frequently Asked Questions (FAQs)</h2>
        <ul>
          <li>How do I track my order?</li>
          <li>What is the return/refund policy?</li>
          <li>How can I cancel or modify an order?</li>
          <li>What payment methods are accepted?</li>
          <li>How do I contact customer support?</li>
        </ul>
      </div>

      <div className="croma-help-section">
        <h2>Contact Customer Support</h2>
        <p>Email: support@croma-clone.com</p>
        <p>Phone: +91 99999 99999 (Mon-Sat, 10AM to 7PM)</p>
        <p>Live Chat: Available on weekdays</p>
      </div>

      <div className="croma-help-section">
        <h2>Need More Help?</h2>
        <p>
          If your issue is unresolved or you have queries related to technical
          support, warranty, or service centers, feel free to drop us a message
          through the Contact Us page.
        </p>
      </div>
    </div>
  );
};

export default HelpSupport;
