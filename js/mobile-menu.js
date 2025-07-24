// Mobile Menu Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle) {
        const isOpen = mobileMenu.classList.contains('active');
        
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Update ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', !isOpen);
        menuToggle.setAttribute('aria-label', !isOpen ? 'Close navigation menu' : 'Open navigation menu');
    }
}

// Close mobile menu function
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && menuToggle) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
}

// Initialize mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
            menuToggle.focus(); // Return focus to toggle button
        }
        
        // Tab trapping when mobile menu is open
        if (e.key === 'Tab' && mobileMenu && mobileMenu.classList.contains('active')) {
            const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && menuToggle && 
            !mobileMenu.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            closeMobileMenu();
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-list a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
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