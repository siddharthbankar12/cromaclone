const imagesContainer = document.querySelector(".category-container");
const images = document.querySelectorAll(".category-images");
const imagesToShow = 10; // Number of images visible at a time
const imagesToMove = 2; // Number of images to move at a time
const imagesWidth = 100 / imagesToShow; // Width percentage per slide
let curIndex = 0;

function updateImagePosition() {
  const offset = -curIndex * imagesWidth;
  imagesContainer.style.transform = `translateX(${offset}%)`;
}

function nextImage() {
  if (curIndex + imagesToMove <= images.length - imagesToShow) {
    curIndex += imagesToMove; // Move forward by 2 slides
  } else {
    curIndex = images.length - imagesToShow; // Snap to the last possible position
  }
  updateImagePosition();
}

function prevImage() {
  if (curIndex - imagesToMove >= 0) {
    curIndex -= imagesToMove; // Move backward by 2 slides
  } else {
    curIndex = 0; // Snap to the first position
  }
  updateImagePosition();
}

// Initialize slider layout
images.forEach((image) => {
  image.style.flex = `0 0 ${imagesWidth}%`;
});

updateImagePosition();
