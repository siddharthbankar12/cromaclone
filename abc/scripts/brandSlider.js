const logoContainer = document.querySelector(".brand-container");
const logos = document.querySelectorAll(".brand-images");
const logosToShow = 5; // Number of logos visible at a time
const logosToMove = 2; // Number of logos to move at a time
const logoWidth = 100 / logosToShow; // Width percentage per slide
let currentLogoIndex = 0;

// Update the logo container's position
function updateLogoPosition() {
  const offset = -currentLogoIndex * logoWidth;
  logoContainer.style.transform = `translateX(${offset}%)`;
}

// Move to the next set of logos
function nextLogo() {
  if (currentLogoIndex + logosToMove <= logos.length - logosToShow) {
    currentLogoIndex += logosToMove; // Move forward
  } else {
    currentLogoIndex = logos.length - logosToShow; // Snap to the last position
  }
  updateLogoPosition();
}

// Move to the previous set of logos
function prevLogo() {
  if (currentLogoIndex - logosToMove >= 0) {
    currentLogoIndex -= logosToMove; // Move backward
  } else {
    currentLogoIndex = 0; // Snap to the first position
  }
  updateLogoPosition();
}

// Initialize the layout by setting the width of each logo
logos.forEach((logo) => {
  logo.style.flex = `0 0 ${logoWidth}%`;
});

// Set the initial position
updateLogoPosition();
