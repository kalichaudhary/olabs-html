// Tab functionality for Portfolio section
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Here you can add logic to filter portfolio items based on selected tab
            // For now, it just changes the active state
        });
    });

    // Smooth scroll for portfolio grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        // Optional: Add scroll buttons if needed
        // This ensures smooth scrolling behavior
        portfolioGrid.style.scrollBehavior = 'smooth';
    }
});
