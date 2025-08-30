// Translations
const translations = {
    en: {
        pageTitle: "Sham Restaurant",
        restaurantName: "Sham",
        tagline: "Delicious Moments Await – Authentic Taste, Always Fresh!",
        underConstruction: "This website is currently under construction, but we are open and accepting orders!",
        learnMore: "Learn More",
        impressumTitle: "Imprint",
        privacyTitle: "Privacy Policy",
        backToHome: "Back to Home",
        // Add more translations as needed
    },
    de: {
        pageTitle: "Sham Restaurant",
        restaurantName: "Sham",
        tagline: "Köstliche Momente erwarten Sie – Authentischer Geschmack, immer frisch!",
        underConstruction: "Diese Website befindet sich derzeit im Aufbau, aber wir sind geöffnet und nehmen Bestellungen an!",
        learnMore: "Mehr Erfahren",
        impressumTitle: "Impressum",
        privacyTitle: "Datenschutzerklärung",
        backToHome: "Zurück zur Startseite",
        // Add more translations as needed
    },
    ar: {
        pageTitle: "مطعم شام",
        restaurantName: "شام",
        tagline: "لحظات لذيذة في انتظارك - طعم أصيل، دائماً طازج!",
        underConstruction: "هذا الموقع قيد الإنشاء حالياً، لكننا مفتوحون ونستقبل الطلبات!",
        learnMore: "اعرف المزيد",
        impressumTitle: "هيئة التحرير",
        privacyTitle: "سياسة الخصوصية",
        backToHome: "العودة إلى الصفحة الرئيسية",
        // Add more translations as needed
    }
};

// Animation utility for reveal on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Always set default language to English
    if (!localStorage.getItem('language')) {
        localStorage.setItem('language', 'en');
    }
    let currentLanguage = localStorage.getItem('language');
    updateLanguage(currentLanguage);
    
    // Language option selection - direct click
    const langOptions = document.querySelectorAll('.lang-option');
    if (langOptions) {
        langOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                localStorage.setItem('language', lang);
                
                // Update active class
                document.querySelectorAll('.lang-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
                
                updateLanguage(lang);
            });
        });
    }
    
    // Function to update language
    function updateLanguage(lang) {
        // Update active class in dropdown
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.classList.remove('active');
            if (opt.getAttribute('data-lang') === lang) {
                opt.classList.add('active');
            }
        });
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                if (element.tagName === 'TITLE') {
                    element.textContent = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
        
        // Set HTML lang attribute
        document.documentElement.lang = lang;
        
        // Handle RTL for Arabic
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }
    
    // IntersectionObserver setup
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px"
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    // Observe all sections with animate-section class
    document.querySelectorAll('.animate-section').forEach(section => {
        revealObserver.observe(section);
    });
    
    // Back to top functionality
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
}