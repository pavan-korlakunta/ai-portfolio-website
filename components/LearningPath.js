// Advanced Learning Path Component
class LearningPath {
    constructor() {
        this.currentPhase = 0;
        this.completedItems = new Set();
        this.bookmarkedItems = new Set();
        this.searchTerm = '';
        this.init();
    }

    init() {
        this.loadProgress();
        this.render();
        this.bindEvents();
        this.setupIntersectionObserver();
    }

    render() {
        const learningHTML = `
            <section id="learning" class="learning-path">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">Complete AI Learning Journey</h2>
                        <p class="section-subtitle">
                            From Zero to AI Expert - A structured path I've designed based on my 3+ years of experience
                        </p>
                        
                        <div class="learning-controls">
                            <div class="search-box">
                                <i class="fas fa-search"></i>
                                <input type="text" placeholder="Search learning resources..." id="learning-search">
                            </div>
                            <div class="filter-buttons">
                                <button class="filter-btn active" data-difficulty="all">All Levels</button>
                                <button class="filter-btn" data-difficulty="beginner">Beginner</button>
                                <button class="filter-btn" data-difficulty="intermediate">Intermediate</button>
                                <button class="filter-btn" data-difficulty="advanced">Advanced</button>
                                <button class="filter-btn" data-difficulty="expert">Expert</button>
                            </div>
                            <div class="view-toggle">
                                <button class="view-btn active" data-view="phases">
                                    <i class="fas fa-list"></i> Phases
                                </button>
                                <button class="view-btn" data-view="progress">
                                    <i class="fas fa-chart-line"></i> Progress
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="progress-overview">
                        <div class="progress-stats">
                            <div class="progress-item">
                                <div class="progress-circle" data-progress="0">
                                    <span class="progress-text">0%</span>
                                </div>
                                <span class="progress-label">Overall Progress</span>
                            </div>
                            <div class="progress-item">
                                <div class="progress-number" id="completed-count">0</div>
                                <span class="progress-label">Completed Resources</span>
                            </div>
                            <div class="progress-item">
                                <div class="progress-number" id="bookmarked-count">0</div>
                                <span class="progress-label">Bookmarked</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="learning-content" id="learning-content">
                        ${this.renderPhases()}
                    </div>
                    
                    <div class="learning-cta">
                        <div class="cta-content">
                            <h3>Ready to Master AI?</h3>
                            <p>Join thousands of learners who have successfully followed this path!</p>
                            <div class="cta-actions">
                                <button class="btn btn-primary btn-large" onclick="document.getElementById('contact').scrollIntoView({behavior: 'smooth'})">
                                    <i class="fas fa-rocket"></i>
                                    Get Personal Mentorship
                                </button>
                                <button class="btn btn-outline btn-large" onclick="window.open('https://github.com/pavan6570', '_blank')">
                                    <i class="fab fa-github"></i>
                                    Follow My Journey
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        
        document.body.insertAdjacentHTML('beforeend', learningHTML);
    }

    renderPhases() {
        const phases = [
            {
                id: 1,
                title: "Programming Foundation",
                description: "Master the essential programming languages for AI",
                icon: "fas fa-code",
                color: "#4CAF50",
                items: [
                    {
                        title: "Python Programming",
                        description: "Core language for AI/ML development",
                        difficulty: "beginner",
                        estimatedTime: "4-6 weeks",
                        links: [
                            { title: "Official Tutorial", url: "https://python.org/about/gettingstarted/", icon: "fas fa-external-link-alt" },
                            { title: "Interactive Course", url: "https://www.codecademy.com/learn/learn-python-3", icon: "fas fa-code" },
                            { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", icon: "fas fa-graduation-cap" }
                        ]
                    },
                    {
                        title: "SQL & Databases",
                        description: "Essential for data manipulation and storage",
                        difficulty: "beginner",
                        estimatedTime: "2-3 weeks",
                        links: [
                            { title: "SQL Tutorial", url: "https://www.w3schools.com/sql/", icon: "fas fa-database" },
                            { title: "Interactive SQL", url: "https://sqlbolt.com/", icon: "fas fa-play" },
                            { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", icon: "fas fa-elephant" }
                        ]
                    },
                    {
                        title: "R Programming",
                        description: "Statistical computing and data analysis",
                        difficulty: "intermediate",
                        estimatedTime: "3-4 weeks",
                        links: [
                            { title: "R Official", url: "https://www.r-project.org/about.html", icon: "fas fa-chart-bar" },
                            { title: "DataCamp R", url: "https://www.datacamp.com/courses/free-introduction-to-r", icon: "fas fa-graduation-cap" }
                        ]
                    }
                ]
            },
            {
                id: 2,
                title: "Data Science Fundamentals",
                description: "Statistics, data analysis, and visualization",
                icon: "fas fa-chart-line",
                color: "#FF9800",
                items: [
                    {
                        title: "Statistics & Mathematics",
                        description: "Foundation for understanding ML algorithms",
                        difficulty: "intermediate",
                        estimatedTime: "6-8 weeks",
                        links: [
                            { title: "Khan Academy Stats", url: "https://www.khanacademy.org/math/statistics-probability", icon: "fas fa-calculator" },
                            { title: "Stanford Statistics", url: "https://www.coursera.org/learn/stanford-statistics", icon: "fas fa-university" },
                            { title: "Think Stats", url: "https://greenteapress.com/thinkstats2/", icon: "fas fa-book" }
                        ]
                    },
                    {
                        title: "Pandas & NumPy",
                        description: "Data manipulation and numerical computing",
                        difficulty: "beginner",
                        estimatedTime: "3-4 weeks",
                        links: [
                            { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/getting_started/index.html", icon: "fas fa-table" },
                            { title: "NumPy Learn", url: "https://numpy.org/learn/", icon: "fas fa-square-root-alt" },
                            { title: "10 Minutes to Pandas", url: "https://pandas.pydata.org/docs/user_guide/10min.html", icon: "fas fa-clock" }
                        ]
                    },
                    {
                        title: "Data Visualization",
                        description: "Matplotlib, Seaborn, Plotly for insights",
                        difficulty: "beginner",
                        estimatedTime: "2-3 weeks",
                        links: [
                            { title: "Matplotlib Tutorials", url: "https://matplotlib.org/stable/tutorials/index.html", icon: "fas fa-chart-line" },
                            { title: "Seaborn Tutorial", url: "https://seaborn.pydata.org/tutorial.html", icon: "fas fa-palette" },
                            { title: "Plotly Python", url: "https://plotly.com/python/", icon: "fas fa-chart-bar" }
                        ]
                    }
                ]
            },
            {
                id: 3,
                title: "Machine Learning",
                description: "Classical ML algorithms and techniques",
                icon: "fas fa-brain",
                color: "#2196F3",
                items: [
                    {
                        title: "Scikit-learn Mastery",
                        description: "Complete ML library for Python",
                        difficulty: "intermediate",
                        estimatedTime: "8-10 weeks",
                        links: [
                            { title: "Scikit-learn Guide", url: "https://scikit-learn.org/stable/getting_started.html", icon: "fas fa-cogs" },
                            { title: "Andrew Ng ML Course", url: "https://www.coursera.org/learn/machine-learning", icon: "fas fa-brain" },
                            { title: "Hands-On ML Book", url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", icon: "fas fa-book" }
                        ]
                    },
                    {
                        title: "Ensemble Methods",
                        description: "XGBoost, Random Forest, LightGBM",
                        difficulty: "advanced",
                        estimatedTime: "4-5 weeks",
                        links: [
                            { title: "XGBoost Documentation", url: "https://xgboost.readthedocs.io/en/stable/", icon: "fas fa-tree" },
                            { title: "LightGBM Guide", url: "https://lightgbm.readthedocs.io/en/latest/", icon: "fas fa-bolt" },
                            { title: "Ensemble Guide", url: "https://machinelearningmastery.com/ensemble-methods-for-deep-learning-neural-networks/", icon: "fas fa-layer-group" }
                        ]
                    }
                ]
            },
            {
                id: 4,
                title: "Deep Learning",
                description: "Neural networks and advanced architectures",
                icon: "fas fa-network-wired",
                color: "#9C27B0",
                items: [
                    {
                        title: "TensorFlow & Keras",
                        description: "Google's deep learning framework",
                        difficulty: "advanced",
                        estimatedTime: "10-12 weeks",
                        links: [
                            { title: "TensorFlow Learn", url: "https://www.tensorflow.org/learn", icon: "fas fa-brain" },
                            { title: "DeepLearning.AI", url: "https://www.deeplearning.ai/courses/", icon: "fas fa-graduation-cap" },
                            { title: "TensorFlow Developer Certificate", url: "https://www.tensorflow.org/certificate", icon: "fas fa-certificate" }
                        ]
                    },
                    {
                        title: "PyTorch Mastery",
                        description: "Facebook's research-focused framework",
                        difficulty: "advanced",
                        estimatedTime: "8-10 weeks",
                        links: [
                            { title: "PyTorch Tutorials", url: "https://pytorch.org/tutorials/", icon: "fas fa-fire" },
                            { title: "Fast.ai Course", url: "https://www.fast.ai/", icon: "fas fa-rocket" },
                            { title: "PyTorch Lightning", url: "https://www.pytorchlightning.ai/", icon: "fas fa-bolt" }
                        ]
                    }
                ]
            },
            {
                id: 5,
                title: "Specialized AI Domains",
                description: "Computer Vision, NLP, and AI Agents",
                icon: "fas fa-eye",
                color: "#FF5722",
                items: [
                    {
                        title: "Computer Vision",
                        description: "OpenCV, YOLO, image processing",
                        difficulty: "advanced",
                        estimatedTime: "8-10 weeks",
                        links: [
                            { title: "OpenCV Courses", url: "https://opencv.org/courses/", icon: "fas fa-eye" },
                            { title: "CNN Specialization", url: "https://www.coursera.org/learn/convolutional-neural-networks", icon: "fas fa-camera" },
                            { title: "Computer Vision Nanodegree", url: "https://www.udacity.com/course/computer-vision-nanodegree--nd891", icon: "fas fa-graduation-cap" }
                        ]
                    },
                    {
                        title: "Natural Language Processing",
                        description: "NLTK, spaCy, Transformers, LLMs",
                        difficulty: "advanced",
                        estimatedTime: "10-12 weeks",
                        links: [
                            { title: "HuggingFace Course", url: "https://huggingface.co/course/chapter1/1", icon: "fas fa-comments" },
                            { title: "NLTK Book", url: "https://www.nltk.org/book/", icon: "fas fa-book" },
                            { title: "NLP Specialization", url: "https://www.coursera.org/specializations/natural-language-processing", icon: "fas fa-language" }
                        ]
                    },
                    {
                        title: "AI Agents & LangChain",
                        description: "Building intelligent autonomous systems",
                        difficulty: "expert",
                        estimatedTime: "6-8 weeks",
                        links: [
                            { title: "LangChain Documentation", url: "https://python.langchain.com/docs/get_started/introduction", icon: "fas fa-robot" },
                            { title: "LangChain Course", url: "https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/", icon: "fas fa-link" },
                            { title: "AutoGPT Guide", url: "https://github.com/Significant-Gravitas/Auto-GPT", icon: "fab fa-github" }
                        ]
                    }
                ]
            },
            {
                id: 6,
                title: "Cloud AI & Deployment",
                description: "AWS, Azure, GCP, and MLOps",
                icon: "fas fa-cloud",
                color: "#607D8B",
                items: [
                    {
                        title: "AWS AI Services",
                        description: "SageMaker, Lambda, EC2 for ML",
                        difficulty: "advanced",
                        estimatedTime: "6-8 weeks",
                        links: [
                            { title: "AWS ML Training", url: "https://aws.amazon.com/training/learn-about/machine-learning/", icon: "fab fa-aws" },
                            { title: "AWS ML Specialty", url: "https://aws.amazon.com/certification/certified-machine-learning-specialty/", icon: "fas fa-certificate" },
                            { title: "SageMaker Examples", url: "https://github.com/aws/amazon-sagemaker-examples", icon: "fab fa-github" }
                        ]
                    },
                    {
                        title: "Azure AI Platform",
                        description: "Azure ML Studio, Cognitive Services",
                        difficulty: "advanced",
                        estimatedTime: "6-8 weeks",
                        links: [
                            { title: "Azure ML Documentation", url: "https://docs.microsoft.com/en-us/azure/machine-learning/", icon: "fab fa-microsoft" },
                            { title: "Azure AI Fundamentals", url: "https://docs.microsoft.com/en-us/learn/certifications/azure-ai-fundamentals/", icon: "fas fa-certificate" }
                        ]
                    },
                    {
                        title: "Google Cloud AI",
                        description: "Vertex AI, AutoML, AI Platform",
                        difficulty: "advanced",
                        estimatedTime: "6-8 weeks",
                        links: [
                            { title: "GCP AI Documentation", url: "https://cloud.google.com/ai-platform/docs", icon: "fab fa-google" },
                            { title: "ML Engineer Certification", url: "https://cloud.google.com/certification/machine-learning-engineer", icon: "fas fa-certificate" }
                        ]
                    },
                    {
                        title: "Terraform & Infrastructure",
                        description: "Infrastructure as Code for ML",
                        difficulty: "advanced",
                        estimatedTime: "4-5 weeks",
                        links: [
                            { title: "Terraform Learn", url: "https://learn.hashicorp.com/terraform", icon: "fas fa-cubes" },
                            { title: "Terraform AWS Provider", url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs", icon: "fas fa-cloud" }
                        ]
                    },
                    {
                        title: "MLOps & Production",
                        description: "Docker, Kubernetes, CI/CD for ML",
                        difficulty: "expert",
                        estimatedTime: "8-10 weeks",
                        links: [
                            { title: "MLOps Community", url: "https://mlops.org/", icon: "fas fa-cogs" },
                            { title: "MLOps Specialization", url: "https://www.coursera.org/learn/machine-learning-engineering-for-production-mlops", icon: "fas fa-industry" },
                            { title: "Kubeflow", url: "https://www.kubeflow.org/", icon: "fas fa-dharmachakra" }
                        ]
                    }
                ]
            }
        ];

        return phases.map(phase => `
            <div class="phase-card" data-phase="${phase.id}">
                <div class="phase-header" style="background: linear-gradient(135deg, ${phase.color}, ${this.adjustColor(phase.color, -20)})">
                    <div class="phase-icon">
                        <i class="${phase.icon}"></i>
                    </div>
                    <div class="phase-info">
                        <h3 class="phase-title">${phase.title}</h3>
                        <p class="phase-description">${phase.description}</p>
                    </div>
                    <div class="phase-number">${String(phase.id).padStart(2, '0')}</div>
                </div>
                <div class="phase-content">
                    ${phase.items.map((item, index) => this.renderLearningItem(item, phase.id, index)).join('')}
                </div>
            </div>
        `).join('');
    }

    renderLearningItem(item, phaseId, itemIndex) {
        const itemId = `${phaseId}-${itemIndex}`;
        const isCompleted = this.completedItems.has(itemId);
        const isBookmarked = this.bookmarkedItems.has(itemId);
        
        return `
            <div class="learning-item" data-difficulty="${item.difficulty}" data-item-id="${itemId}">
                <div class="item-header">
                    <div class="item-status">
                        <button class="status-btn ${isCompleted ? 'completed' : ''}" 
                                onclick="learningPath.toggleComplete('${itemId}')"
                                title="${isCompleted ? 'Mark as incomplete' : 'Mark as complete'}">
                            <i class="fas fa-check"></i>
                        </button>
                        <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
                                onclick="learningPath.toggleBookmark('${itemId}')"
                                title="${isBookmarked ? 'Remove bookmark' : 'Add bookmark'}">
                            <i class="fas fa-bookmark"></i>
                        </button>
                    </div>
                    <div class="item-info">
                        <h4 class="item-title">${item.title}</h4>
                        <p class="item-description">${item.description}</p>
                        <div class="item-meta">
                            <span class="difficulty-badge ${item.difficulty}">${item.difficulty}</span>
                            <span class="time-estimate">
                                <i class="fas fa-clock"></i>
                                ${item.estimatedTime}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="item-links">
                    ${item.links.map(link => `
                        <a href="${link.url}" target="_blank" class="resource-link" 
                           onclick="learningPath.trackLinkClick('${itemId}', '${link.title}')">
                            <i class="${link.icon}"></i>
                            <span>${link.title}</span>
                            <i class="fas fa-external-link-alt"></i>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('learning-search');
        searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterContent();
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentDifficulty = e.target.dataset.difficulty;
                this.filterContent();
            });
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                // Implement view switching logic here
            });
        });
    }

    filterContent() {
        const items = document.querySelectorAll('.learning-item');
        
        items.forEach(item => {
            const difficulty = item.dataset.difficulty;
            const text = item.textContent.toLowerCase();
            
            const matchesDifficulty = this.currentDifficulty === 'all' || difficulty === this.currentDifficulty;
            const matchesSearch = !this.searchTerm || text.includes(this.searchTerm);
            
            item.style.display = matchesDifficulty && matchesSearch ? 'block' : 'none';
        });
    }

    toggleComplete(itemId) {
        if (this.completedItems.has(itemId)) {
            this.completedItems.delete(itemId);
        } else {
            this.completedItems.add(itemId);
        }
        
        this.saveProgress();
        this.updateProgress();
        this.updateItemUI(itemId);
    }

    toggleBookmark(itemId) {
        if (this.bookmarkedItems.has(itemId)) {
            this.bookmarkedItems.delete(itemId);
        } else {
            this.bookmarkedItems.add(itemId);
        }
        
        this.saveProgress();
        this.updateProgress();
        this.updateItemUI(itemId);
    }

    updateItemUI(itemId) {
        const item = document.querySelector(`[data-item-id="${itemId}"]`);
        const statusBtn = item.querySelector('.status-btn');
        const bookmarkBtn = item.querySelector('.bookmark-btn');
        
        statusBtn.classList.toggle('completed', this.completedItems.has(itemId));
        bookmarkBtn.classList.toggle('bookmarked', this.bookmarkedItems.has(itemId));
    }

    updateProgress() {
        const totalItems = document.querySelectorAll('.learning-item').length;
        const completedCount = this.completedItems.size;
        const bookmarkedCount = this.bookmarkedItems.size;
        const progressPercentage = Math.round((completedCount / totalItems) * 100);
        
        // Update progress circle
        const progressCircle = document.querySelector('.progress-circle');
        const progressText = document.querySelector('.progress-text');
        progressCircle.dataset.progress = progressPercentage;
        progressText.textContent = `${progressPercentage}%`;
        
        // Update counters
        document.getElementById('completed-count').textContent = completedCount;
        document.getElementById('bookmarked-count').textContent = bookmarkedCount;
        
        // Animate progress circle
        this.animateProgressCircle(progressPercentage);
    }

    animateProgressCircle(percentage) {
        const circle = document.querySelector('.progress-circle');
        circle.style.background = `conic-gradient(#667eea 0deg ${percentage * 3.6}deg, #e0e0e0 ${percentage * 3.6}deg 360deg)`;
    }

    saveProgress() {
        localStorage.setItem('learningProgress', JSON.stringify({
            completed: Array.from(this.completedItems),
            bookmarked: Array.from(this.bookmarkedItems)
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('learningProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.completedItems = new Set(data.completed || []);
            this.bookmarkedItems = new Set(data.bookmarked || []);
        }
    }

    trackLinkClick(itemId, linkTitle) {
        // Analytics tracking
        console.log(`Link clicked: ${linkTitle} for item ${itemId}`);
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.phase-card').forEach(card => {
            observer.observe(card);
        });
    }

    adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => 
            ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
        );
    }
}

// Make it globally accessible
window.learningPath = null;

export default LearningPath;