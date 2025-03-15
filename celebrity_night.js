document.addEventListener("DOMContentLoaded", function () {
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

