// Professional AI Portfolio JavaScript

class ProfessionalPortfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupContactForm();
        this.setupScrollEffects();
        this.setupAnimations();
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                this.updateActiveNav(link);
            });
        });

        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavOnScroll();
        });
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const headerHeight = 80;
            const sectionTop = section.offsetTop - headerHeight;
            
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    this.updateActiveNav(activeLink);
                }
            }
        });
    }

    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit(e);
            });
        }
    }

    async handleContactSubmit(e) {
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateForm(data)) {
            return;
        }

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
            
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateForm(data) {
        const required = ['name', 'email', 'message'];
        const missing = required.filter(field => !data[field]?.trim());
        
        if (missing.length > 0) {
            this.showNotification(`Please fill in: ${missing.join(', ')}`, 'error');
            return false;
        }
        
        if (!this.isValidEmail(data.email)) {
            this.showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    async simulateFormSubmission(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', data);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
    }

    setupScrollEffects() {
        // Header scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.professional-header');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }

    setupAnimations() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.phase-card, .project-card, .skill-category, .contact-item').forEach(el => {
            observer.observe(el);
        });

        // Counter animation for hero stats
        this.animateCounters();
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const text = counter.textContent;
            const hasPlus = text.includes('+');
            const hasPercent = text.includes('%');
            const number = parseInt(text.replace(/[^0-9]/g, ''));
            
            if (isNaN(number)) return;
            
            let current = 0;
            const increment = number / 50;
            
            const updateCounter = () => {
                if (current < number) {
                    current += increment;
                    let displayValue = Math.ceil(current);
                    
                    if (hasPlus) displayValue += '+';
                    if (hasPercent) displayValue += '%';
                    
                    counter.textContent = displayValue;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = text;
                }
            };
            
            // Start animation when element is visible
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
}

// Global scroll function for buttons
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 80;
        const sectionTop = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ProfessionalPortfolio();
});

// Add notification styles
const notificationStyles = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        border-left: 4px solid #2563eb;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left-color: #10b981;
    }

    .notification.error {
        border-left-color: #ef4444;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }

    .notification-content i {
        font-size: 1.25rem;
    }

    .notification.success .notification-content i {
        color: #10b981;
    }

    .notification.error .notification-content i {
        color: #ef4444;
    }

    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #64748b;
        padding: 0.5rem;
        border-radius: 6px;
        transition: all 0.3s ease;
    }

    .notification-close:hover {
        background: #f1f5f9;
        color: #1e293b;
    }

    .professional-header.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);