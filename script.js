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