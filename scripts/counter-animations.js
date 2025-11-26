// scripts/counter-animations.js
// Universal Counter Animation System for All Pages

class CounterAnimations {
    constructor() {
        this.initialized = false;
        this.selectors = [
            '.impact-number',
            '.stat-number', 
            '.stat-compact .number',
            '.event-stats .number',
            '.partnership-stats .number'
        ];
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        console.log('CounterAnimations: Setting up counters...');
        
        const allCounters = this.findAllCounters();
        
        if (allCounters.length === 0) {
            console.log('CounterAnimations: No counters found on this page');
            return;
        }
        
        console.log(`CounterAnimations: Found ${allCounters.length} counters`);
        
        // Prepare all counters
        allCounters.forEach(counter => this.prepareCounter(counter));
        
        // Setup intersection observer
        this.setupObserver(allCounters);
        
        // Fallback for older browsers
        this.setupFallback(allCounters);
        
        this.initialized = true;
    }
    
    findAllCounters() {
        const counters = [];
        this.selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => counters.push(el));
        });
        return counters;
    }
    
    prepareCounter(counter) {
        // Skip if already counted
        if (counter.classList.contains('counted')) return;
        
        // Handle text counters (like "Quarterly")
        if (counter.hasAttribute('data-text')) {
            counter.textContent = counter.getAttribute('data-text');
            counter.classList.add('counted');
            return;
        }
        
        // If already has data-target, ensure it starts at 0
        if (counter.hasAttribute('data-target') && !this.isZero(counter.textContent)) {
            counter.textContent = '0';
            return;
        }
        
        // Extract from text content if no data-target
        if (!counter.hasAttribute('data-target')) {
            this.extractFromText(counter);
        }
    }
    
    extractFromText(counter) {
        const text = counter.textContent.trim();
        const numberMatch = text.match(/(\d+)\+?/);
        
        if (numberMatch) {
            const target = parseInt(numberMatch[1]);
            counter.setAttribute('data-target', target);
            if (text.includes('+')) {
                counter.setAttribute('data-has-plus', 'true');
            }
            counter.textContent = '0';
        }
    }
    
    isZero(text) {
        return text === '0' || text === '0+' || text === '';
    }
    
    setupObserver(counters) {
        if (!('IntersectionObserver' in window)) {
            this.animateAllCounters(counters);
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        counters.forEach(counter => {
            if (!counter.classList.contains('counted')) {
                observer.observe(counter);
            }
        });
    }
    
    setupFallback(counters) {
        // Fallback: animate all counters after 4 seconds
        setTimeout(() => {
            const unanimated = counters.filter(counter => !counter.classList.contains('counted'));
            if (unanimated.length > 0) {
                console.log(`CounterAnimations: Fallback - animating ${unanimated.length} counters`);
                this.animateAllCounters(unanimated);
            }
        }, 4000);
    }
    
    animateCounter(counter) {
        if (counter.classList.contains('counted')) return;
        
        const target = parseInt(counter.getAttribute('data-target'));
        if (isNaN(target)) return;
        
        const hasPlus = counter.hasAttribute('data-has-plus');
        const duration = this.calculateDuration(target);
        const increment = target / (duration / 16);
        let current = 0;
        
        // Add animating class
        counter.classList.add('animating');
        
        const animate = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(animate);
            } else {
                this.finalizeCounter(counter, target, hasPlus);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    calculateDuration(target) {
        if (target > 1000) return 2500;
        if (target > 500) return 2000;
        return 1500;
    }
    
    finalizeCounter(counter, target, hasPlus) {
        counter.textContent = target.toLocaleString() + (hasPlus ? '+' : '');
        counter.classList.remove('animating');
        counter.classList.add('counted');
        
        // Celebration effect
        this.celebrateCounter(counter);
        
        // Clean up
        counter.removeAttribute('data-has-plus');
    }
    
    celebrateCounter(counter) {
        const parentCard = counter.closest('.impact-card, .stat-compact, .stat-item');
        
        if (parentCard) {
            parentCard.style.transform = 'scale(1.05)';
            parentCard.style.boxShadow = '0 8px 25px rgba(242, 132, 47, 0.25)';
            
            setTimeout(() => {
                parentCard.style.transform = '';
                parentCard.style.boxShadow = '';
            }, 600);
        }
        
        counter.style.color = '#f2f842';
        counter.style.textShadow = '0 0 10px rgba(242, 248, 66, 0.5)';
        
        setTimeout(() => {
            counter.style.color = '';
            counter.style.textShadow = '';
        }, 1000);
    }
    
    animateAllCounters(counters) {
        counters.forEach((counter, index) => {
            setTimeout(() => {
                this.animateCounter(counter);
            }, index * 150);
        });
    }
    
    // Public methods
    triggerAllCounters() {
        const counters = this.findAllCounters();
        counters.forEach(counter => {
            counter.classList.remove('counted');
            counter.textContent = '0';
            counter.style.cssText = '';
        });
        this.animateAllCounters(counters);
    }
    
    resetAllCounters() {
        const counters = this.findAllCounters();
        counters.forEach(counter => {
            counter.classList.remove('counted', 'animating');
            counter.textContent = '0';
            counter.style.cssText = '';
            counter.removeAttribute('data-has-plus');
        });
        this.setup();
    }
    
    getStats() {
        const counters = this.findAllCounters();
        return {
            total: counters.length,
            counted: counters.filter(c => c.classList.contains('counted')).length,
            animating: counters.filter(c => c.classList.contains('animating')).length
        };
    }
}

// Initialize the counter system
window.counterAnimations = new CounterAnimations();

// Global control functions
window.testAllCounters = function() {
    if (window.counterAnimations) {
        window.counterAnimations.triggerAllCounters();
    }
};

window.resetAllCounters = function() {
    if (window.counterAnimations) {
        window.counterAnimations.resetAllCounters();
    }
};

window.getCounterStats = function() {
    if (window.counterAnimations) {
        return window.counterAnimations.getStats();
    }
    return null;
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CounterAnimations;
}