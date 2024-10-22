// Array of image sources
const imageSources = [
    "College Fest/CHA06352.jpg",
    "College Fest/CHA08539.jpg",
    "College Fest/CHA08580.jpg",
    "College Fest/CHA08642.jpg",
    "College Fest/CHA08882.jpg",
    "College Fest/CHA09929.jpg",
    "College Fest/DSC_0268.jpg",
    "College Fest/DSC_8098.jpg",
    "College Fest/DSC_9464.jpg",
    "College Fest/DSC07519.jpg",
    "College Fest/DSC08080.jpg",
    "College Fest/DSC08192.jpg",
    // extra photos
    "College Fest/Extra/CHA00242.jpg",
    "College Fest/Extra/CHA00288.jpg",
    "College Fest/Extra/CHA00348.jpg",
    "College Fest/Extra/CHA00496.jpg",
    "College Fest/Extra/CHA06712.jpg",
    "College Fest/Extra/CHA06896.jpg",
    "College Fest/Extra/CHA06990.jpg",
    "College Fest/Extra/CHA07227.jpg",
    "College Fest/Extra/CHA07537.jpg",
    "College Fest/Extra/CHA08113.jpg",
    "College Fest/Extra/CHA08138.jpg",
    "College Fest/Extra/CHA08776.jpg",
    "College Fest/Extra/CHA09706.jpg",
    "College Fest/Extra/DSC_0016.jpg",
    "College Fest/Extra/DSC_0050.jpg",
    "College Fest/Extra/DSC_0069.jpg",
    "College Fest/Extra/DSC_0663.jpg",
    "College Fest/Extra/DSC_0685.jpg",
    "College Fest/Extra/DSC_5677.jpg",
    "College Fest/Extra/DSC_8187.jpg",
    "College Fest/Extra/DSC_8655.jpg",
    "College Fest/Extra/DSC_8723.jpg",
    "College Fest/Extra/DSC_9031.jpg",
    "College Fest/Extra/DSC_9054.jpg",
    "College Fest/Extra/DSC_9062.jpg",
    "College Fest/Extra/DSC_9111.jpg",
    "College Fest/Extra/DSC_9116.jpg",
    "College Fest/Extra/DSC_9255.jpg",
    "College Fest/Extra/DSC_9442.jpg",
    "College Fest/Extra/DSC_9459.jpg",
    "College Fest/Extra/DSC_9561.jpg",
    "College Fest/Extra/DSC_9622.jpg",
    "College Fest/Extra/DSC_9728.jpg",
    "College Fest/Extra/DSC01058.jpg",
    "College Fest/Extra/DSC01090.jpg",
    "College Fest/Extra/DSC01094.jpg",
    "College Fest/Extra/DSC01102.jpg",
    "College Fest/Extra/DSC01187.jpg",
    "College Fest/Extra/DSC01649.jpg",
    "College Fest/Extra/DSC07589.jpg",
    "College Fest/Extra/DSC07666.jpg",
    "College Fest/Extra/DSC07737.jpg",
    "College Fest/Extra/DSC07839.jpg",
    "College Fest/Extra/DSC08066.jpg",
    "College Fest/Extra/TUS08206.jpg",
    "College Fest/Extra/TUS08266.jpg",
    "College Fest/Extra/TUS08281.jpg"
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

// Menu toggle functionality
const menuToggle = document.getElementById('menuToggle');
const overlayMenu = document.getElementById('overlayMenu');
menuToggle.addEventListener('click', function () {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.classList.toggle('open');
    overlayMenu.classList.toggle('open');
    
    if (!isExpanded) {
        // Show menu items with a delay for animation
        const menuItems = document.querySelectorAll('.overlay-menu-list li');
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show');
            }, index * 100);
        });
    }
});
