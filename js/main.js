// Photo metadata store
let photoMetadata = [];

// Current lightbox state
let currentGallery = [];
let currentIndex = 0;

// Initialize galleries on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryMetadata();
    setupLightbox();
    setupSmoothScroll();
    setupHeroParallax();
});

// Load gallery metadata and initialize
async function loadGalleryMetadata() {
    try {
        const response = await fetch('images/petaluma-gallery/metadata.json');
        photoMetadata = await response.json();
        setRandomHeroImage();
        initializeGallery();
    } catch (error) {
        console.error('Error loading gallery metadata:', error);
    }
}

// Set random hero image from gallery
function setRandomHeroImage() {
    if (photoMetadata.length === 0) return;

    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;

    // Pick a random photo from the metadata
    const randomIndex = Math.floor(Math.random() * photoMetadata.length);
    const randomPhoto = photoMetadata[randomIndex];

    heroImage.src = `images/petaluma-gallery/${randomPhoto.filename}`;
    heroImage.alt = randomPhoto.description;
}

// Initialize gallery with metadata
function initializeGallery() {
    const container = document.querySelector('[data-gallery="petaluma"]');
    if (!container) return;

    photoMetadata.forEach((photo, index) => {
        const imgPath = `images/petaluma-gallery/${photo.filename}`;
        const item = createGalleryItem(imgPath, photo.description, photo.photographer, index);
        container.appendChild(item);
    });

    // Setup lazy loading after all items are added
    setupLazyLoading();
}

// Create gallery item element
function createGalleryItem(imagePath, description, photographer, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.dataset.src = imagePath;
    img.alt = description;
    img.loading = 'lazy';

    item.appendChild(img);

    // Click handler for lightbox
    item.addEventListener('click', () => {
        openLightbox(index);
    });

    return item;
}

// Lazy Loading with Intersection Observer
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    // Observe all images
    setTimeout(() => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }, 100);
}

// Lightbox functionality
function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigateLightbox(-1));
    nextBtn.addEventListener('click', () => navigateLightbox(1));

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-content');
    const caption = lightbox.querySelector('.lightbox-caption');

    currentIndex = index;
    const photo = photoMetadata[currentIndex];
    const source = photo.source === 'pexels' ? 'Pexels' : 'Unsplash';

    img.src = `images/petaluma-gallery/${photo.filename}`;
    img.alt = photo.description;
    caption.innerHTML = `${photo.description}<br><span style="font-size: 0.9rem; opacity: 0.8;">Photo by ${photo.photographer} on ${source}</span>`;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = photoMetadata.length - 1;
    } else if (currentIndex >= photoMetadata.length) {
        currentIndex = 0;
    }

    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-content');
    const caption = lightbox.querySelector('.lightbox-caption');

    const photo = photoMetadata[currentIndex];
    const source = photo.source === 'pexels' ? 'Pexels' : 'Unsplash';
    img.src = `images/petaluma-gallery/${photo.filename}`;
    img.alt = photo.description;
    caption.innerHTML = `${photo.description}<br><span style="font-size: 0.9rem; opacity: 0.8;">Photo by ${photo.photographer} on ${source}</span>`;
}

// Smooth scroll for navigation links
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Setup hero parallax effect
function setupHeroParallax() {
    const heroImage = document.querySelector('.hero-image');
    const hero = document.querySelector('.hero');

    if (!heroImage || !hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBottom = hero.offsetTop + hero.offsetHeight;

        // Only apply parallax while hero is in view
        if (scrolled < heroBottom) {
            // Subtle parallax: move image slower than scroll (0.5 speed)
            const parallaxOffset = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallaxOffset}px)`;
        }
    }, { passive: true });
}

// Optional: Add scroll-based header background
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.background = 'rgba(250, 248, 245, 0.98)';
        header.style.boxShadow = '0 1px 5px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(250, 248, 245, 0.95)';
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
});
