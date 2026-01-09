// Modern JavaScript Enhancements
document.addEventListener('DOMContentLoaded', function () {
    // ===== Sticky Header with Scroll Effect =====
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== Tab Functionality for Portfolio Section =====
    const tabs = document.querySelectorAll('.tab');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Get the selected category
            const selectedCategory = this.getAttribute('data-category');

            // Show/hide portfolio cards based on category
            portfolioCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (cardCategory === selectedCategory) {
                    card.style.display = 'grid';
                    // Add fade-in animation
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                animation: ripple 0.6s;
                pointer-events: none;
            `;
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ===== Smooth Scroll for Portfolio Grid =====
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioGrid.style.scrollBehavior = 'smooth';

        // Add keyboard navigation
        portfolioGrid.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') {
                portfolioGrid.scrollLeft += 300;
            } else if (e.key === 'ArrowLeft') {
                portfolioGrid.scrollLeft -= 300;
            }
        });
    }

    // ===== Intersection Observer for Fade-in Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe portfolio cards, product cards, and article cards
    const animatedElements = document.querySelectorAll(
        '.portfolio-card, .prod-card, .article-card'
    );
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${
            index * 0.1
        }s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // ===== Advanced Form Validation =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Validation patterns and messages
        const validationRules = {
            firstName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s\-']+$/,
                messages: {
                    required: 'First name is required',
                    minLength: 'First name must be at least 2 characters',
                    pattern: 'Please enter a valid name (letters only)',
                },
            },
            lastName: {
                required: true,
                minLength: 2,
                pattern: /^[a-zA-Z\s\-']+$/,
                messages: {
                    required: 'Last name is required',
                    minLength: 'Last name must be at least 2 characters',
                    pattern: 'Please enter a valid name (letters only)',
                },
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                messages: {
                    required: 'Email is required',
                    pattern: 'Please enter a valid email address',
                },
            },
            phone: {
                required: false,
                pattern: /^[0-9\s\-\+\(\)]{10,20}$/,
                messages: {
                    pattern: 'Please enter a valid phone number',
                },
            },
        };

        // Get all form inputs
        const formInputs = contactForm.querySelectorAll('input, textarea');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const successMessage = contactForm.querySelector('.form-success');
        const commentsTextarea = document.getElementById('comments');
        const charCount = document.getElementById('charCount');

        // Character counter for textarea
        if (commentsTextarea && charCount) {
            commentsTextarea.addEventListener('input', function () {
                const count = this.value.length;
                charCount.textContent = count;

                const charCountElement =
                    this.parentElement.querySelector('.char-count');
                if (count > 900) {
                    charCountElement.style.color = '#f59e0b';
                } else if (count === 1000) {
                    charCountElement.style.color = '#ef4444';
                } else {
                    charCountElement.style.color = '#737373';
                }
            });
        }

        // Validate single field
        function validateField(input) {
            const fieldName = input.name;
            const value = input.value.trim();
            const rules = validationRules[fieldName];
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup?.querySelector(
                `[data-error="${fieldName}"]`
            );

            if (!rules) return true;

            // Clear previous error
            if (formGroup) {
                formGroup.classList.remove('error', 'success');
            }
            if (errorElement) {
                errorElement.textContent = '';
            }

            // Check required
            if (rules.required && !value) {
                showError(formGroup, errorElement, rules.messages.required);
                return false;
            }

            // If field is optional and empty, it's valid
            if (!rules.required && !value) {
                return true;
            }

            // Check minimum length
            if (rules.minLength && value.length < rules.minLength) {
                showError(formGroup, errorElement, rules.messages.minLength);
                return false;
            }

            // Check pattern
            if (rules.pattern && !rules.pattern.test(value)) {
                showError(formGroup, errorElement, rules.messages.pattern);
                return false;
            }

            // Field is valid
            if (formGroup && value) {
                formGroup.classList.add('success');
            }
            return true;
        }

        // Show error
        function showError(formGroup, errorElement, message) {
            if (formGroup) {
                formGroup.classList.add('error');

                // Add shake animation
                formGroup.style.animation = 'shake 0.4s';
                setTimeout(() => {
                    formGroup.style.animation = '';
                }, 400);
            }
            if (errorElement) {
                errorElement.textContent = message;
            }
        }

        // Real-time validation
        formInputs.forEach(input => {
            // Validate on blur
            input.addEventListener('blur', function () {
                if (this.value.trim()) {
                    validateField(this);
                }
            });

            // Clear error on focus
            input.addEventListener('focus', function () {
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                    const errorElement = formGroup.querySelector(
                        `[data-error="${this.name}"]`
                    );
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });

            // Validate on input for immediate feedback
            input.addEventListener('input', function () {
                const formGroup = this.closest('.form-group');
                if (formGroup && formGroup.classList.contains('error')) {
                    validateField(this);
                }
            });
        });

        // Form submission
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });

            if (!isValid) {
                // Scroll to first error
                const firstError =
                    contactForm.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                    });
                }
                return;
            }

            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';

            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));

                // Hide form and show success message
                contactForm
                    .querySelectorAll('.form-group, .form-note')
                    .forEach(el => {
                        el.style.display = 'none';
                    });
                submitBtn.style.display = 'none';
                successMessage.style.display = 'block';

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm
                        .querySelectorAll('.form-group, .form-note')
                        .forEach(el => {
                            el.style.display = '';
                        });
                    submitBtn.style.display = '';
                    successMessage.style.display = 'none';
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline';
                    btnLoader.style.display = 'none';

                    // Clear all validation states
                    contactForm
                        .querySelectorAll('.form-group')
                        .forEach(group => {
                            group.classList.remove('success', 'error');
                        });

                    if (charCount) charCount.textContent = '0';
                }, 5000);
            } catch (error) {
                // Handle error
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoader.style.display = 'none';
                alert('An error occurred. Please try again.');
            }
        });
    }

    // ===== Parallax Effect for Images =====
    // const parallaxImages = document.querySelectorAll('.flex-image img');
    // window.addEventListener('scroll', () => {
    //     parallaxImages.forEach(img => {
    //         const scrolled = window.pageYOffset;
    //         const rect = img.getBoundingClientRect();
    //         if (rect.top < window.innerHeight && rect.bottom > 0) {
    //             const speed = 0.3;
    //             img.style.transform = `translateY(${
    //                 (scrolled - rect.top) * speed
    //             }px)`;
    //         }
    //     });
    // });

    // ===== Add loading animation =====
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(style);
