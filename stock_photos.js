document.addEventListener("DOMContentLoaded", function () {
    // Array of image sources
    const imageSources = [
        "Stock photos/CHA03193.jpg", 
        "Stock photos/CHA05414.jpg" ,
        "Stock photos/CHA05883.jpg" ,
        "Stock photos/DSC_1741.jpg" ,
        "Stock photos/DSC_3615.jpg" ,
        "Stock photos/DSC_4529.jpg" ,
        "Stock photos/DSC_5009.jpg" ,
        "Stock photos/DSC_5399.jpg" ,
        "Stock photos/DSC_5831.jpg" ,
        "Stock photos/DSC_6033.jpg",
        "Stock photos/DSC_7738.jpg" ,
        "Stock photos/DSC_8641.jpg",
    // extra photos
    "Stock photos/Extra Photos/CHA09425.jpg", 
    "Stock photos/Extra Photos/DSC_0158.jpg" ,
    "Stock photos/Extra Photos/DSC_0160.jpg" ,
    "Stock photos/Extra Photos/DSC_0266.jpg" ,
    "Stock photos/Extra Photos/DSC_5418.jpg" ,
    "Stock photos/Extra Photos/DSC_5607.jpg" ,
    "Stock photos/Extra Photos/DSC_7202.jpg" ,
    "Stock photos/Extra Photos/DSC_8316.jpg",
    ];

    const photoGrid = document.getElementById("photoGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const thumbnailBar = document.getElementById("thumbnailBar");
    const closeButton = document.querySelector(".lightbox .close");
    const nextButton = document.querySelector(".lightbox .next");
    const prevButton = document.querySelector(".lightbox .prev");

    let currentIndex = 0;

    // Populate the photo grid with first 12 images
    imageSources.slice(0, 12).forEach((source, index) => {
        const img = document.createElement("img");
        img.src = source;
        img.alt = `College Fest Image ${index + 1}`;
        img.classList.add("grid-image");
        img.onclick = () => openLightbox(index);
        photoGrid.appendChild(img);
    });

    function openLightbox(index) {
        currentIndex = index;
        lightbox.style.display = "flex";
        updateLightbox();
    }

    function closeLightbox() {
        lightbox.style.display = "none";
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        updateLightbox();
    }

    function updateLightbox() {
        lightboxImage.src = imageSources[currentIndex];
        updateThumbnails();
    }

    function updateThumbnails() {
        thumbnailBar.innerHTML = "";
        let visibleThumbnails = 21;

        for (let i = 0; i < visibleThumbnails; i++) {
            let index = (currentIndex - 10 + i + imageSources.length) % imageSources.length; // CD Effect
            const thumb = document.createElement("img");
            thumb.src = imageSources[index];
            thumb.classList.add("thumbnail");
            if (index === currentIndex) thumb.classList.add("active");
            thumb.onclick = () => openLightbox(index);
            thumbnailBar.appendChild(thumb);
        }
    }

    // Lightbox controls
    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", nextImage);
    prevButton.addEventListener("click", prevImage);

    // Keyboard navigation
    document.addEventListener("keydown", function (event) {
        if (lightbox.style.display !== "flex") return; // Ensure lightbox is open

        if (event.key === "ArrowRight") {
            nextImage();
        } else if (event.key === "ArrowLeft") {
            prevImage();
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    });

    // Close lightbox when clicking outside image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Initialize Thumbnails on first load
    updateThumbnails();


    // Swipe gesture handling
    lightbox.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const swipeThreshold = 50;

        if (touchStartX - touchEndX > swipeThreshold) {
            nextImage();
            setTimeout(centerActiveThumbnail, 300);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            prevImage();
            setTimeout(centerActiveThumbnail, 300);
        }
    }

    // Close lightbox when clicking outside image
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });


    // Toggle overlay menu
const menuToggle = document.getElementById('menuToggle');
const overlayMenu = document.getElementById('overlayMenu');
const menuItems = document.querySelectorAll('.overlay-menu-list li a'); // Select anchor tags

menuToggle.addEventListener('click', function () {
    const isOpen = overlayMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    menuToggle.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.parentElement.classList.add('show');
            }, index * 150);
        });
        setTimeout(() => {
            if (menuItems.length > 0) { // Check if there are menu items
                menuItems[0].focus(); // Set focus to the first menu item
            }
        }, menuItems.length * 150); // Delay focus until animations finish
    } else {
        menuItems.forEach(item => {
            item.parentElement.classList.remove('show');
        });
        menuToggle.focus(); // Return focus to the menu toggle
    }
});

// Close menu when clicking outside
document.addEventListener('click', function (event) {
    if (!menuToggle.contains(event.target) && !overlayMenu.contains(event.target)) {
        overlayMenu.classList.remove('open');
        menuToggle.classList.remove('open');
        document.body.classList.remove('no-scroll');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuItems.forEach(item => item.parentElement.classList.remove('show'));
    }
});

// Close menu with Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && overlayMenu.classList.contains('open')) {
        menuToggle.click();
    }
});
});


