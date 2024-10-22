// Array of image sources
const imageSources = [
    "celebrity Night/Main grid/DSC_1259.jpg",
    "celebrity Night/Main grid/DSC_1499-Edit.jpg",
    "celebrity Night/Main grid/DSC_1501.jpg", 
    "celebrity Night/Main grid/DSC_7286.jpg", 
    "celebrity Night/Main grid/DSC_7720.jpg", 
    "celebrity Night/Main grid/DSC_7747.jpg", 
    "celebrity Night/Main grid/DSC_7849.jpg", 
    "celebrity Night/Main grid/DSC_8051.jpg", 
    "celebrity Night/Main grid/DSC01798.jpg", 
    "celebrity Night/Main grid/HI8A2088.jpg", 
    "celebrity Night/Main grid/TUS00208.jpg", 
    "celebrity Night/Main grid/TUS09399.jpg",
    // extra photos
    "celebrity Night/CHA09246.jpg",
    "celebrity Night/DSC_1028.jpg", 
    "celebrity Night/DSC_1138.jpg", 
    "celebrity Night/DSC_1180.jpg ",
    "celebrity Night/DSC_1199.jpg ",
    "celebrity Night/DSC_1669.jpg ",
    "celebrity Night/DSC_1932.jpg ",
    "celebrity Night/DSC_2052.jpg ",
    "celebrity Night/DSC_2092.jpg ",
    "celebrity Night/DSC_2135.jpg ",
    "celebrity Night/DSC_2729 - Copy.jpg ",
    "celebrity Night/DSC_3119.jpg ",
    "celebrity Night/DSC_3239.jpg ",
    "celebrity Night/DSC_3266.jpg ",
    "celebrity Night/DSC_3271.jpg ",
    "celebrity Night/DSC_3341.jpg ",
    "celebrity Night/DSC_7740.jpg ",
    "celebrity Night/DSC_7778.jpg ",
    "celebrity Night/DSC_7997.jpg ",
    "celebrity Night/DSC01745.jpg ",
    "celebrity Night/DSC01751.jpg ",
    "celebrity Night/DSC01924.jpg ",
    "celebrity Night/DSC01948.jpg ",
    "celebrity Night/DSC01983.jpg ",
    "celebrity Night/DSC02015.jpg ",
    "celebrity Night/DSC02068.jpg ",
    "celebrity Night/DSC08591.jpg ",
    "celebrity Night/TUS08719.jpg ",
    "celebrity Night/TUS09066.jpg ",
    "celebrity Night/TUS09112-Edit.jpg", 
    "celebrity Night/TUS09121-Edit.jpg ",
    "celebrity Night/TUS09241.jpg",
    "celebrity Night/TUS09285.jpg"
];

// Dynamically populate the photo grid
const photoGrid = document.getElementById('photoGrid');
imageSources.slice(0, 12).forEach((source, index) => {
    const img = document.createElement('img');
    img.src = source;
    img.alt = `College Fest Image ${index + 1}`;
    img.classList.add('grid-image');
    img.onclick = () => openLightbox(index + 1);
    photoGrid.appendChild(img);
});

// Lightbox functionality
let currentSlideIndex = 1;
let touchStartX = 0;
let touchEndX = 0;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'block'; // Show the lightbox
        showSlides(index);
        toggleEventListeners('add'); // Add event listeners
    } else {
        console.error('Lightbox element not found');
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none'; // Hide the lightbox
        toggleEventListeners('remove'); // Remove event listeners
    }
}

function plusSlides(n) {
    showSlides(currentSlideIndex += n);
}

function showSlides(index) {
    const lightboxSlides = document.getElementById('lightboxSlides');
    lightboxSlides.innerHTML = '';  // Clear existing slides

    currentSlideIndex = index;
    if (index > imageSources.length) { 
        currentSlideIndex = 1; 
    }
    if (index < 1) { 
        currentSlideIndex = imageSources.length; 
    }

    // Create the current slide
    const slide = document.createElement('img');
    slide.src = imageSources[currentSlideIndex - 1];
    slide.alt = `College Fest Image ${currentSlideIndex}`;
    slide.classList.add('lightbox-image'); // Add a class for the slide
    lightboxSlides.appendChild(slide);
}

// Helper function to manage event listeners
function toggleEventListeners(action) {
    const method = action === 'add' ? 'addEventListener' : 'removeEventListener';
    document[method]('keydown', handleKeyPress);
    document[method]('touchstart', handleTouchStart);
    document[method]('touchmove', handleTouchMove);
    document[method]('click', handleClickOutside);
}

// Function to handle keyboard events
function handleKeyPress(event) {
    switch (event.key) {
        case 'Escape': // Close lightbox
            closeLightbox();
            break;
        case 'ArrowRight': // Next image
            plusSlides(1);
            break;
        case 'ArrowLeft': // Previous image
            plusSlides(-1);
            break;
    }
}

// Functions to handle swipe gestures
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].clientX;
}

function handleTouchMove(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipeGesture();
}

function handleSwipeGesture() {
    if (touchEndX < touchStartX - 50) {
        // Swipe left
        plusSlides(1);
    } else if (touchEndX > touchStartX + 50) {
        // Swipe right
        plusSlides(-1);
    }
}

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


// Function to show video section when photo grid is in view
const showVideoSectionOnScroll = () => {
    const photoGridRect = photoGrid.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Check if the photo grid is in view
    if (photoGridRect.top < viewportHeight && photoGridRect.bottom > 0) {
        videoSection.classList.remove("hidden"); // Remove the hidden class to show the video section
        window.removeEventListener("scroll", showVideoSectionOnScroll); // Remove the event listener after showing
    }
};

window.addEventListener("scroll", showVideoSectionOnScroll);

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
