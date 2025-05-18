import React from "react";
import "../style/UsefulLinksFooter.css";

const BuyingGuide = () => {
  return (
    <div className="croma-buying-guide">
      <h1 className="croma-heading">Buying Guide</h1>

      <section className="croma-guide-section">
        <h2>Smartphones</h2>
        <ul>
          <li>
            <strong>Performance:</strong> Opt for 6GB RAM or more for smoother
            use.
          </li>
          <li>
            <strong>Display:</strong> AMOLED screens offer better visuals and
            battery efficiency.
          </li>
          <li>
            <strong>Battery:</strong> A 4500mAh+ battery ensures longer usage.
          </li>
          <li>
            <strong>Camera:</strong> Choose devices with OIS and Night Mode.
          </li>
          <li>
            <strong>5G:</strong> Pick a 5G-ready phone for future-proofing.
          </li>
        </ul>
      </section>

      <section className="croma-guide-section">
        <h2>Laptops</h2>
        <ul>
          <li>
            <strong>Processor:</strong> Intel i5/Ryzen 5 or above is ideal for
            daily tasks.
          </li>
          <li>
            <strong>RAM:</strong> 8GB is the standard for multitasking.
          </li>
          <li>
            <strong>Storage:</strong> SSDs are faster and more reliable than
            HDDs.
          </li>
          <li>
            <strong>Display:</strong> Look for FHD (1080p) resolution or better.
          </li>
          <li>
            <strong>Battery:</strong> Long battery life is crucial for
            portability.
          </li>
        </ul>
      </section>

      <section className="croma-guide-section">
        <h2>Home Appliances</h2>
        <ul>
          <li>
            <strong>Washing Machines:</strong> Front-loads are more efficient
            and gentle on clothes.
          </li>
          <li>
            <strong>Refrigerators:</strong> Inverter compressors help save
            electricity.
          </li>
          <li>
            <strong>Microwaves:</strong> Go for convection if you want baking +
            heating.
          </li>
          <li>
            <strong>ACs:</strong> Inverter ACs provide consistent cooling and
            energy savings.
          </li>
        </ul>
      </section>

      <section className="croma-guide-section">
        <h2>Tips Before Buying</h2>
        <ul>
          <li>
            Compare specs, reviews, and prices on Croma before purchasing.
          </li>
          <li>Check return policies and warranty coverage.</li>
          <li>Use filters to narrow down choices by budget and features.</li>
          <li>Watch for ongoing offers and deals during seasonal sales.</li>
        </ul>
      </section>
    </div>
  );
};

export default BuyingGuide;
