// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Toggle mobile navigation menu
    const setupMobileNav = () => {
        const navToggle = document.createElement('button');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '☰';
        document.querySelector('.main-nav .container').prepend(navToggle);
        
        navToggle.addEventListener('click', function() {
            document.querySelector('.main-nav').classList.toggle('active');
        });
    };

    // Project filter functionality
    const setupProjectFilters = () => {
        // Only run if we have projects
        if (!document.querySelector('.projects-grid')) return;
        
        // Create filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        
        // Sample categories - update these based on your actual projects
        const categories = ['All', 'Web', 'Mobile', 'Analytics', 'Cloud', 'AI', 'DevOps', 'FinTech' ,'Blockchain', 'Automation/Scripting'];
        
        categories.forEach(category => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = category;
            if (category === 'All') button.classList.add('active');
            
            button.addEventListener('click', function() {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // Filter projects
                const projects = document.querySelectorAll('.project');
                projects.forEach(project => {
                    if (category === 'All') {
                        project.style.display = 'block';
                    } else {
                        // Check if project has this category
                        // We'll use data attributes in HTML, like data-category="Web"
                        if (project.dataset.category === category) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    }
                });
            });
            
            filterContainer.appendChild(button);
        });
        
        // Add filters before the projects grid
        const projectsSection = document.querySelector('#projects .container');
        projectsSection.insertBefore(filterContainer, document.querySelector('.projects-grid'));
    };

    // Form validation
    const setupFormValidation = () => {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let hasErrors = false;
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset any previous error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                hasErrors = true;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                hasErrors = true;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email');
                hasErrors = true;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                hasErrors = true;
            }
            
            if (!hasErrors) {
                // Normally you would submit the form here
                // For demo purposes, show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Message sent successfully!';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after a few seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
        
        function showError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            input.parentNode.appendChild(errorMessage);
            input.classList.add('input-error');
            
            // Remove error styling when user corrects the input
            input.addEventListener('input', function() {
                this.classList.remove('input-error');
                const error = this.parentNode.querySelector('.error-message');
                if (error) error.remove();
            });
        }
        
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    };

    // Project image hover effects
    const setupProjectImageEffects = () => {
        const projectImages = document.querySelectorAll('.project-image');
        
        projectImages.forEach(image => {
            image.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            
            image.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    };

    // Dark mode toggle
    const setupDarkMode = () => {
        // Create toggle button
        const darkModeToggle = document.createElement('button');
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌓';
        darkModeToggle.title = 'Toggle Dark Mode';
        
        // Add to header
        document.querySelector('header .container').appendChild(darkModeToggle);
        
        // Check for saved preference
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        
        // Toggle functionality
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
    };

    // Animated scroll to sections when clicking nav links
    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('.main-nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Adjust for nav height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.querySelector('.main-nav').classList.remove('active');
            });
        });
    };

    // Simple typing animation for the welcome section
    const setupTypingAnimation = () => {
        const welcomeHeading = document.querySelector('#home h2');
        if (!welcomeHeading) return;
        
        const text = welcomeHeading.textContent;
        welcomeHeading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                welcomeHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation
        typeWriter();
    };

    // Initialize all components
    setupMobileNav();
    setupProjectFilters();
    setupFormValidation();
    setupProjectImageEffects();
    setupDarkMode();
    setupSmoothScroll();
    setupTypingAnimation();
});

// Add scroll animations for elements
window.addEventListener('scroll', function() {
    // Reveal elements on scroll
    const revealElements = () => {
        const elements = document.querySelectorAll('.project, #about, #contact');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Activate nav items based on scroll position
    const updateNav = () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.main-nav a');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    revealElements();
    updateNav();
});