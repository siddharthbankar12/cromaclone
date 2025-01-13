const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function showSlide(index) {
  // Remove 'active' class from all slides
  slides.forEach((slide) => slide.classList.remove("active"));
  
  // Add 'active' class to the current slide
  slides[index].classList.add("active");
}

function startSlider() {
  // Show the first slide immediately
  showSlide(currentIndex);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length; // Loop back to the first slide
    showSlide(currentIndex);
  }, 5000); // Change slide every 5 seconds
}

// Initialize the slider
startSlider();
