// Navigasiýa bariniň sahypa aşak süýşende has professional görünmegi
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 40) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
        header.style.background = 'rgba(11, 12, 16, 0.9)';
    } else {
        header.style.boxShadow = 'none';
        header.style.background = 'rgba(11, 12, 16, 0.75)';
    }
});

// Kartlaryň ekrana gelende ýumşak peýda bolmagy (Intersection Observer API)
const observerOptions = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .exp-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
});