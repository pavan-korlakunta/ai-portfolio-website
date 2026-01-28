// Hero Component with Advanced Animations
class Hero {
    constructor() {
        this.typingIndex = 0;
        this.typingText = "Hello, I'm";
        this.isTyping = false;
        this.particles = [];
        this.init();
    }

    init() {
        this.render();
        this.setupAnimations();
        this.setupParticles();
    }

    render() {
        const heroHTML = `
            <section id="home" class="hero">
                <canvas class="particles-canvas" id="particles-canvas"></canvas>
                
                <div class="hero-content">
                    <div class="hero-text">
                        <div class="typing-container">
                            <span class="typing-text" id="typing-text"></span>
                            <span class="cursor">|</span>
                        </div>
                        <h1 class="hero-name">
                            <span class="name-part">Pavan Kumar</span>
                            <span class="name-part">Korlakunta</span>
                        </h1>
                        <div class="hero-roles">
                            <span class="role active">AI Expert</span>
                            <span class="role">ML Engineer</span>
                            <span class="role">Data Scientist</span>
                            <span class="role">Cloud Architect</span>
                            <span class="role">AI Educator</span>
                        </div>
                        <p class="hero-description">
                            Transforming complex problems into intelligent solutions across the entire AI spectrum. 
                            From classical ML to cutting-edge AI Agents, I architect and deploy production-ready 
                            systems while teaching others to master AI.
                        </p>
                        
                        <div class="hero-stats">
                            <div class="stat-card" data-count="3">
                                <div class="stat-number">0</div>
                                <div class="stat-label">Years Experience</div>
                            </div>
                            <div class="stat-card" data-count="50">
                                <div class="stat-number">0</div>
                                <div class="stat-label">Learning Resources</div>
                            </div>
                            <div class="stat-card" data-count="100">
                                <div class="stat-number">0</div>
                                <div class="stat-label">% Free Content</div>
                            </div>
                        </div>
                        
                        <div class="hero-actions">
                            <button class="btn btn-primary" onclick="document.getElementById('learning').scrollIntoView({behavior: 'smooth'})">
                                <i class="fas fa-graduation-cap"></i>
                                <span>Start Learning AI</span>
                                <div class="btn-glow"></div>
                            </button>
                            <button class="btn btn-secondary" onclick="document.getElementById('projects').scrollIntoView({behavior: 'smooth'})">
                                <i class="fas fa-rocket"></i>
                                <span>View Projects</span>
                            </button>
                            <button class="btn btn-outline" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                                <i class="fas fa-comments"></i>
                                <span>Get Mentorship</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="scroll-indicator">
                    <div class="scroll-mouse">
                        <div class="scroll-wheel"></div>
                    </div>
                    <span>Scroll to explore</span>
                </div>
            </section>
        `;
        
        document.body.insertAdjacentHTML('beforeend', heroHTML);
    }

    setupAnimations() {
        // Typing animation
        setTimeout(() => {
            this.startTyping();
        }, 1000);

        // Role rotation
        setTimeout(() => {
            this.startRoleRotation();
        }, 3000);

        // Counter animation
        setTimeout(() => {
            this.animateCounters();
        }, 2000);

        // Stagger animations for hero elements
        this.staggerAnimations();
    }

    startTyping() {
        const typingElement = document.getElementById('typing-text');
        this.isTyping = true;
        
        const typeChar = () => {
            if (this.typingIndex < this.typingText.length) {
                typingElement.textContent += this.typingText.charAt(this.typingIndex);
                this.typingIndex++;
                setTimeout(typeChar, 100);
            } else {
                this.isTyping = false;
                // Hide cursor after typing
                setTimeout(() => {
                    document.querySelector('.cursor').style.opacity = '0';
                }, 1000);
            }
        };
        
        typeChar();
    }

    startRoleRotation() {
        const roles = document.querySelectorAll('.role');
        let currentIndex = 0;
        
        setInterval(() => {
            roles[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % roles.length;
            roles[currentIndex].classList.add('active');
        }, 2000);
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-card');
        
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const numberElement = counter.querySelector('.stat-number');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    numberElement.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    numberElement.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    staggerAnimations() {
        const elements = [
            '.hero-name .name-part',
            '.hero-roles',
            '.hero-description',
            '.hero-stats',
            '.hero-actions'
        ];
        
        elements.forEach((selector, index) => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 1500 + (index * 200));
            }
        });
    }

    setupParticles() {
        const canvas = document.getElementById('particles-canvas');
        const ctx = canvas.getContext('2d');
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
        
        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(102, 126, 234, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Draw connections
            this.particles.forEach((particle, i) => {
                this.particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        const opacity = (100 - distance) / 100 * 0.1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

export default Hero;