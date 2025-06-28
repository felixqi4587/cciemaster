// Performance Optimizations JavaScript

// Enhanced Lazy Loading with Intersection Observer
function initEnhancedLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Critical Resource Preloading
function preloadCriticalResources() {
    const criticalResources = [
        { href: '/js/mobile-styles.css', as: 'style' },
        { href: '/js/mobile-menu.js', as: 'script' }
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.as === 'style') {
            link.onload = function() {
                this.onload = null;
                this.rel = 'stylesheet';
            };
        }
        document.head.appendChild(link);
    });
}

// Font Loading Optimization
function optimizeFontLoading() {
    if ('fonts' in document) {
        // Preload critical fonts
        const fontPromises = [];
        
        // Load system fonts first
        if (navigator.platform.includes('Mac')) {
            fontPromises.push(document.fonts.load('400 16px "SF Pro Display"'));
            fontPromises.push(document.fonts.load('600 16px "SF Pro Display"'));
        }

        Promise.all(fontPromises).then(() => {
            document.documentElement.classList.add('fonts-loaded');
        }).catch(() => {
            // Fallback to system fonts
            document.documentElement.classList.add('fonts-fallback');
        });
    }
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Core Web Vitals monitoring
    if ('PerformanceObserver' in window) {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // console.log('LCP:', entry.startTime); // Development only
            }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                // console.log('FID:', entry.processingStart - entry.startTime); // Development only
            }
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    // console.log('CLS:', entry.value); // Development only
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
}

// Service Worker Registration with Error Handling
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    // console.log('SW registered: ', registration); // Disabled for production
                    
                    // Check for updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                // New content available, show update notification
                                showUpdateNotification();
                            }
                        });
                    });
                })
                .catch(registrationError => {
                    // console.log('SW registration failed: ', registrationError); // Disabled for production
                });
        });
    }
}

// Update Notification
function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; background: var(--color-primary); color: white; padding: 16px; border-radius: 8px; z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="margin-bottom: 8px; font-weight: 600;">Website Updated</div>
            <div style="margin-bottom: 12px; font-size: 14px;">New content is available. Refresh to get the latest version.</div>
            <button onclick="window.location.reload()" style="background: white; color: var(--color-primary); border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 600;">Refresh</button>
            <button onclick="this.parentElement.parentElement.remove()" style="background: transparent; color: white; border: 1px solid white; padding: 8px 16px; border-radius: 4px; cursor: pointer; margin-left: 8px;">Later</button>
        </div>
    `;
    document.body.appendChild(notification);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 10000);
}

// Reduce Motion Support
function initReducedMotionSupport() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    function handleReducedMotion(e) {
        if (e.matches) {
            document.documentElement.classList.add('reduce-motion');
        } else {
            document.documentElement.classList.remove('reduce-motion');
        }
    }
    
    handleReducedMotion(prefersReducedMotion);
    prefersReducedMotion.addListener(handleReducedMotion);
}

// Connection-aware Loading
function initConnectionAwareLoading() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            // Disable non-critical animations and features for slow connections
            document.documentElement.classList.add('slow-connection');
        }
        
        if (connection.saveData) {
            // Respect data saver preference
            document.documentElement.classList.add('save-data');
        }
    }
}

// Initialize all optimizations
function initPerformanceOptimizations() {
    initEnhancedLazyLoading();
    optimizeFontLoading();
    initReducedMotionSupport();
    initConnectionAwareLoading();
    registerServiceWorker();
    
    // Development mode performance monitoring
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        initPerformanceMonitoring();
    }
}

// Run optimizations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
    initPerformanceOptimizations();
} 