// Theme switcher
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const themeSelect = document.getElementById('theme-select');
    const currentYearSpan = document.getElementById('current-year');
    const header = document.querySelector('.header');
    
    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();
    
    // Check for saved theme preference or default to ocean
    const savedTheme = localStorage.getItem('theme') || 'ocean';
    
    // Apply saved theme
    document.body.className = savedTheme;
    themeSelect.value = savedTheme;
    
    // Listen for theme changes
    themeSelect.addEventListener('change', function() {
        const newTheme = this.value;
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});