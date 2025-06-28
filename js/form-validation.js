// Enhanced Form Validation with Accessibility
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Form validation rules
    const validationRules = {
        firstName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'First name must be at least 2 characters and contain only letters'
        },
        lastName: {
            required: true,
            minLength: 2,
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Last name must be at least 2 characters and contain only letters'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        message: {
            required: true,
            minLength: 10,
            message: 'Message must be at least 10 characters long'
        }
    };

    // Create error message container
    function createErrorMessage(fieldName, message) {
        const errorId = `${fieldName}-error`;
        let errorElement = document.getElementById(errorId);
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = errorId;
            errorElement.className = 'form-error';
            errorElement.setAttribute('role', 'alert');
            errorElement.setAttribute('aria-live', 'polite');
        }
        
        errorElement.textContent = message;
        return errorElement;
    }

    // Validate individual field
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = validationRules[fieldName];
        
        if (!rules) return true;

        // Remove existing error
        const existingError = document.getElementById(`${fieldName}-error`);
        if (existingError) {
            existingError.remove();
        }
        
        field.classList.remove('form-error-field');
        field.removeAttribute('aria-describedby');

        // Required validation
        if (rules.required && !value) {
            showFieldError(field, `${getFieldLabel(field)} is required`);
            return false;
        }

        // Skip other validations if field is empty and not required
        if (!value) return true;

        // Length validation
        if (rules.minLength && value.length < rules.minLength) {
            showFieldError(field, rules.message);
            return false;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            showFieldError(field, rules.message);
            return false;
        }

        return true;
    }

    // Show field error
    function showFieldError(field, message) {
        const errorElement = createErrorMessage(field.name, message);
        field.classList.add('form-error-field');
        field.setAttribute('aria-describedby', `${field.name}-error`);
        
        // Insert error message after the field
        field.parentNode.appendChild(errorElement);
    }

    // Get field label text
    function getFieldLabel(field) {
        const label = document.querySelector(`label[for="${field.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : field.name;
    }

    // Real-time validation
    contactForm.addEventListener('blur', function(e) {
        if (e.target.matches('input, textarea, select')) {
            validateField(e.target);
        }
    }, true);

    // Form submission validation
    contactForm.addEventListener('submit', function(e) {
        let isValid = true;
        const formData = new FormData(this);
        
        // Validate all fields
        const fields = this.querySelectorAll('input[required], textarea[required], select[required]');
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            e.preventDefault();
            
            // Focus on first error field
            const firstError = this.querySelector('.form-error-field');
            if (firstError) {
                firstError.focus();
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            
            // Show general error message
            showFormMessage('Please correct the errors above and try again.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Reset button state after delay (for back button scenarios)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });

    // Show form message
    function showFormMessage(message, type = 'success') {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = `form-message form-message-${type}`;
        messageElement.setAttribute('role', 'alert');
        messageElement.setAttribute('aria-live', 'polite');
        messageElement.textContent = message;

        // Insert at top of form
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Auto-remove success messages
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }

    // Check for success parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        showFormMessage('Thank you! Your message has been sent successfully. We\'ll get back to you within 3 hours.', 'success');
        
        // Clear the URL parameter
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
    }

    // Enhance select accessibility
    const selects = contactForm.querySelectorAll('select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });

    // Add character counter for textarea
    const messageField = contactForm.querySelector('#message');
    if (messageField) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.setAttribute('aria-live', 'polite');
        messageField.parentNode.appendChild(counter);

        function updateCounter() {
            const length = messageField.value.length;
            const minLength = 10;
            const remaining = Math.max(0, minLength - length);
            
            if (remaining > 0) {
                counter.textContent = `${remaining} more characters needed`;
                counter.className = 'character-counter character-counter-warning';
            } else {
                counter.textContent = `${length} characters`;
                counter.className = 'character-counter character-counter-success';
            }
        }

        messageField.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }
}); 