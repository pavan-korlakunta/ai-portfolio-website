// Modern AI Portfolio Application
import Header from '../components/Header.js';
import Hero from '../components/Hero.js';
import LearningPath from '../components/LearningPath.js';

class AIPortfolioApp {
    constructor() {
        this.components = {};
        this.isLoaded = false;
        this.init();
    }

    async init() {
        try {
            // Show loading screen
            this.showLoadingScreen();
            
            // Initialize components
            await this.initializeComponents();
            
            // Setup global event listeners
            this.setupGlobalEvents();
            
            // Hide loading screen
            setTimeout(() => {
                this.hideLoadingScreen();
            }, 2000);
            
        } catch (error) {
            console.error('Error initializing app:', error);
            this.hideLoadingScreen();
        }
    }

    showLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            // Animate progress bar
            const progressBar = loadingScreen.querySelector('.progress-bar');
            if (progressBar) {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress >= 100) {
                        progress = 100;
                        clearInterval(interval);
                    }
                    progressBar.style.width = `${progress}%`;
                }, 100);
            }
        }
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                document.body.classList.add('loaded');
                this.isLoaded = true;
                this.triggerLoadedAnimations();
            }, 500);
        }
    }

    async initializeComponents() {
        // Initialize Header
        this.components.header = new Header();
        
        // Initialize Hero
        this.components.hero = new Hero();
        
        // Initialize Learning Path
        this.components.learningPath = new LearningPath();
        window.learningPath = this.components.learningPath;
        
        // Initialize other sections
        this.initializeAboutSection();
        this.initializeProjectsSection();
        this.initializeContactForm();
        
        console.log('All components initialized successfully');
    }

    initializeAboutSection() {
        // Skills radar chart
        const canvas = document.getElementById('skills-chart');
        if (canvas) {
            this.createSkillsChart(canvas);
        }
    }

    createSkillsChart(canvas) {
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 100;
        
        const skills = [
            { name: 'Machine Learning', level: 95 },
            { name: 'Deep Learning', level: 90 },
            { name: 'Computer Vision', level: 85 },
            { name: 'NLP', level: 88 },
            { name: 'MLOps', level: 92 },
            { name: 'Cloud AI', level: 87 },
            { name: 'Data Science', level: 93 },
            { name: 'AI Agents', level: 85 }
        ];
        
        const angleStep = (Math.PI * 2) / skills.length;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.stroke();
        }
        
        // Draw grid lines
        skills.forEach((_, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 1;
            ctx.stroke();
            
            // Draw labels
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            
            ctx.fillStyle = '#e0e0e0';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(skills[index].name, labelX, labelY);
        });
        
        // Draw skill levels
        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const skillRadius = (radius * skill.level) / 100;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.fill();
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw skill points
        skills.forEach((skill, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const skillRadius = (radius * skill.level) / 100;
            const x = centerX + Math.cos(angle) * skillRadius;
            const y = centerY + Math.sin(angle) * skillRadius;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#667eea';
            ctx.fill();
        });
    }

    initializeProjectsSection() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (projectsGrid) {
            const projects = [
                {
                    title: "Intelligent Document Processing System",
                    description: "End-to-end document processing using OCR, NLP, and ML classification with 94% accuracy.",
                    technologies: ["Python", "Tesseract OCR", "spaCy", "Scikit-learn"],
                    metrics: { accuracy: "94%", timeReduction: "75%" },
                    category: "nlp",
                    status: "production"
                },
                {
                    title: "Predictive Analytics Dashboard",
                    description: "ML pipeline for sales forecasting and customer behavior prediction with automated model selection.",
                    technologies: ["Python", "XGBoost", "Flask", "PostgreSQL"],
                    metrics: { accuracy: "92%", predictions: "50K+ daily" },
                    category: "ml",
                    status: "production"
                },
                {
                    title: "Smart Image Classification System",
                    description: "Deep learning system for automated image classification and quality control using CNN architectures.",
                    technologies: ["TensorFlow", "OpenCV", "CNN", "Flask"],
                    metrics: { accuracy: "96%", fps: "15 FPS" },
                    category: "cv",
                    status: "production"
                },
                {
                    title: "AI Learning Platform",
                    description: "Comprehensive learning platform with structured AI curriculum and progress tracking.",
                    technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage"],
                    metrics: { resources: "50+", phases: "6" },
                    category: "web",
                    status: "active"
                }
            ];
            
            projectsGrid.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
        }
    }

    createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-header">
                    <div class="project-status ${project.status}">${project.status}</div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-metrics">
                        ${Object.entries(project.metrics).map(([key, value]) => `
                            <div class="metric">
                                <span class="metric-value">${value}</span>
                                <span class="metric-label">${key}</span>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    
                    <div class="project-actions">
                        <button class="btn btn-primary btn-sm">
                            <i class="fas fa-eye"></i>
                            View Details
                        </button>
                        <button class="btn btn-outline btn-sm">
                            <i class="fab fa-github"></i>
                            Code
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
        }
    }

    async handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validateContactForm(data)) {
            return;
        }
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            e.target.reset();
            
        } catch (error) {
            this.showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }

    validateContactForm(data) {
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

    setupGlobalEvents() {
        // Smooth scrolling for all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });

        // Intersection Observer for scroll animations
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

        // Observe sections for animations
        document.querySelectorAll('section, .project-card, .contact-card').forEach(el => {
            observer.observe(el);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                document.querySelectorAll('.modal, .dropdown').forEach(el => {
                    el.classList.remove('active');
                });
            }
        });

        // Performance monitoring
        this.setupPerformanceMonitoring();
    }

    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            
            // Track Core Web Vitals
            this.trackWebVitals();
        });
    }

    trackWebVitals() {
        // Largest Contentful Paint
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        new PerformanceObserver((entryList) => {
            let clsValue = 0;
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            });
            console.log('CLS:', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }

    triggerLoadedAnimations() {
        // Trigger any animations that should happen after page load
        const animatedElements = document.querySelectorAll('[data-animate-on-load]');
        animatedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('animate-in');
            }, index * 100);
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.aiPortfolioApp = new AIPortfolioApp();
});

// Add loading screen styles
const loadingStyles = `
    .loading-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    }

    .loading-content {
        text-align: center;
        color: white;
    }

    .loading-logo {
        margin-bottom: 2rem;
    }

    .logo-animation {
        width: 80px;
        height: 80px;
        border: 3px solid #667eea;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        animation: pulse 2s infinite;
    }

    .logo-animation span {
        font-size: 2rem;
        font-weight: 900;
        color: #667eea;
    }

    .loading-text {
        margin-bottom: 2rem;
        font-size: 1.2rem;
        color: #b0b0b0;
    }

    .loading-progress {
        width: 200px;
        height: 4px;
        background: #333;
        border-radius: 2px;
        overflow: hidden;
        margin: 0 auto;
    }

    .progress-bar {
        height: 100%;
        background: linear-gradient(90deg, #667eea, #764ba2);
        width: 0%;
        transition: width 0.3s ease;
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification.success {
        border-left: 4px solid #4CAF50;
    }

    .notification.error {
        border-left: 4px solid #f44336;
    }

    .notification.info {
        border-left: 4px solid #2196F3;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: #666;
        padding: 0.5rem;
    }

    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

export default AIPortfolioApp;