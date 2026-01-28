// Header Component with Advanced Features
class Header {
    constructor() {
        this.isScrolled = false;
        this.isMobileMenuOpen = false;
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
        this.setupScrollEffect();
    }

    render() {
        const headerHTML = `
            <header class="header" id="header">
                <nav class="navbar">
                    <div class="nav-container">
                        <div class="nav-brand">
                            <img src="assets/profile-image.jpg" 
                                 alt="Pavan Kumar" class="brand-logo" id="brand-logo" 
                                 onerror="this.src='https://via.placeholder.com/40x40/667eea/ffffff?text=PK'">
                            <span class="brand-text">Pavan Kumar Korlakunta</span>
                        </div>
                        
                        <ul class="nav-menu" id="nav-menu">
                            <li class="nav-item">
                                <a href="#home" class="nav-link" data-section="home">
                                    <i class="fas fa-home"></i>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#learning" class="nav-link" data-section="learning">
                                    <i class="fas fa-graduation-cap"></i>
                                    <span>AI Learning</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#about" class="nav-link" data-section="about">
                                    <i class="fas fa-user"></i>
                                    <span>About</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#github" class="nav-link" data-section="github">
                                    <i class="fab fa-github"></i>
                                    <span>GitHub</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#linkedin" class="nav-link" data-section="linkedin">
                                    <i class="fab fa-linkedin"></i>
                                    <span>LinkedIn</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#education" class="nav-link" data-section="education">
                                    <i class="fas fa-university"></i>
                                    <span>Education</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#projects" class="nav-link" data-section="projects">
                                    <i class="fas fa-code"></i>
                                    <span>Projects</span>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a href="#contact" class="nav-link" data-section="contact">
                                    <i class="fas fa-envelope"></i>
                                    <span>Contact</span>
                                </a>
                            </li>
                        </ul>
                        
                        <div class="nav-actions">
                            <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
                                <i class="fas fa-moon"></i>
                            </button>
                            <div class="profile-upload">
                                <img src="assets/profile-image.jpg" 
                                     alt="Profile" class="profile-image" id="profile-image"
                                     onerror="this.src='https://via.placeholder.com/45x45/667eea/ffffff?text=PK'">
                                <input type="file" id="image-upload" accept="image/*" hidden>
                                <button class="upload-btn" onclick="document.getElementById('image-upload').click()">
                                    <i class="fas fa-camera"></i>
                                </button>
                            </div>
                        </div>
                        
                        <button class="mobile-toggle" id="mobile-toggle">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </button>
                    </div>
                </nav>
            </header>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        mobileToggle.addEventListener('click', () => {
            this.isMobileMenuOpen = !this.isMobileMenuOpen;
            navMenu.classList.toggle('active', this.isMobileMenuOpen);
            mobileToggle.classList.toggle('active', this.isMobileMenuOpen);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Close mobile menu
                if (this.isMobileMenuOpen) {
                    navMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    this.isMobileMenuOpen = false;
                }
                
                // Update active link
                this.updateActiveLink(link);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const icon = themeToggle.querySelector('i');
            icon.className = document.body.classList.contains('light-theme') 
                ? 'fas fa-sun' : 'fas fa-moon';
            
            // Save theme preference
            localStorage.setItem('theme', 
                document.body.classList.contains('light-theme') ? 'light' : 'dark'
            );
        });

        // Profile image upload
        const imageUpload = document.getElementById('image-upload');
        const profileImage = document.getElementById('profile-image');
        
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                    document.getElementById('brand-logo').src = e.target.result;
                    localStorage.setItem('profileImage', e.target.result);
                };
                reader.readAsDataURL(file);
            }
        });

        // Load saved preferences
        this.loadSavedPreferences();
    }

    setupScrollEffect() {
        let ticking = false;
        
        const updateHeader = () => {
            const scrollTop = window.pageYOffset;
            const header = document.getElementById('header');
            
            if (scrollTop > 100 && !this.isScrolled) {
                this.isScrolled = true;
                header.classList.add('scrolled');
            } else if (scrollTop <= 100 && this.isScrolled) {
                this.isScrolled = false;
                header.classList.remove('scrolled');
            }
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    updateActiveLink(activeLink) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    loadSavedPreferences() {
        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-toggle').querySelector('i').className = 'fas fa-sun';
        }

        // Load profile image
        const savedImage = localStorage.getItem('profileImage');
        if (savedImage) {
            document.getElementById('profile-image').src = savedImage;
            document.getElementById('brand-logo').src = savedImage;
        }
    }
}

export default Header;