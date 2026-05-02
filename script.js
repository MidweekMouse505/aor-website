// script.js

// --- PASSWORD PROTECTION ---
const SITE_PASSWORD = "aor2026"; // You can change this password!

if (sessionStorage.getItem('aor_authenticated') !== 'true') {
    // Stop scrolling
    document.documentElement.style.overflow = 'hidden';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'password-overlay';
    overlay.innerHTML = `
        <div class="password-container card">
            <img src="assets/logo.png" alt="AOR Logo" style="height: 80px; margin-bottom: 1rem;">
            <h2 style="margin-bottom: 1rem; color: var(--cardinal-red);">Restricted Access</h2>
            <p style="margin-bottom: 1.5rem; color: var(--slate-gray);">Please enter the password to view the Archdiocese of Roblox website.</p>
            <input type="password" id="password-input" placeholder="Enter Password" style="width: 100%; padding: 0.75rem; margin-bottom: 1rem; border: 1px solid var(--border-color); border-radius: 4px; font-family: 'Inter', sans-serif;">
            <button id="password-submit" class="btn-primary" style="width: 100%;">Enter</button>
            <p id="password-error" style="color: red; margin-top: 1rem; display: none; font-size: 0.875rem;">Incorrect password. Please try again.</p>
        </div>
    `;
    
    // Insert at the very beginning of the body
    document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(overlay);
        
        const submitBtn = document.getElementById('password-submit');
        const input = document.getElementById('password-input');
        const error = document.getElementById('password-error');

        const checkPassword = () => {
            if (input.value === SITE_PASSWORD) {
                sessionStorage.setItem('aor_authenticated', 'true');
                overlay.remove();
                document.documentElement.style.overflow = 'auto';
            } else {
                error.style.display = 'block';
                input.value = '';
            }
        };

        submitBtn.addEventListener('click', checkPassword);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPassword();
        });
    });
}
// ---------------------------


document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Set active nav link based on current page
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        if (link.getAttribute('href') !== '#' && currentPath.endsWith(link.getAttribute('href'))) {
            link.classList.add('active');
        } else if (currentPath.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});
