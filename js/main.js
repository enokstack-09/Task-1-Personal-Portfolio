/* Optional enhancements: content and navigation work without JavaScript. */
(() => {
    'use strict';

    document.documentElement.classList.add('js-enabled');

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const header = document.querySelector('.site-header');
    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('#primary-nav');
    const topButton = document.querySelector('.back-to-top');

    function setMenu(open, restoreFocus = false) {
        if (!menuButton || !navigation) {
            return;
        }

        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        navigation.classList.toggle('is-open', open);
        if (!open && restoreFocus) {
            menuButton.focus();
        }
    }

    function setupNavigation() {
        menuButton?.addEventListener('click', () => {
            setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
        });
        navigation?.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                setMenu(false);
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
                setMenu(false, true);
            }
        });
        document.addEventListener('click', (event) => {
            if (header && !header.contains(event.target)) {
                setMenu(false);
            }
        });
        header?.addEventListener('focusout', () => {
            requestAnimationFrame(() => {
                if (!header.contains(document.activeElement)) {
                    setMenu(false);
                }
            });
        });
        window.matchMedia('(max-width: 680px)').addEventListener('change', () => setMenu(false));
        const currentPage = document.body.dataset.page;
        navigation?.querySelectorAll('a:not(.nav-cta)').forEach((link) => {
            const active = link.getAttribute('href') === `${currentPage}.html`;
            link.classList.toggle('active', active);
            if (active) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function setupScroll() {
        let queued = false;
        function update() {
            header?.classList.toggle('scrolled', window.scrollY > 20);
            if (topButton) {
                topButton.hidden = window.scrollY < 450;
            }
            queued = false;
        }
        window.addEventListener(
            'scroll',
            () => {
                if (!queued) {
                    queued = true;
                    requestAnimationFrame(update);
                }
            },
            { passive: true }
        );
        topButton?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
            document.querySelector('.site-header .brand')?.focus({ preventScroll: true });
        });
        update();
    }

    function setupReveals() {
        if (reducedMotion.matches || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.06 }
        );
        document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
        document.documentElement.classList.add('motion-ready');
    }

    function setupFilters() {
        const controls = document.querySelector('.filter-controls');
        if (!controls) {
            return;
        }

        const cards = [...document.querySelectorAll('.detailed-projects .project-card')];
        const result = document.querySelector('.filter-result');
        controls.addEventListener('click', (event) => {
            const button = event.target.closest('[data-filter]');
            if (!button) {
                return;
            }

            const filter = button.dataset.filter;
            controls.querySelectorAll('button').forEach((control) => {
                const active = control === button;
                control.classList.toggle('active', active);
                control.setAttribute('aria-pressed', String(active));
            });
            let count = 0;
            cards.forEach((card) => {
                const matches =
                    filter === 'all' || card.dataset.category.split(' ').includes(filter);
                card.hidden = !matches;
                if (matches) {
                    count += 1;
                    card.classList.add('visible');
                }
            });
            if (result) {
                result.textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
            }
        });
    }

    function setupContact() {
        const form = document.querySelector('#contact-form');
        if (!form) {
            return;
        }

        const status = document.querySelector('#form-status');
        const draftLink = document.querySelector('#email-draft');
        const fields = {
            name: form.elements.namedItem('name'),
            email: form.elements.namedItem('email'),
            subject: form.elements.namedItem('subject'),
            message: form.elements.namedItem('message'),
        };
        const rules = {
            name: (value) => (value ? '' : 'Please enter your full name.'),
            email: (value) =>
                !value
                    ? 'Please enter your email address.'
                    : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && fields.email.validity.valid
                      ? ''
                      : 'Please enter a valid email address.',
            subject: (value) => (value ? '' : 'Please enter a subject.'),
            message: (value) =>
                !value
                    ? 'Please enter a message.'
                    : value.length < 20
                      ? 'Please write at least 20 characters.'
                      : '',
        };
        function validateField(key) {
            const field = fields[key];
            const error = rules[key](field.value.trim());
            document.querySelector(`#${key}-error`).textContent = error;
            field.setAttribute('aria-invalid', String(Boolean(error)));
            return !error;
        }
        Object.entries(fields).forEach(([key, field]) => {
            field.addEventListener('blur', () => {
                if (field.value || field.hasAttribute('aria-invalid')) {
                    validateField(key);
                }
            });
            field.addEventListener('input', () => {
                if (field.hasAttribute('aria-invalid')) {
                    validateField(key);
                }
                draftLink.hidden = true;
                status.hidden = true;
            });
        });
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const invalidKeys = Object.keys(fields).filter((key) => !validateField(key));
            status.hidden = false;
            if (invalidKeys.length) {
                status.className = 'form-status error';
                status.textContent = 'Please check the highlighted fields before continuing.';
                draftLink.hidden = true;
                fields[invalidKeys[0]].focus();
                return;
            }

            const recipient = form.dataset.recipient;
            const subject = fields.subject.value.trim();
            const body = `Name: ${fields.name.value.trim()}\nEmail: ${fields.email.value.trim()}\n\n${fields.message.value.trim()}`;
            draftLink.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            draftLink.hidden = false;
            status.className = 'form-status success';
            status.textContent =
                'Message validated successfully. Please use the email link to send your message.';
            if (recipient === 'your.email@example.com') {
                const note = document.createElement('p');
                note.textContent =
                    'The portfolio owner still needs to replace the placeholder email address before this draft can reach them.';
                status.append(note);
            }
        });
    }

    function setupPlaceholders() {
        const toast = document.querySelector('.toast');
        let timeout;
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a[data-placeholder]');
            if (!link || !toast) {
                return;
            }

            event.preventDefault();
            clearTimeout(timeout);
            toast.textContent = `${link.dataset.placeholder} link is not available yet. Please use the Contact page to connect.`;
            toast.hidden = false;
            timeout = setTimeout(() => {
                toast.hidden = true;
            }, 5500);
        });
    }

    setupNavigation();
    setupScroll();
    setupReveals();
    setupFilters();
    setupContact();
    setupPlaceholders();
    document.querySelectorAll('[data-year]').forEach((element) => {
        element.textContent = new Date().getFullYear();
    });
})();
