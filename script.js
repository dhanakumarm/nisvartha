// ===================================
// NISVARTHA DHARMA FOUNDATION
// Interactive JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================
    // HEADER SCROLL EFFECT
    // ==================
    const header = document.getElementById('header');
    const scrollTop = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            scrollTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            scrollTop.classList.remove('visible');
        }
    });
    
    // ==================
    // SMOOTH SCROLL
    // ==================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // ==================
    // SCROLL TO TOP
    // ==================
    scrollTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ==================
    // MOBILE MENU TOGGLE
    // ==================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(12px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-12px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ==================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('.section, .program-card, .impact-card, .stat-card').forEach(el => {
        observer.observe(el);
    });
    
    // ==================
    // COUNTER ANIMATION
    // ==================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas
            const formattedNumber = Math.floor(current).toLocaleString();
            element.textContent = formattedNumber + '+';
        }, 16);
    }
    
    // Trigger counter animation when impact section is visible
    const impactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.impact-number, .stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                    animateCounter(counter, target);
                });
                impactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const impactSection = document.querySelector('.impact');
    const aboutSection = document.querySelector('.about');
    
    if (impactSection) {
        impactObserver.observe(impactSection);
    }
    if (aboutSection) {
        impactObserver.observe(aboutSection);
    }
    
    // ==================
    // VOLUNTEER FORM HANDLING
    // ==================
    const volunteerForm = document.getElementById('volunteerForm');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(volunteerForm);
            const data = Object.fromEntries(formData);
            
            // Log data (in production, send to backend)
            console.log('Volunteer Form Submission:', data);
            
            // Show success message
            showNotification('Thank you for your interest! We will contact you soon.', 'success');
            
            // Reset form
            volunteerForm.reset();
        });
    }
    
    // ==================
    // CONTACT FORM HANDLING
    // ==================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Log data (in production, send to backend)
            console.log('Contact Form Submission:', data);
            
            // Show success message
            showNotification('Message sent successfully! We will respond shortly.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ==================
    // NOTIFICATION SYSTEM
    // ==================
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style based on type
        const styles = {
            success: 'background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);',
            error: 'background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);',
            info: 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            ${styles[type] || styles.info}
            color: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            font-weight: 600;
            max-width: 400px;
        `;
        
        // Add animation
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }
    
    // ==================
    // ACTIVE NAV LINK
    // ==================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - header.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ==================
    // PARALLAX EFFECT FOR HERO
    // ==================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ==================
    // FORM INPUT VALIDATION FEEDBACK
    // ==================
    const inputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#f5576c';
            } else {
                this.style.borderColor = '';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(245, 87, 108)') {
                this.style.borderColor = '';
            }
        });
    });
    
    // ==================
    // LAZY LOADING FOR IMAGES
    // ==================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==================
    // TYPING EFFECT FOR HERO SUBTITLE
    // ==================
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroSubtitle) {
        const text = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroSubtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // ==================
    // CONSOLE WELCOME MESSAGE
    // ==================
    console.log('%c👋 Welcome to NISVARTHA DHARMA FOUNDATION!', 
                'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cJoin us in making a difference!', 
                'color: #764ba2; font-size: 14px;');
    
});
