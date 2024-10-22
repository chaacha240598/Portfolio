// Array of image sources
const imageSources = [
    "Stock photos/CHA03193.jpg",
    "Stock photos/CHA05414.jpg",
    "Stock photos/CHA05883.jpg",
    "Stock photos/DSC_1741.jpg",
    "Stock photos/DSC_3615.jpg",
    "Stock photos/DSC_4529.jpg",
    "Stock photos/DSC_5009.jpg",
    "Stock photos/DSC_7738.jpg",
    "Stock photos/DSC_8641.jpg",
    // Extra Photos
    "Stock photos/Extra Photos/CHA09425.jpg",
    "Stock photos/Extra Photos/DSC_0160.jpg",
    "Stock photos/Extra Photos/DSC_0266.jpg",
    "Stock photos/Extra Photos/DSC_5418.jpg",
    "Stock photos/Extra Photos/DSC_5607.jpg",
    "Stock photos/Extra Photos/DSC_7202.jpg",
    "Stock photos/Extra Photos/DSC_8316.jpg"
];

// Get the photo grid and lightbox slides elements
const photoGrid = document.getElementById('photoGrid');
const lightboxSlides = document.getElementById('lightboxSlides');

let currentSlideIndex = 0; // Variable to keep track of the current slide index

// Function to load images into the photo grid and lightbox
function loadImages() {
    imageSources.forEach((src, index) => {
        // Create img elements for photo grid (only the first 12)
        if (index < 12) {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Photo ${index + 1}`;
            img.className = "grid-photo";
            img.onclick = () => openLightbox(index); // Open lightbox with the clicked image index
            photoGrid.appendChild(img);
        }

        // Create corresponding slides for lightbox (all images)
        const lightboxImg = document.createElement('img');
        lightboxImg.src = src;
        lightboxImg.alt = `Photo ${index + 1}`;
        lightboxSlides.appendChild(lightboxImg);
    });
}

// Function to open the lightbox with the selected image
function openLightbox(index) {
    currentSlideIndex = index; // Set the current slide index
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Disable scrolling when lightbox is open
    showSlide(currentSlideIndex);
}

// Function to close the lightbox
function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling when lightbox is closed
}

// Function to show the current slide
function showSlide(index) {
    const slides = document.querySelectorAll('.lightbox-slides img');

    // Wrap around the slide index
    if (index >= slides.length) {
        currentSlideIndex = 0; // Go to first slide
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1; // Go to last slide
    } else {
        currentSlideIndex = index; // Set the current index
    }

    slides.forEach((slide, i) => {
        slide.style.display = (i === currentSlideIndex) ? 'block' : 'none'; // Show current slide
    });
}

// Swipe functionality for touch devices
let startX = 0;
let endX = 0;

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox img');

// Swipe functionality
lightbox.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
}, false);

lightbox.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX;

    // Detect swipe direction
    if (startX > endX + 50) {
        // Swipe left to next image
        showSlide(currentSlideIndex + 1);
    } else if (startX < endX - 50) {
        // Swipe right to previous image
        showSlide(currentSlideIndex - 1);
    }
}, false);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function (e) {
    // Check if the click is outside the image
    if (e.target === lightbox) {
        closeLightbox(); // Function to close the lightbox
    }
});

function closeLightbox() {
    lightbox.style.display = 'none'; // or another method to hide the lightbox
}

// Event listeners for the lightbox close button and navigation
document.querySelector('.lightbox .close').onclick = closeLightbox;
document.querySelector('.lightbox .prev').onclick = () => showSlide(currentSlideIndex - 1);
document.querySelector('.lightbox .next').onclick = () => showSlide(currentSlideIndex + 1);

// Keyboard navigation for the lightbox
document.addEventListener('keydown', function(event) {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox.style.display === 'block') {
        switch (event.key) {
            case 'Escape': // Close lightbox with Esc key
                closeLightbox();
                break;
            case 'ArrowLeft': // Previous image with left arrow
                showSlide(currentSlideIndex - 1);
                break;
            case 'ArrowRight': // Next image with right arrow
                showSlide(currentSlideIndex + 1);
                break;
        }
    }
});

// Initialize the image loading
document.addEventListener('DOMContentLoaded', loadImages);

// Menu Toggle Script
const menuToggle = document.getElementById('menuToggle');
const overlayMenu = document.getElementById('overlayMenu');
const overlayMenuItems = document.querySelectorAll('.overlay-menu-list li');

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.toggle('open');
    overlayMenu.classList.toggle('open');
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';

    overlayMenuItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.toggle('show');
        }, index * 100); // Staggered show effect
    });
});
