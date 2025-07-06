// Theme switcher
document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const themeSelect = document.getElementById('theme-select');
    
    // Check for saved theme preference or default to ocean
    const savedTheme = localStorage.getItem('theme') || 'ocean';
    document.body.className = savedTheme;
    themeSelect.value = savedTheme;
    
    // Listen for theme changes
    themeSelect.addEventListener('change', function() {
        const newTheme = this.value;
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    });
});

// Fullscreen image view functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create fullscreen container
    const fullscreenView = document.createElement('div');
    fullscreenView.className = 'fullscreen-view';
    document.body.appendChild(fullscreenView);

    // Handle showcase images
    const showcaseImages = document.querySelectorAll('.showcase-image, .portfolio-card .image-container');
    showcaseImages.forEach(container => {
        container.addEventListener('click', function() {
            const media = container.querySelector('img, video');
            if (!media) return;

            const clone = media.cloneNode(true);
            fullscreenView.innerHTML = '';
            fullscreenView.classList.add('loading');
            fullscreenView.classList.add('active');
            fullscreenView.appendChild(clone);

            // Handle loading state
            if (clone.tagName.toLowerCase() === 'img') {
                if (clone.complete) {
                    fullscreenView.classList.remove('loading');
                } else {
                    clone.onload = () => fullscreenView.classList.remove('loading');
                }
            } else if (clone.tagName.toLowerCase() === 'video') {
                clone.onloadeddata = () => fullscreenView.classList.remove('loading');
                clone.play();
            }

            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close fullscreen view
    fullscreenView.addEventListener('click', function(e) {
        // Only close if clicking the background, not the image/video
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
            const video = this.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    });

    // Prevent scroll when fullscreen is active
    fullscreenView.addEventListener('wheel', function(e) {
        if (this.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && fullscreenView.classList.contains('active')) {
            fullscreenView.click();
        }
    });
});