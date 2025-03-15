document.addEventListener("DOMContentLoaded", function () {
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
        // Extra photos
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


    // Menu toggle functionality
    const menuToggle = document.getElementById("menuToggle");
    const overlayMenu = document.getElementById("overlayMenu");
    const overlayMenuItems = document.querySelectorAll(".overlay-menu-list li");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open");
        overlayMenu.classList.toggle("open");

        if (overlayMenu.classList.contains("open")) {
            overlayMenuItems.forEach((item, index) => {
                setTimeout(() => item.classList.add("show"), index * 100);
            });
        } else {
            overlayMenuItems.forEach((item) => item.classList.remove("show"));
        }
    });
});

