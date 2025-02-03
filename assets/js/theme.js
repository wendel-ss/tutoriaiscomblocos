document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('.theme-icon');
    
    // Verifica se há uma preferência salva
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.className = `${currentTheme}-theme`;
    updateThemeIcon(currentTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        const newTheme = isDark ? 'light' : 'dark';
        
        document.body.className = `${newTheme}-theme`;
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
}); 