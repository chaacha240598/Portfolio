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
