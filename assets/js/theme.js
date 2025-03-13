document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Verifica se há uma preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Atualiza o tema
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Salva a preferência
        localStorage.setItem('theme', newTheme);
        
        // Atualiza o ícone
        updateThemeIcon(newTheme);
    });
});

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('title', theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro');
} 