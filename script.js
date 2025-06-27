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