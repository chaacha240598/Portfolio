// Toggle overlay menu
const menuToggle = document.getElementById('menuToggle');
const overlayMenu = document.getElementById('overlayMenu');
const menuItems = document.querySelectorAll('.overlay-menu-list li');

menuToggle.addEventListener('click', function () {
    const isOpen = overlayMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
    menuToggle.classList.toggle('open');
    
    // Update aria-expanded attribute
    menuToggle.setAttribute('aria-expanded', isOpen);

    if (isOpen) {
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('show'); // Add 'show' class to animate items
            }, index * 150); // Stagger the animation by 150ms per item
        });
    } else {
        menuItems.forEach(item => {
            item.classList.remove('show'); // Remove 'show' class when closing
        });
    }
});

// Close overlay menu when clicking outside of it
overlayMenu.addEventListener('click', function (event) {
    if (event.target === overlayMenu) {
        overlayMenu.classList.remove('open');
        menuToggle.classList.remove('open'); // Remove 'open' class from toggle
        document.body.classList.remove('no-scroll'); // Allow scrolling
        menuToggle.setAttribute('aria-expanded', 'false'); // Update aria-expanded attribute
        menuItems.forEach(item => {
            item.classList.remove('show'); // Remove 'show' class on close
        });
    }
});
