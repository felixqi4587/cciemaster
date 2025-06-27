// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    }
}

// Initialize mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && menuToggle && 
            !mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileMenu && menuToggle) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (mobileMenu && menuToggle) {
                mobileMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Touch swipe support for mobile carousel
function addSwipeSupport() {
    const carousel = document.querySelector('.success-carousel');
    if (!carousel) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    carousel.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });

    carousel.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;

        const diffX = startX - currentX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && typeof scrollCarousel === 'function') {
                scrollCarousel(1); // Swipe left, go to next
            } else if (diffX < 0 && typeof scrollCarousel === 'function') {
                scrollCarousel(-1); // Swipe right, go to previous
            }
        }
    });
}

// Initialize swipe support when DOM is loaded
document.addEventListener('DOMContentLoaded', addSwipeSupport); 