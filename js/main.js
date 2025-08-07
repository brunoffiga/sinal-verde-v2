// =========================
// MAIN JAVASCRIPT FILE
// =========================

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    // Dropdown Menu Handler
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Prevent default link behavior for dropdown toggle
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // On mobile, toggle the dropdown
            if (window.innerWidth <= 768) {
                dropdown.classList.toggle('active');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
            
            // Animate hamburger menu
            this.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
        
        // Close menu when clicking a link (except dropdown toggle)
        const navLinks = navMenu.querySelectorAll('a:not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Only close if it's not inside a dropdown menu or if it IS inside dropdown menu
                if (!link.classList.contains('dropdown-toggle')) {
                    const isInsideDropdown = link.closest('.dropdown-menu');
                    if (isInsideDropdown || !link.closest('.dropdown')) {
                        navMenu.classList.remove('active');
                        body.classList.remove('menu-open');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            });
        });
    }
});

// Number Counter Animation
function animateNumbers() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const increment = target / 100;
        
        const updateCounter = () => {
            const current = +counter.innerText;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(updateCounter, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Initialize number animation
if (document.querySelector('.stat-number')) {
    animateNumbers();
}

// Form Validation
function validateForm(formElement) {
    const requiredFields = formElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        const value = field.value.trim();
        const fieldContainer = field.parentElement;
        
        // Remove previous error states
        fieldContainer.classList.remove('error');
        const errorMsg = fieldContainer.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
        
        // Check if field is empty
        if (!value) {
            isValid = false;
            fieldContainer.classList.add('error');
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = 'Este campo é obrigatório';
            fieldContainer.appendChild(error);
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                fieldContainer.classList.add('error');
                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = 'Digite um e-mail válido';
                fieldContainer.appendChild(error);
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\(\)\-\+]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                isValid = false;
                fieldContainer.classList.add('error');
                const error = document.createElement('span');
                error.className = 'error-message';
                error.textContent = 'Digite um telefone válido';
                fieldContainer.appendChild(error);
            }
        }
    });
    
    return isValid;
}

// File Upload Validation
function validateFileUpload(fileInput) {
    const file = fileInput.files[0];
    const maxSize = 4 * 1024 * 1024; // 4MB
    const allowedTypes = ['application/pdf', 'application/msword', 
                          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                          'image/jpeg', 'image/png', 'image/jpg'];
    
    if (file) {
        // Check file size
        if (file.size > maxSize) {
            alert('O arquivo não pode ser maior que 4MB');
            fileInput.value = '';
            return false;
        }
        
        // Check file type
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo não permitido. Use PDF, DOC, DOCX, JPG ou PNG.');
            fileInput.value = '';
            return false;
        }
        
        return true;
    }
    
    return true;
}

// Handle Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Mensagem enviada com sucesso!</h3>
                    <p>Entraremos em contato em até 24 horas.</p>
                `;
                this.appendChild(successMessage);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }, 2000);
        }
    });
    
    // File input handler
    const fileInput = contactForm.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            validateFileUpload(this);
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Scroll Effect
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Cookie Consent (if needed for compliance)
function initCookieConsent() {
    if (!localStorage.getItem('cookieConsent')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.innerHTML = `
            <div class="cookie-content">
                <p>Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa <a href="politica-privacidade.html">Política de Privacidade</a>.</p>
                <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Aceitar</button>
            </div>
        `;
        document.body.appendChild(cookieBanner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.cookie-banner').remove();
}

// Initialize cookie consent on page load
window.addEventListener('load', initCookieConsent);

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Phone Mask
function phoneMask(input) {
    let value = input.value.replace(/\D/g, '');
    let formattedValue = '';
    
    if (value.length > 0) {
        formattedValue = '(' + value.substring(0, 2);
    }
    if (value.length >= 3) {
        formattedValue += ') ' + value.substring(2, 7);
    }
    if (value.length >= 8) {
        formattedValue += '-' + value.substring(7, 11);
    }
    
    input.value = formattedValue;
}

// Apply phone mask to tel inputs
document.querySelectorAll('input[type="tel"]').forEach(input => {
    input.addEventListener('input', function() {
        phoneMask(this);
    });
});

// Export functions for global use
window.validateForm = validateForm;
window.validateFileUpload = validateFileUpload;
window.acceptCookies = acceptCookies;