document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        mobileBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Reveal Animation via Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
});


// --- Free-quote form -> Formspree (submit without leaving the page) ---
document.addEventListener('DOMContentLoaded', () => {
    const quoteForm = document.getElementById('quoteForm');
    if (!quoteForm) return;
    const statusEl = document.getElementById('formStatus');
    const submitBtn = quoteForm.querySelector('.btn-submit');

    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const label = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending\u2026';
        statusEl.textContent = '';
        statusEl.className = 'form-status';

        try {
            const res = await fetch(quoteForm.action, {
                method: 'POST',
                body: new FormData(quoteForm),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                quoteForm.reset();
                statusEl.textContent = "Thanks! Your request is in \u2014 we'll be in touch within one business day.";
                statusEl.classList.add('success');
            } else {
                const data = await res.json().catch(() => ({}));
                statusEl.textContent = (data.errors && data.errors.map(er => er.message).join(', '))
                    || 'Sorry, something went wrong. Please call (612) 286-3105.';
                statusEl.classList.add('error');
            }
        } catch (err) {
            statusEl.textContent = 'Network error \u2014 please call (612) 286-3105.';
            statusEl.classList.add('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = label;
        }
    });
});
