// ===================================
// BESORAH YESHUA MINISTRY - MAIN JAVASCRIPT
// Complete Reorganized & Optimized Version
// Version: 6.0 - Production Ready
// ===================================

'use strict';

// ===================================
// GLOBAL STATE & CONFIGURATION
// ===================================
const BesorahYeshua = {
    // Application State
    isMobile: window.innerWidth <= 968,
    isMenuOpen: false,
    scrollPosition: 0,
    init: false,
    
    // Configuration
    config: {
        breakpoints: {
            mobile: 768,
            tablet: 968,
            desktop: 1200
        },
        animation: {
            duration: 300,
            scrollOffset: 80
        },
        storage: {
            prefix: 'besorah_'
        }
    }
};

// ===================================
// UTILITY FUNCTIONS
// ===================================
class Utils {
    // Performance optimization
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Validation
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    // Formatting
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    // DOM helpers
    static isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Storage
    static supportsLocalStorage() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Navigation helpers
    static getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page === '' ? 'index.html' : page;
    }

    static isHomePage() {
        const currentPage = this.getCurrentPage();
        return currentPage === 'index.html' || currentPage === '';
    }

    static getPageTitle(filename) {
        if (typeof NAV_CONFIG !== 'undefined' && NAV_CONFIG.pageTitles[filename]) {
            return NAV_CONFIG.pageTitles[filename];
        }
        
        return filename
            .replace('.html', '')
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
}

// ===================================
// ERROR HANDLER
// ===================================
class ErrorHandler {
    constructor() {
        this.errors = [];
        this.init();
    }
    
    init() {
        window.addEventListener('error', (e) => this.handleError(e));
        window.addEventListener('unhandledrejection', (e) => this.handleError(e));
    }
    
    handleError(error) {
        const errorData = {
            message: error.message || error.reason,
            stack: error.error?.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href
        };
        
        this.errors.push(errorData);
        console.error('Error logged:', errorData);
        
        if (!window.location.hostname.includes('localhost')) {
            this.showErrorToUser();
        }
    }
    
    showErrorToUser() {
        if (document.querySelector('.error-notification')) return;
        
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div style="position: fixed; top: 90px; right: 20px; background: #dc2626; 
                 color: white; padding: 1rem 1.5rem; border-radius: 8px; 
                 box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 9999; max-width: 300px; 
                 animation: slideInRight 0.3s ease;">
                <strong>⚠️ Something went wrong</strong>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">Please refresh the page and try again.</p>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// ===================================
// LOGO HANDLER
// ===================================
class LogoLoader {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handleLogos();
            this.preloadLogo();
        });
    }
    
    handleLogos() {
        const logos = document.querySelectorAll('.logo, .footer-logo');
        
        logos.forEach(logo => {
            logo.addEventListener('error', () => this.createFallback(logo));
            
            if (!logo.src || logo.src.includes('undefined')) {
                logo.src = '/images/logo.png';
            }
            
            if (logo.complete && logo.naturalHeight === 0) {
                this.createFallback(logo);
            }
        });
    }
    
    createFallback(imgElement) {
        console.warn('Logo failed to load:', imgElement.src);
        
        const isFooter = imgElement.classList.contains('footer-logo');
        const size = isFooter ? 80 : 50;
        const fontSize = isFooter ? 2 : 1.2;
        
        const fallback = document.createElement('div');
        fallback.className = imgElement.className + ' logo-fallback';
        fallback.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: linear-gradient(135deg, #205782, #2d6fa0);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: ${fontSize}rem;
            box-shadow: 0 4px 15px rgba(242, 132, 47, 0.3);
            border: 2px solid rgba(255, 255, 255, 0.3);
        `;
        fallback.textContent = 'BY';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', 'Besorah Yeshua Logo');
        
        imgElement.parentNode.replaceChild(fallback, imgElement);
    }
    
    preloadLogo() {
        const preloadImg = new Image();
        const paths = ['/images/logo.png', './images/logo.png', '../images/logo.png'];
        
        const tryLoad = (index) => {
            if (index >= paths.length) return;
            
            preloadImg.src = paths[index];
            preloadImg.onerror = () => tryLoad(index + 1);
            preloadImg.onload = () => {
                console.log('Logo preloaded from:', paths[index]);
            };
        };
        
        tryLoad(0);
    }
}

// ===================================
// FORM HANDLING SYSTEM
// ===================================

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.rules = {
            email: {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            phone: {
                pattern: /^(\+251|0)?[9][0-9]{8}$/,
                message: 'Enter a valid Ethiopian phone number (e.g., 0912345678)'
            },
            name: {
                pattern: /^[a-zA-Z\s]{2,50}$/,
                message: 'Name should be 2-50 characters, letters only'
            },
            message: {
                pattern: /^.{10,1000}$/,
                message: 'Message should be 10-1000 characters'
            }
        };
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => {
            if (!this.validateAll()) {
                e.preventDefault();
                this.showFirstError();
            }
        });
        
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) this.clearError(field);
            });
            
            if (field.type === 'email' || field.type === 'tel') {
                field.addEventListener('paste', (e) => {
                    setTimeout(() => this.validateField(field), 10);
                });
            }
        });
    }
    
    validateAll() {
        let isValid = true;
        const fields = this.form.querySelectorAll('[required], [data-validate]');
        fields.forEach(field => {
            if (!this.validateField(field)) isValid = false;
        });
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const type = field.type || field.dataset.validate;
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            this.showError(field, 'This field is required');
            return false;
        }
        
        if (!value && !isRequired) {
            this.clearError(field);
            return true;
        }
        
        if (value) {
            if (type === 'email' && this.rules.email && !this.rules.email.pattern.test(value)) {
                this.showError(field, this.rules.email.message);
                return false;
            }
            
            if (type === 'tel' && this.rules.phone && !this.rules.phone.pattern.test(value.replace(/\s/g, ''))) {
                this.showError(field, this.rules.phone.message);
                return false;
            }
            
            if ((field.name.includes('name') || field.dataset.validate === 'name') && this.rules.name && !this.rules.name.pattern.test(value)) {
                this.showError(field, this.rules.name.message);
                return false;
            }
            
            if ((field.type === 'textarea' || field.dataset.validate === 'message') && this.rules.message && !this.rules.message.pattern.test(value)) {
                this.showError(field, this.rules.message.message);
                return false;
            }
        }
        
        this.clearError(field);
        return true;
    }
    
    showError(field, message) {
        field.classList.add('error');
        field.setAttribute('aria-invalid', 'true');
        
        let errorElement = field.nextElementSibling;
        if (errorElement?.classList.contains('error-message')) errorElement.remove();
        
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: slideDown 0.3s ease;
        `;
        
        field.parentNode.insertBefore(errorElement, field.nextSibling);
        
        field.style.animation = 'shake 0.5s';
        setTimeout(() => field.style.animation = '', 500);
    }
    
    clearError(field) {
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        
        const errorElement = field.nextElementSibling;
        if (errorElement?.classList.contains('error-message')) {
            errorElement.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => errorElement.remove(), 300);
        }
    }
    
    showFirstError() {
        const firstError = this.form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstError.focus();
        }
    }
    
    async submitViaAjax() {
        const submitButton = this.form.querySelector('[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        
        const formData = new FormData(this.form);
        
        try {
            const response = await fetch(this.form.action || '/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData)
            });
            
            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else throw new Error('Submission failed');
        } catch (error) {
            this.showSubmitError();
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
        }
    }
    
    showSuccess() {
        this.showMessage(
            'form-success-message',
            '<i class="fas fa-check-circle"></i><strong>Success!</strong><p>Your submission has been received.</p>',
            'linear-gradient(135deg, #28a745, #20c997)'
        );
    }
    
    showSubmitError() {
        this.showMessage(
            'form-error-message',
            '<i class="fas fa-exclamation-triangle"></i><strong>Error</strong><p>Something went wrong. Please try again.</p>',
            'linear-gradient(135deg, #dc3545, #c82333)'
        );
    }
    
    showMessage(className, html, background) {
        const message = document.createElement('div');
        message.className = className;
        message.innerHTML = html;
        message.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${background};
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease;
            max-width: 350px;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => message.remove(), 500);
        }, 4000);
    }
}

class FormAutoSave {
    constructor(formId, storageKey) {
        this.form = document.getElementById(formId);
        this.storageKey = storageKey || `form_draft_${formId}`;
        
        if (this.form && Utils.supportsLocalStorage()) this.init();
    }
    
    init() {
        this.loadDraft();
        
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', Utils.debounce(() => this.saveDraft(), 1000));
        });
        
        this.form.addEventListener('submit', () => this.clearDraft());
    }
    
    saveDraft() {
        const formData = new FormData(this.form);
        const data = {};
        formData.forEach((value, key) => {
            if (key !== 'website' && key !== 'password') data[key] = value;
        });
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }
    
    loadDraft() {
        const savedData = localStorage.getItem(this.storageKey);
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                Object.keys(data).forEach(key => {
                    const input = this.form.querySelector(`[name="${key}"]`);
                    if (input && !input.value) input.value = data[key];
                });
            } catch (e) {
                console.error('Error loading draft:', e);
            }
        }
    }
    
    clearDraft() {
        localStorage.removeItem(this.storageKey);
    }
}

// ===================================
// ANIMATION SYSTEM
// ===================================
class AnimationController {
    static initScrollAnimations() {
        const elements = document.querySelectorAll(
            '.mission-card, .event-card, .partnership-card, ' +
            '.benefit-card, .impact-card, .testimonial-card, ' +
            '.zone-card, .area-card'
        );
        
        if (elements.length === 0) return;
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.6s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, 100);
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            
            elements.forEach(el => observer.observe(el));
        }
    }
}

// ===================================
// COUNTER ANIMATION SYSTEM
// ===================================
class CounterAnimationSystem {
    constructor() {
        this.counters = new Map();
        this.observer = null;
        this.selectors = [
            '.stat-number',
            '.impact-number',
            '.stat-compact .number',
            '.event-stats .number',
            '.partnership-stats .number'
        ];
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupCounters());
        } else this.setupCounters();
    }
    
    setupCounters() {
        const allCounters = this.prepareAllCounters();
        if (allCounters.length === 0) return;
        
        if ('IntersectionObserver' in window) this.setupIntersectionObserver(allCounters);
        else this.animateAllCounters(allCounters);
    }
    
    prepareAllCounters() {
        const counters = [];
        this.selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (!el.classList.contains('counted')) {
                    const counterType = this.prepareCounterElement(el);
                    if (counterType !== 'skip') counters.push(el);
                }
            });
        });
        return counters;
    }
    
    prepareCounterElement(element) {
        if (element.hasAttribute('data-target')) {
            element.setAttribute('data-counter-type', 'numeric');
            if (!element.textContent.includes('0') && !element.classList.contains('counted')) {
                element.textContent = '0';
            }
            return 'numeric';
        }
        
        if (element.hasAttribute('data-text')) {
            element.setAttribute('data-counter-type', 'text');
            return 'text';
        }
        
        const currentText = element.textContent.trim();
        const numberMatch = currentText.match(/(\d+)\+?/);
        
        if (numberMatch) {
            const targetValue = parseInt(numberMatch[1]);
            element.setAttribute('data-target', targetValue);
            element.setAttribute('data-original-text', currentText);
            element.setAttribute('data-counter-type', 'numeric');
            
            if (currentText.includes('+')) element.setAttribute('data-has-plus', 'true');
            element.textContent = '0';
            return 'numeric';
        }
        
        if (!currentText.match(/\d/)) {
            element.setAttribute('data-text', currentText);
            element.setAttribute('data-counter-type', 'text');
            return 'text';
        }
        
        element.classList.add('counted');
        return 'skip';
    }
    
    setupIntersectionObserver(counters) {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.counters.has(entry.target)) {
                    const index = Array.from(counters).indexOf(entry.target);
                    setTimeout(() => {
                        this.animateCounter(entry.target);
                        this.counters.set(entry.target, true);
                        this.observer.unobserve(entry.target);
                    }, index * 200);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
        
        counters.forEach(counter => this.observer.observe(counter));
    }
    
    animateCounter(element) {
        if (element.classList.contains('counted')) return;
        
        const counterType = element.getAttribute('data-counter-type');
        switch (counterType) {
            case 'numeric': this.animateNumericCounter(element); break;
            case 'text': this.animateTextCounter(element); break;
            default: this.restoreOriginalContent(element);
        }
    }
    
    animateNumericCounter(element) {
        const targetValue = this.getTargetValue(element);
        if (isNaN(targetValue) || targetValue === 0) {
            this.restoreOriginalContent(element);
            return;
        }
        
        const duration = this.calculateDuration(targetValue);
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const increment = targetValue / totalFrames;
        
        let currentValue = 0;
        let frame = 0;
        
        element.classList.add('animating');
        
        const animate = () => {
            frame++;
            currentValue += increment;
            
            if (frame < totalFrames && currentValue < targetValue) {
                element.textContent = this.formatNumber(Math.floor(currentValue));
                requestAnimationFrame(animate);
            } else this.finalizeNumericCounter(element, targetValue);
        };
        
        requestAnimationFrame(animate);
    }
    
    animateTextCounter(element) {
        const finalText = element.getAttribute('data-text');
        if (!finalText) {
            this.restoreOriginalContent(element);
            return;
        }
        
        element.classList.add('animating');
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.textContent = finalText;
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            
            setTimeout(() => {
                element.classList.remove('animating');
                element.classList.add('counted');
                element.style.transition = '';
            }, 600);
        }, 50);
    }
    
    calculateDuration(targetValue) {
        if (targetValue > 1000) return 2500;
        if (targetValue > 500) return 2000;
        if (targetValue > 100) return 1800;
        return 1500;
    }
    
    getTargetValue(element) {
        if (element.hasAttribute('data-target')) return parseInt(element.getAttribute('data-target'));
        return parseInt(element.textContent.replace(/[^0-9]/g, ''));
    }
    
    formatNumber(num) { return num.toLocaleString(); }
    
    finalizeNumericCounter(element, targetValue) {
        const hasPlus = element.hasAttribute('data-has-plus');
        const finalText = this.formatNumber(targetValue) + (hasPlus ? '+' : '');
        
        element.textContent = finalText;
        element.classList.remove('animating');
        element.classList.add('counted');
        
        this.triggerCelebration(element);
        this.cleanupElement(element);
    }
    
    restoreOriginalContent(element) {
        const originalText = element.getAttribute('data-original-text');
        if (originalText) element.textContent = originalText;
        element.classList.add('counted');
        this.cleanupElement(element);
    }
    
    cleanupElement(element) {
        element.removeAttribute('data-original-text');
        element.removeAttribute('data-has-plus');
    }
    
    triggerCelebration(element) {
        const parentCard = element.closest('.impact-card, .stat-compact, .stat-item');
        if (parentCard) {
            parentCard.style.transform = 'scale(1.05)';
            parentCard.style.boxShadow = '0 10px 30px rgba(242, 132, 47, 0.25)';
            
            setTimeout(() => {
                parentCard.style.transform = '';
                parentCard.style.boxShadow = '';
                parentCard.style.transition = 'all 0.4s ease';
            }, 600);
        }
        
        element.style.color = '#f2f842';
        element.style.textShadow = '0 0 15px rgba(242, 248, 66, 0.6)';
        
        setTimeout(() => {
            element.style.color = '';
            element.style.textShadow = '';
            element.style.transition = 'all 0.5s ease';
        }, 1000);
    }
    
    triggerAllCounters() {
        const counters = this.prepareAllCounters();
        counters.forEach((counter, index) => setTimeout(() => this.animateCounter(counter), index * 150));
    }
    
    resetAllCounters() {
        const counters = this.findAllCounters();
        counters.forEach(counter => {
            counter.classList.remove('counted', 'animating');
            counter.style.cssText = '';
            counter.removeAttribute('data-original-text');
            counter.removeAttribute('data-has-plus');
            counter.removeAttribute('data-counter-type');
            counter.removeAttribute('data-text');
        });
        this.counters.clear();
        this.setupCounters();
    }
    
    findAllCounters() {
        const counters = [];
        this.selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => counters.push(el));
        });
        return counters;
    }
    
    getCounterStats() {
        const counters = this.findAllCounters();
        const stats = { total: counters.length, counted: 0, numeric: 0, text: 0 };
        
        counters.forEach(counter => {
            const type = counter.getAttribute('data-counter-type') || 'unknown';
            if (type === 'numeric') stats.numeric++;
            if (type === 'text') stats.text++;
            if (counter.classList.contains('counted')) stats.counted++;
        });
        
        return stats;
    }
    
    destroy() {
        if (this.observer) this.observer.disconnect();
        this.counters.clear();
    }
}

// ===================================
// EVENT FILTERS SYSTEM
// ===================================
class EventFilters {
    static init() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const eventCards = document.querySelectorAll('.event-card');
        
        if (filterButtons.length === 0 || eventCards.length === 0) return;
        
        eventCards.forEach(card => {
            card.style.transition = 'all 0.4s ease';
            card.setAttribute('aria-hidden', 'false');
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const filter = this.getAttribute('data-filter');
                
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                EventFilters.filterCards(eventCards, filter);
            });
        });
    }
    
    static filterCards(cards, filter) {
        let visibleCount = 0;
        
        cards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow) {
                visibleCount++;
                EventFilters.showCard(card, index);
            } else EventFilters.hideCard(card);
        });
        
        EventFilters.announceFilterResults(visibleCount, filter);
    }
    
    static showCard(card, delayIndex) {
        card.style.display = 'block';
        card.setAttribute('aria-hidden', 'false');
        
        void card.offsetWidth;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.pointerEvents = 'auto';
        }, delayIndex * 80);
    }
    
    static hideCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.pointerEvents = 'none';
        card.setAttribute('aria-hidden', 'true');
        
        setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
        }, 400);
    }
    
    static announceFilterResults(count, filter) {
        const message = count === 1 
            ? `Showing 1 ${filter === 'all' ? '' : filter + ' '}event`
            : `Showing ${count} ${filter === 'all' ? '' : filter + ' '}events`;
        
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
    
    static resetFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const eventCards = document.querySelectorAll('.event-card');
        
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-pressed', 'false');
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            }
        });
        
        this.filterCards(eventCards, 'all');
    }
}

// ===================================
// PAGE COMPONENTS
// ===================================
class PageComponents {
    static setActivePage() {
        const currentPage = Utils.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            if (href === currentPage || 
                (currentPage === '' && href === 'index.html') ||
                (currentPage === 'index.html' && href === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }

    static initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    
                    target.setAttribute('tabindex', '-1');
                    target.focus({ preventScroll: true });
                    setTimeout(() => target.removeAttribute('tabindex'), 1000);
                }
            });
        });
    }

    static initEventFilters() { EventFilters.init(); }

    static initDonationForm() {
        const amountButtons = document.querySelectorAll('.amount-btn');
        const customInput = document.querySelector('.custom-amount-input');
        const customField = document.getElementById('customAmount');
        
        if (amountButtons.length === 0) return;
        
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                const amount = this.getAttribute('data-amount');
                
                amountButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-pressed', 'true');
                
                if (amount === 'custom') {
                    if (customInput) {
                        customInput.style.display = 'block';
                        customField?.focus();
                    }
                    PageComponents.updateDisplay(customField?.value || 100);
                } else {
                    if (customInput) customInput.style.display = 'none';
                    PageComponents.updateDisplay(amount);
                }
            });
        });
        
        if (customField) {
            customField.addEventListener('input', function() {
                const value = parseFloat(this.value) || 0;
                if (value > 0) PageComponents.updateDisplay(value);
            });
        }
    }

    static updateDisplay(amount) {
        const displayAmount = document.getElementById('displayAmount');
        if (displayAmount) displayAmount.textContent = Utils.formatCurrency(amount);
    }
}

// ===================================
// ACCESSIBILITY FEATURES
// ===================================
class Accessibility {
    static initSkipLink() {
        const skipLink = document.querySelector('.skip-to-content');
        if (!skipLink) return;
        
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const main = document.querySelector('main') || 
                         document.querySelector('#main-content') ||
                         document.querySelector('.hero');
            if (main) {
                main.setAttribute('tabindex', '-1');
                main.focus({ preventScroll: false });
                main.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    static announcePageChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        `;
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
class Performance {
    constructor() {
        this.observers = new Map();
        this.init();
    }
    
    static init() {
        if (!window.besorahPerformance) window.besorahPerformance = new Performance();
    }
    
    init() {
        this.optimizeImages();
        this.lazyLoadComponents();
        this.optimizeScrolling();
        this.prefetchCriticalResources();
        this.setupServiceWorker();
        this.preventLayoutShifts();
    }
    
    optimizeImages() {
        if (!('IntersectionObserver' in window)) {
            this.fallbackImageLoading();
            return;
        }

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px 0px', threshold: 0.01 });
        
        document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
        
        this.observers.set('images', imageObserver);
    }
    
    loadImage(img) {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
        }
        
        img.classList.add('loaded');
        img.addEventListener('load', () => img.style.opacity = '1');
    }
    
    fallbackImageLoading() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            if (Utils.isInViewport(img)) this.loadImage(img);
        });
    }
    
    lazyLoadComponents() {
        const componentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const component = entry.target;
                    const componentType = component.dataset.component;
                    
                    switch(componentType) {
                        case 'carousel': this.initializeCarousel(component); break;
                        case 'counter': this.animateCounter(component); break;
                        case 'video': this.loadVideo(component); break;
                        case 'map': this.loadMap(component); break;
                    }
                    
                    componentObserver.unobserve(component);
                }
            });
        }, { rootMargin: '100px 0px', threshold: 0.1 });
        
        document.querySelectorAll('[data-component]').forEach(component => {
            componentObserver.observe(component);
        });
        
        this.observers.set('components', componentObserver);
    }
    
    optimizeScrolling() {
        let ticking = false;
        let lastScrollY = window.scrollY;
        
        const handleScroll = Utils.throttle(() => {
            const currentScrollY = window.scrollY;
            const scrollDiff = Math.abs(currentScrollY - lastScrollY);
            
            if (scrollDiff > 5) {
                this.processScroll(currentScrollY, lastScrollY);
                lastScrollY = currentScrollY;
            }
        }, 16);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
    
    processScroll(current, previous) {
        const header = document.querySelector('header');
        const scrollTop = document.getElementById('scrollTopBtn');
        
        if (header) {
            if (current > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }
        
        if (scrollTop && window.ScrollToTopInstance) {
            if (current > 300) window.ScrollToTopInstance.show();
            else window.ScrollToTopInstance.hide();
        }
    }
    
    prefetchCriticalResources() {
        const prefetchLinks = new Set();
        
        document.querySelectorAll('a[href^="/"], a[href^="./"]').forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (!prefetchLinks.has(href) && this.shouldPrefetch(href)) {
                    this.prefetchResource(href);
                    prefetchLinks.add(href);
                }
            }, { once: true, passive: true });
            
            link.addEventListener('touchstart', () => {
                const href = link.getAttribute('href');
                if (!prefetchLinks.has(href) && this.shouldPrefetch(href)) {
                    this.prefetchResource(href);
                    prefetchLinks.add(href);
                }
            }, { once: true, passive: true });
        });
        
        this.preconnectDomains();
    }
    
    shouldPrefetch(href) {
        return !href.startsWith('http') && 
               !href.startsWith('#') && 
               !href.startsWith('mailto:') && 
               !href.startsWith('tel:') &&
               href !== window.location.pathname;
    }
    
    prefetchResource(href) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        prefetchLink.as = 'document';
        document.head.appendChild(prefetchLink);
    }
    
    preconnectDomains() {
        ['https://cdnjs.cloudflare.com', 'https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
        });
    }
    
    setupServiceWorker() {
        if ('serviceWorker' in navigator && !window.location.hostname.includes('localhost')) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    this.showUpdateNotification();
                                }
                            });
                        });
                    })
                    .catch(err => console.log('SW registration failed:', err));
            });
        }
    }
    
    showUpdateNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `<p>New version available!</p><button onclick="window.location.reload()">Update</button>`;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #205782;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            z-index: 10000;
        `;
        document.body.appendChild(notification);
    }
    
    preventLayoutShifts() {
        document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
            if (img.naturalWidth && img.naturalHeight) {
                img.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
            }
        });
        
        document.querySelectorAll('[data-height]').forEach(el => {
            const height = el.dataset.height;
            el.style.minHeight = height + 'px';
        });
    }
    
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}

// ===================================
// RESOURCE HINTS
// ===================================
class ResourceHints {
    static addDNSPrefetch(domains) {
        domains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'dns-prefetch';
            link.href = domain;
            document.head.appendChild(link);
        });
    }
    
    static addPreload(resources) {
        resources.forEach(({ href, as, type }) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = href;
            link.as = as;
            if (type) link.type = type;
            document.head.appendChild(link);
        });
    }
    
    static addPreloadCritical() {
        this.addPreload([
            { href: '/css/main.css', as: 'style' },
            { href: '/images/logo.png', as: 'image' },
            { href: '/fonts/custom.woff2', as: 'font', type: 'font/woff2' }
        ]);
    }
}

// ===================================
// OFFLINE & SERVICE WORKER
// ===================================
class OfflineManager {
    static init() {
        window.addEventListener('online', () => {
            const notification = document.getElementById('offlineNotification');
            if (notification) notification.remove();
        });

        window.addEventListener('offline', () => {
            if (!document.getElementById('offlineNotification')) {
                const notice = document.createElement('div');
                notice.id = 'offlineNotification';
                notice.innerHTML = `
                    <div style="position: fixed; bottom: 20px; left: 20px; background: #f59e0b; 
                         color: white; padding: 1rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); 
                         z-index: 9999; max-width: 300px;">
                        <strong>⚠️ You're offline</strong>
                        <p style="margin: 0.5rem 0 0; font-size: 0.9rem;">Some features may not work.</p>
                    </div>
                `;
                document.body.appendChild(notice);
            }
        });
    }
}

// ===================================
// MODAL SYSTEMS
// ===================================
class PrayerModal {
    static openModal(type) {
        const modal = document.getElementById('prayerModal');
        const prayerTypeInput = document.getElementById('prayerType');
        
        if (modal && prayerTypeInput) {
            prayerTypeInput.value = type;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const focusableElements = modal.querySelectorAll('button, input, textarea, select, a[href]');
            if (focusableElements.length > 0) focusableElements[0].focus();
        }
    }

    static closeModal() {
        const modal = document.getElementById('prayerModal');
        
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            const prayerForm = document.getElementById('prayerForm');
            if (prayerForm) {
                prayerForm.reset();
                prayerForm.querySelectorAll('.field-error').forEach(error => error.remove());
            }
        }
    }

    static init() {
        const prayerModal = document.getElementById('prayerModal');
        if (!prayerModal) return;
        
        prayerModal.addEventListener('click', function(e) {
            if (e.target === this) PrayerModal.closeModal();
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && prayerModal.classList.contains('active')) {
                PrayerModal.closeModal();
            }
        });
        
        let touchStartY = 0;
        let touchStartX = 0;
        
        prayerModal.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
        }, { passive: true });
        
        prayerModal.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            const diffY = touchStartY - touchEndY;
            const diffX = Math.abs(touchStartX - touchEndX);
            
            if (diffY < -100 && diffX < 50) PrayerModal.closeModal();
        }, { passive: true });
    }
}

// ===================================
// TOUCH FEEDBACK SYSTEM
// ===================================
class TouchFeedback {
    static init() {
        const touchElements = document.querySelectorAll('.nav-link, .btn-donate, .hamburger, .nav-logo a');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touched');
                
                if (this.classList.contains('nav-link')) {
                    const ripple = document.createElement('span');
                    ripple.classList.add('touch-ripple');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    ripple.style.width = ripple.style.height = size + 'px';
                    ripple.style.left = (e.touches[0].clientX - rect.left - size/2) + 'px';
                    ripple.style.top = (e.touches[0].clientY - rect.top - size/2) + 'px';
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        if (ripple.parentNode === this) this.removeChild(ripple);
                    }, 600);
                }
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => this.classList.remove('touched'), 150);
            }, { passive: true });
            
            element.addEventListener('touchcancel', function() {
                this.classList.remove('touched');
            }, { passive: true });
        });
    }
}

// ===================================
// RESOURCES PAGE FUNCTIONALITY
// ===================================
class ResourcesPage {
    constructor() {
        this.carousels = [];
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.initializeCarousels();
        this.initializeFilters();
        this.initializeEmailGate();
        this.initializeTouchEnhancements();
        this.initializeFreeDownloads();
    }
    
    initializeCarousels() {
        document.querySelectorAll('.category-section').forEach((category) => {
            const carousel = category.querySelector('.resources-carousel');
            const prevBtn = category.querySelector('.carousel-btn.prev');
            const nextBtn = category.querySelector('.carousel-btn.next');
            
            if (!carousel) return;
            
            const carouselInstance = {
                element: carousel,
                prevBtn,
                nextBtn,
                isScrolling: false,
                scrollAmount: 0
            };
            
            const card = carousel.querySelector('.resource-card');
            if (card) carouselInstance.scrollAmount = card.offsetWidth + 30;
            
            if (prevBtn) prevBtn.addEventListener('click', (e) => this.scrollCarousel(carouselInstance, -1));
            if (nextBtn) nextBtn.addEventListener('click', (e) => this.scrollCarousel(carouselInstance, 1));
            
            carousel.addEventListener('scroll', Utils.throttle(() => this.updateNavigationButtons(carouselInstance), 100), { passive: true });
            this.enableDragScroll(carousel);
            this.updateNavigationButtons(carouselInstance);
            
            this.carousels.push(carouselInstance);
        });
    }
    
    scrollCarousel(carouselInstance, direction) {
        const { element, scrollAmount } = carouselInstance;
        if (carouselInstance.isScrolling) return;
        
        carouselInstance.isScrolling = true;
        element.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
        
        setTimeout(() => {
            carouselInstance.isScrolling = false;
            this.updateNavigationButtons(carouselInstance);
        }, 300);
    }
    
    updateNavigationButtons(carouselInstance) {
        const { element, prevBtn, nextBtn } = carouselInstance;
        const scrollLeft = element.scrollLeft;
        const maxScroll = element.scrollWidth - element.clientWidth;
        
        if (prevBtn) {
            const isDisabled = scrollLeft <= 10;
            prevBtn.disabled = isDisabled;
            prevBtn.style.opacity = isDisabled ? '0.3' : '1';
            prevBtn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
            prevBtn.setAttribute('aria-hidden', isDisabled);
        }
        
        if (nextBtn) {
            const isDisabled = scrollLeft >= maxScroll - 10;
            nextBtn.disabled = isDisabled;
            nextBtn.style.opacity = isDisabled ? '0.3' : '1';
            nextBtn.style.cursor = isDisabled ? 'not-allowed' : 'pointer';
            nextBtn.setAttribute('aria-hidden', isDisabled);
        }
    }
    
    enableDragScroll(carousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        const handleStart = (pageX) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.scrollSnapType = 'none';
        };
        
        const handleMove = (pageX) => {
            if (!isDown) return;
            const x = pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        };
        
        const handleEnd = () => {
            isDown = false;
            carousel.style.cursor = 'grab';
            carousel.style.scrollSnapType = 'x mandatory';
            
            const card = carousel.querySelector('.resource-card');
            if (card) {
                const cardWidth = card.offsetWidth + 30;
                const currentScroll = carousel.scrollLeft;
                const nearestCard = Math.round(currentScroll / cardWidth);
                carousel.scrollTo({ left: nearestCard * cardWidth, behavior: 'smooth' });
            }
        };
        
        carousel.addEventListener('mousedown', (e) => { e.preventDefault(); handleStart(e.pageX); });
        carousel.addEventListener('mouseleave', handleEnd);
        carousel.addEventListener('mouseup', handleEnd);
        carousel.addEventListener('mousemove', (e) => { if (isDown) { e.preventDefault(); handleMove(e.pageX); } });
        
        carousel.addEventListener('touchstart', (e) => handleStart(e.touches[0].pageX), { passive: true });
        carousel.addEventListener('touchend', handleEnd, { passive: true });
        carousel.addEventListener('touchcancel', handleEnd, { passive: true });
        carousel.addEventListener('touchmove', (e) => { if (isDown) handleMove(e.touches[0].pageX); }, { passive: true });
        
        carousel.style.cursor = 'grab';
    }
    
    initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const categorySections = document.querySelectorAll('.category-section');
        
        if (filterButtons.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (button.disabled) return;
                
                const category = button.dataset.category;
                if (this.currentFilter === category) return;
                
                filterButtons.forEach(btn => btn.disabled = true);
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                
                this.currentFilter = category;
                this.filterSections(categorySections, category);
                
                setTimeout(() => filterButtons.forEach(btn => btn.disabled = false), 400);
                Accessibility.announcePageChange(`Showing ${category === 'all' ? 'all' : category} resources`);
            });
        });
    }
    
    filterSections(sections, category) {
        sections.forEach((section, index) => {
            const sectionCategory = section.dataset.category;
            
            if (category === 'all' || sectionCategory === category) {
                section.style.display = 'block';
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 50);
                section.setAttribute('aria-hidden', 'false');
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    if (section.style.opacity === '0') section.style.display = 'none';
                }, 300);
            }
        });
        
        setTimeout(() => {
            const resourcesSection = document.querySelector('.resources-section');
            if (resourcesSection) {
                const headerOffset = 140;
                const elementPosition = resourcesSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 100);
    }
    
    initializeEmailGate() {
        const modal = document.getElementById('emailGateModal');
        if (!modal) return;
        
        window.openEmailGate = (resourceName, fileName) => {
            document.getElementById('gateResourceTitle').textContent = `Get Access to ${resourceName}`;
            document.getElementById('resourceName').value = resourceName;
            document.getElementById('resourceFile').value = fileName;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => modal.querySelector('input')?.focus(), 100);
        };
        
        window.closeEmailGate = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                const form = modal.querySelector('.email-gate-form');
                if (form) {
                    form.style.display = 'block';
                    form.reset();
                    form.querySelectorAll('.error-message').forEach(error => error.remove());
                    form.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
                }
                const successMsg = modal.querySelector('.download-success');
                if (successMsg) successMsg.classList.remove('show');
            }, 300);
        };
        
        modal.addEventListener('click', (e) => { if (e.target === modal) window.closeEmailGate(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) window.closeEmailGate(); });
        
        const form = modal.querySelector('.email-gate-form');
        if (form) {
            new FormValidator(form.id);
            form.addEventListener('submit', (e) => { e.preventDefault(); this.handleEmailGateSubmit(form); });
        }
    }
    
    async handleEmailGateSubmit(form) {
        const submitButton = form.querySelector('.email-gate-submit');
        const originalText = submitButton.innerHTML;
        
        const validator = new FormValidator(form.id);
        if (!validator.validateAll()) {
            validator.showFirstError();
            return;
        }
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Processing...</span>';
        submitButton.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            form.style.display = 'none';
            document.getElementById('downloadSuccess').classList.add('show');
            
            const fileName = document.getElementById('resourceFile').value;
            if (fileName && fileName !== '#') {
                const link = document.createElement('a');
                link.href = fileName;
                link.download = document.getElementById('resourceName').value;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            setTimeout(() => window.closeEmailGate(), 3000);
        } catch (error) {
            this.showEmailGateError('Something went wrong. Please try again.');
        } finally {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }
    }
    
    showEmailGateError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'email-gate-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #f8d7da;
            color: #721c24;
            padding: 0.75rem;
            border-radius: 4px;
            margin-top: 1rem;
            border: 1px solid #f5c6cb;
        `;
        
        const form = document.querySelector('.email-gate-form');
        form?.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
    }
    
    initializeFreeDownloads() {
        window.downloadFree = (event, resourceName, fileUrl = '#') => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            const button = event?.currentTarget;
            if (!button) return;
            
            const originalHTML = button.innerHTML;
            const originalBackground = button.style.background;
            
            button.innerHTML = '<i class="fas fa-check"></i><span>Downloaded!</span>';
            button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
            button.disabled = true;
            
            if (fileUrl && fileUrl !== '#') {
                const link = document.createElement('a');
                link.href = fileUrl;
                link.download = resourceName;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
            
            this.trackDownload(resourceName, 'free');
            
            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.style.background = originalBackground;
                button.disabled = false;
            }, 2500);
        };
    }
    
    trackDownload(resourceName, type) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'download', {
                'event_category': 'resource',
                'event_label': resourceName,
                'value': type === 'free' ? 0 : 1
            });
        }
    }
    
    initializeTouchEnhancements() {
        const touchElements = document.querySelectorAll('.filter-btn, .btn-download, .carousel-btn, .resource-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
                this.style.transition = 'transform 0.1s ease';
            }, { passive: true });
            
            element.addEventListener('touchend', function() { this.style.transform = ''; }, { passive: true });
            element.addEventListener('touchcancel', function() { this.style.transform = ''; }, { passive: true });
        });
    }
    
    handleResize() {
        this.carousels.forEach(carouselInstance => {
            const card = carouselInstance.element.querySelector('.resource-card');
            if (card) carouselInstance.scrollAmount = card.offsetWidth + 30;
            this.updateNavigationButtons(carouselInstance);
        });
    }
    
    destroy() {
        this.carousels.forEach(carousel => carousel.element.removeEventListener('scroll', this.updateNavigationButtons));
        this.carousels = [];
    }
}

// ===================================
// INITIALIZATION CONTROLLER
// ===================================
class AppInitializer {
    static init() {
        console.log('Besorah Yeshua Ministry - Initializing Complete System...');
        
        try {
            new ErrorHandler();
            new LogoLoader();
            Performance.init();
            
            ResourceHints.addDNSPrefetch(['//cdnjs.cloudflare.com', '//fonts.googleapis.com', '//fonts.gstatic.com']);
            
            PageComponents.setActivePage();
            PageComponents.initSmoothScroll();
            Accessibility.initSkipLink();
            
            AnimationController.initScrollAnimations();
            EventFilters.init();
            PageComponents.initDonationForm();
            PrayerModal.init();
            
            this.initResourcesPage();
            TouchFeedback.init();
            OfflineManager.init();
            
            const formIds = ['contactForm', 'prayerForm', 'registrationForm', 'newsletterForm', 'emailGateForm'];
            formIds.forEach(id => { if (document.getElementById(id)) new FormValidator(id); });
            
            if (document.getElementById('contactForm')) new FormAutoSave('contactForm');
            
            this.hidePageLoader();
            this.updateCopyrightYear();
            BesorahYeshua.init = true;
            
            console.log('✅ Complete System Initialized Successfully');
        } catch (error) {
            console.error('Initialization error:', error);
        }
    }
    
    static initResourcesPage() {
        const resourcesSection = document.querySelector('.resources-section, .category-section');
        if (!resourcesSection) return;
        
        window.resourcesPageInstance = new ResourcesPage();
        console.log('✅ Resources page functionality initialized');
        
        window.addEventListener('resize', Utils.debounce(() => window.resourcesPageInstance.handleResize(), 250));
    }
    
    static hidePageLoader() {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 300);
        }
        document.body.classList.add('loaded');
    }

    static updateCopyrightYear() {
        const year = new Date().getFullYear();
        document.querySelectorAll('#year, .copyright-year').forEach(el => el.textContent = year);
    }
}

// ===================================
// GLOBAL EXPORTS & INITIALIZATION
// ===================================
window.BesorahYeshua = BesorahYeshua;
window.openModal = PrayerModal.openModal;
window.closeModal = PrayerModal.closeModal;

// Initialize counter system
let counterSystem;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        counterSystem = new CounterAnimationSystem();
        window.counterSystem = counterSystem;
    });
} else {
    counterSystem = new CounterAnimationSystem();
    window.counterSystem = counterSystem;
}

// Counter scroll detection
function enhancedScrollTrigger() {
    if (!window.counterSystem) return;
    
    const counters = document.querySelectorAll(`
        .stat-number:not(.counted),
        .impact-number:not(.counted),
        .stat-compact .number:not(.counted),
        .event-stats .number:not(.counted),
        .partnership-stats .number:not(.counted)
    `);
    
    counters.forEach(counter => {
        if (Utils.isInViewport(counter)) window.counterSystem.animateCounter(counter);
    });
}

let scrollTimer;
window.addEventListener('scroll', () => {
    if (scrollTimer) return;
    scrollTimer = setTimeout(() => {
        enhancedScrollTrigger();
        scrollTimer = null;
    }, 50);
}, { passive: true });

// Fallback counter trigger
setTimeout(() => {
    if (window.counterSystem) {
        const unanimated = document.querySelectorAll(`
            .stat-number:not(.counted),
            .impact-number:not(.counted), 
            .stat-compact .number:not(.counted),
            .event-stats .number:not(.counted),
            .partnership-stats .number:not(.counted)
        `);
        if (unanimated.length > 0) window.counterSystem.triggerAllCounters();
    }
}, 4000);

// Global control functions
window.testAllCounters = () => window.counterSystem?.triggerAllCounters();
window.resetAllCounters = () => window.counterSystem?.resetAllCounters();
window.getCounterStats = () => window.counterSystem?.getCounterStats();

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${loadTime}ms`);
        }, 0);
    });
}

// Initialize application
document.addEventListener('DOMContentLoaded', AppInitializer.init);

// ===================================
// REQUIRED CSS ANIMATIONS
// ===================================
const mainStyles = document.createElement('style');
mainStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideDown {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideUp {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    input.error, textarea.error, select.error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
    
    .error-message {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        animation: slideDown 0.3s ease;
    }
    
    .form-success-message, .form-error-message {
        position: fixed;
        top: 100px;
        right: 20px;
        color: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        max-width: 350px;
    }
    
    .form-success-message { background: linear-gradient(135deg, #28a745, #20c997); }
    .form-error-message { background: linear-gradient(135deg, #dc3545, #c82333); }
    
    [type="submit"]:disabled { opacity: 0.7; cursor: not-allowed; }
    .fa-spinner { margin-right: 0.5rem; }
    
    img[data-src] { opacity: 0; transition: opacity 0.3s ease; }
    img.loaded { opacity: 1; }
    
    @media (prefers-reduced-motion: reduce) {
        * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    }
    
    .resources-carousel {
        scroll-behavior: smooth;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
    }
    
    .resource-card { scroll-snap-align: start; flex: 0 0 auto; }
    .category-section { transition: all 0.3s ease; }
    
    .filter-btn { transition: all 0.2s ease; }
    .filter-btn.active {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(32, 87, 130, 0.3);
    }
    
    .email-gate-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }
    
    .email-gate-modal.active { opacity: 1; visibility: visible; }
    
    .email-gate-content {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .email-gate-modal.active .email-gate-content { transform: scale(1); }
    
    .download-success { display: none; text-align: center; padding: 2rem; }
    .download-success.show { display: block; animation: fadeIn 0.5s ease; }
    
    .touch-ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple { to { transform: scale(2.5); opacity: 0; } }
    
    @media (hover: none) {
        .carousel-btn:not(:disabled):active { transform: scale(0.95); }
        .filter-btn:active { transform: scale(0.98); }
    }
`;
document.head.appendChild(mainStyles);

console.log('🙏 Besorah Yeshua Ministry - Main.js loaded successfully');