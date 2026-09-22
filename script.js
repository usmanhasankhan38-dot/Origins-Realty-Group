/**
 * Origins Realty Group - Ultra-Luxury Neumorphic Interactive Engine
 * Powered by Lenis Smooth Scroll, GSAP, and Custom 3D Tilt Physics
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // 2. Initialize 3D Perspective Tilt on Elements with .tilt-card
  init3DTilt();

  // 3. Initialize Sticky Floating Navbar behavior
  initNavbarScroll();

  // 4. Initialize Mobile Navigation Drawer
  initMobileDrawer();

  // 5. Initialize Property Filter Chips (for properties.html and index.html)
  initPropertyFilters();

  // 6. Initialize Property Details Modal
  initPropertyModal();

  // 7. Initialize Consultation Modal
  initConsultationModal();

  // 8. Initialize GSAP Scroll Animations
  initScrollAnimations();

  // 9. Initialize Interactive Lead Contact Form
  initContactForm();

  // 10. Number Counter Animation for Key Stats
  initCounterAnimations();

  // 11. Initialize Hero Showcase Estate Switcher
  initHeroShowcase();
});

/* ==========================================================================
   3D PERSPECTIVE TILT IMPLEMENTATION
   ========================================================================== */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  
  cards.forEach(card => {
    let bounds;
    
    function updateBounds() {
      bounds = card.getBoundingClientRect();
    }
    
    function onMouseMove(e) {
      if (!bounds) updateBounds();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.x;
      const topY = mouseY - bounds.y;
      const center = {
        x: leftX - bounds.width / 2,
        y: topY - bounds.height / 2
      };
      
      const maxRotation = 8; // degrees
      const rotateX = -(center.y / (bounds.height / 2)) * maxRotation;
      const rotateY = (center.x / (bounds.width / 2)) * maxRotation;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px) scale3d(1.01, 1.01, 1.01)`;
    }
    
    function onMouseEnter() {
      updateBounds();
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.25s ease';
    }
    
    function onMouseLeave() {
      card.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
    }
    
    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', updateBounds);
  });
}

/* ==========================================================================
   NAVBAR DYNAMIC SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  const isHeroPage = document.querySelector('.hero-video-container') !== null;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (isHeroPage) {
      if (scrollY > 80) {
        navbar.classList.add('nav-scrolled');
        navbar.style.background = 'rgba(235, 231, 223, 0.94)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)';
        navbar.style.border = '1px solid rgba(255, 255, 255, 0.6)';
        
        // Switch text colors for contrast on scroll
        const logo = navbar.querySelector('.nav-logo');
        if (logo) logo.classList.replace('text-white', 'text-stone-900');
        
        navbar.querySelectorAll('.nav-link').forEach(link => {
          link.classList.replace('text-white/90', 'text-stone-800');
          link.classList.replace('text-white', 'text-stone-800');
        });

        const ctaBtn = navbar.querySelector('.nav-consult-btn');
        if (ctaBtn) {
          ctaBtn.classList.replace('border-white', 'border-stone-400');
          ctaBtn.classList.replace('text-white', 'text-stone-900');
        }

        const burger = navbar.querySelector('.mobile-menu-btn');
        if (burger) {
          burger.classList.replace('text-white', 'text-stone-900');
        }
      } else {
        navbar.classList.remove('nav-scrolled');
        navbar.style.background = 'rgba(0, 0, 0, 0.25)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
        navbar.style.border = '1px solid rgba(255, 255, 255, 0.15)';

        const logo = navbar.querySelector('.nav-logo');
        if (logo) logo.classList.replace('text-stone-900', 'text-white');

        navbar.querySelectorAll('.nav-link').forEach(link => {
          link.classList.replace('text-stone-800', 'text-white/90');
        });

        const ctaBtn = navbar.querySelector('.nav-consult-btn');
        if (ctaBtn) {
          ctaBtn.classList.replace('border-stone-400', 'border-white');
          ctaBtn.classList.replace('text-stone-900', 'text-white');
        }

        const burger = navbar.querySelector('.mobile-menu-btn');
        if (burger) {
          burger.classList.replace('text-stone-900', 'text-white');
        }
      }
    } else {
      // Subpages always use soft Neumorphic appearance
      if (scrollY > 20) {
        navbar.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.9)';
      } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8)';
      }
    }
  });
}

/* ==========================================================================
   MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const openButtons = document.querySelectorAll('.open-drawer-btn');
  const closeButtons = document.querySelectorAll('.close-drawer-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  closeButtons.forEach(btn => btn.addEventListener('click', closeDrawer));
  if (backdrop) backdrop.addEventListener('click', closeDrawer);
}

/* ==========================================================================
   PROPERTY LISTINGS DATA & MODAL
   ========================================================================== */
const propertyCatalog = {
  '616-camino-rancheros': {
    title: '616 Camino Rancheros',
    location: 'Historic Eastside, Santa Fe, NM 87505',
    status: 'FOR SALE',
    price: '$1,320,000',
    beds: '3 BD',
    baths: '2 BA',
    sqft: '2,377 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Authentic hand-plastered adobe walls',
      'Original vigas & latillas high wood beam ceilings',
      'Kiva wood-burning fireplaces',
      'Unfinished full basement with wine cellar / studio potential',
      'Private walled courtyards with drought-tolerant native gardens',
      'Walk to Canyon Road galleries & Downtown Plaza'
    ],
    description: 'An irreplaceable Santa Fe treasure. 616 Camino Rancheros embodies the authentic soul of Northern New Mexico with thick historic adobe construction, heavy rough-hewn timber vigas, and sun-drenched artisan living spaces. The property includes an extraordinarily rare unfinished basement level primed for a master wine cellar, creative art studio, or guest retreat.'
  },
  '11-via-de-las-yeguas': {
    title: '11 Via de Las Yeguas',
    location: 'Tano Road / Las Campanas Foothills, Santa Fe, NM 87506',
    status: 'SOLD',
    price: '$2,450,000 (Represented Seller)',
    beds: '4 BD',
    baths: '5 BA',
    sqft: '4,890 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    features: [
      'Luxury equestrian facilities & 4-stall barn',
      'Expansive 5.2-acre gated estate',
      '360-degree panoramic Sangre de Cristo mountain views',
      'Chef gourmet kitchen with Sub-Zero and Wolf appliances',
      'Deep portals with radiant heated stone patios',
      'Separate luxury casita for guests or caretaker'
    ],
    description: 'A benchmark equestrian estate blending high-desert architectural mastery with equestrian luxury. Privately situated with sweeping vistas of the Jemez and Sangre de Cristo mountain ranges, offering private riding trails, custom stall facilities, and exquisite custom finishes throughout.'
  },
  '408-camino-del-monte-sol': {
    title: '408 Camino del Monte Sol',
    location: 'Historic Eastside Art Colony, Santa Fe, NM 87505',
    status: 'SOLD',
    price: '$1,895,000 (Sold by Origins)',
    beds: '4 BD',
    baths: '3 BA',
    sqft: '3,198 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80'
    ],
    features: [
      'Historic Santa Fe Art Colony pedigree',
      'Saltillo tile and reclaimed hardwood flooring',
      'Three authentic kiva fireplaces',
      'Lush private enclosed garden with mature fruit trees',
      'Dedicated artist painting studio with skylights'
    ],
    description: 'Immersed in Santa Fe artistic lore along Camino del Monte Sol. This historic residence seamlessly bridges ancestral pueblo architectural charm with contemporary refinement, celebrated for its expansive studio light, historic woodwork, and secluded courtyard paradise.'
  },
  '1047-camino-san-acacio': {
    title: '1047 Camino San Acacio A',
    location: 'Museum Hill Corridor, Santa Fe, NM 87505',
    status: 'SOLD',
    price: '$1,275,000 (Closed)',
    beds: '2 BD',
    baths: '2 BA',
    sqft: '2,711 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80'
    ],
    features: [
      'Quiet Museum Hill residential enclave',
      'Double-height great room with massive viga beams',
      'Gourmet open-concept entertaining kitchen',
      'Private primary terrace looking out to eastern sunrise peaks',
      'Custom handcrafted ironwork and solid wood doors'
    ],
    description: 'Nestled below Museum Hill, 1047 Camino San Acacio delivers an exceptional sanctuary of peace and privacy. Soaring timber ceilings, sculptural plasterwork, and sunlit living spaces create an inspiring backdrop for Santa Fe living.'
  },
  '62-avenida-frijoles': {
    title: '62 Avenida Frijoles',
    location: 'Rancho Viejo, Santa Fe, NM 87507',
    status: 'SOLD',
    price: '$785,000 (Multiple Offers Received)',
    beds: '3 BD',
    baths: '3 BA',
    sqft: '2,571 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80'
    ],
    features: [
      'Contemporary Santa Fe pueblo revival styling',
      'Community open spaces, parks, and walking trails',
      'Energy-efficient construction with solar integration',
      'Split-bedroom primary suite with spa bathroom',
      'Covered portal patio with gas fireplace hookup'
    ],
    description: 'Modern pueblo revival excellence in Rancho Viejo. Perfect harmony of contemporary comfort and Southwestern ambiance with high ceilings, polished concrete floors, and direct access to miles of community trails.'
  },
  '6-ute-lane': {
    title: '6 Ute Lane',
    location: 'South Capitol Enclave, Santa Fe, NM 87505',
    status: 'SOLD',
    price: '$940,000 (Closed Over Asking)',
    beds: '3 BD',
    baths: '3 BA',
    sqft: '2,350 Sq. Ft.',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80'
    ],
    features: [
      'Walking distance to Wood Gormley school and State Capitol',
      'Timeless Santa Fe architectural detailing',
      'Spacious landscaped courtyard with water feature',
      'Separate guest studio / home office suite',
      'Upgraded mechanicals and radiant floor heating'
    ],
    description: 'An idyllic South Capitol retreat combining quiet tree-lined privacy with supreme neighborhood walkability. Masterfully preserved and upgraded with artisan woodwork, private guest accommodations, and private garden oasis.'
  }
};

function initPropertyModal() {
  const modal = document.getElementById('property-modal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.close-modal-btn');
  const modalBackdrop = modal;

  document.querySelectorAll('[data-property-trigger]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const propKey = trigger.getAttribute('data-property-trigger');
      const prop = propertyCatalog[propKey];
      if (!prop) return;

      // Populate Modal Content
      document.getElementById('modal-prop-image').src = prop.image;
      document.getElementById('modal-prop-image').alt = prop.title;
      document.getElementById('modal-prop-title').textContent = prop.title;
      document.getElementById('modal-prop-location').textContent = prop.location;
      document.getElementById('modal-prop-price').textContent = prop.price;
      document.getElementById('modal-prop-beds').textContent = prop.beds;
      document.getElementById('modal-prop-baths').textContent = prop.baths;
      document.getElementById('modal-prop-sqft').textContent = prop.sqft;
      document.getElementById('modal-prop-desc').textContent = prop.description;

      const statusBadge = document.getElementById('modal-prop-status');
      statusBadge.textContent = prop.status;
      if (prop.status === 'FOR SALE') {
        statusBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full badge-gold';
      } else {
        statusBadge.className = 'px-3 py-1 text-xs font-semibold rounded-full badge-sold';
      }

      const featuresList = document.getElementById('modal-prop-features');
      featuresList.innerHTML = '';
      prop.features.forEach(feat => {
        const li = document.createElement('li');
        li.className = 'flex items-center text-sm text-stone-700 py-1';
        li.innerHTML = `<svg class="w-4 h-4 text-[#B87333] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> ${feat}`;
        featuresList.appendChild(li);
      });

      // Open Modal
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   PROPERTY FILTER CHIPS (ALL, FOR SALE, SOLD)
   ========================================================================== */
function initPropertyFilters() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const listingCards = document.querySelectorAll('[data-listing-status]');

  if (filterChips.length === 0 || listingCards.length === 0) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      listingCards.forEach(card => {
        const cardStatus = card.getAttribute('data-listing-status');
        if (filter === 'all' || cardStatus === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   CONSULTATION MODAL & PHONE DIAL TRIGGER
   ========================================================================== */
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  if (!modal) return;

  const triggers = document.querySelectorAll('.nav-consult-btn, .consultation-trigger');
  const closeBtn = modal.querySelector('.close-consult-btn');

  function openModal(e) {
    if (e) e.preventDefault();
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  triggers.forEach(t => t.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   GSAP ENTRANCE & SCROLLTRIGGER REVEALS
   ========================================================================== */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero entrance animation
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    gsap.from(heroContent.children, {
      opacity: 0,
      y: 35,
      stagger: 0.18,
      duration: 1.2,
      ease: 'power3.out',
      delay: 0.3
    });
  }

  // Section titles entrance
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('.reveal-up').forEach(elem => {
      gsap.from(elem, {
        scrollTrigger: {
          trigger: elem,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power2.out'
      });
    });
  }
}

/* ==========================================================================
   KEY STATS COUNTER ANIMATION
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-counter');
  if (counters.length === 0) return;

  let animated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      let current = 0;
      const step = Math.max(1, Math.floor(target / 40));
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = `${prefix}${target}${suffix}`;
          clearInterval(timer);
        } else {
          counter.textContent = `${prefix}${current}${suffix}`;
        }
      }, 30);
    });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        runCounters();
      }
    });
  }, { threshold: 0.4 });

  const statsSection = document.getElementById('stats-bar');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* ==========================================================================
   NEUMORPHIC CONTACT LEAD GENERATION FORM
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('inquiry-form');
  const successBox = document.getElementById('form-success-message');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate luxury instant feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Transmitting Securely...
      </span>
    `;
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (successBox) {
        successBox.classList.remove('hidden');
        successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        alert('Thank you for contacting Origins Realty Group. A designated broker will reach out to you within 2 business hours.');
      }
    }, 1100);
  });
}

/* ==========================================================================
   HERO SHOWCASE THUMBNAIL SWITCHER
   ========================================================================= */
function initHeroShowcase() {
  const thumbs = document.querySelectorAll('[data-hero-thumb]');
  const heroImage = document.getElementById('hero-showcase-image');
  const heroTitle = document.getElementById('hero-showcase-title');
  const heroPrice = document.getElementById('hero-showcase-price');
  const heroSpecs = document.getElementById('hero-showcase-specs');
  const heroBadge = document.getElementById('hero-showcase-badge');
  const heroTrigger = document.getElementById('hero-showcase-trigger');

  if (!thumbs.length || !heroImage) return;

  const data = {
    '616-camino-rancheros': {
      title: '616 Camino Rancheros',
      price: '$1,320,000',
      badge: 'FOR SALE • HISTORIC EASTSIDE',
      badgeClass: 'badge-gold',
      specs: '3 BD • 2 BA • 2,377 Sq. Ft. • Historic Adobe & Wine Cellar',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    },
    '11-via-de-las-yeguas': {
      title: '11 Via de Las Yeguas',
      price: '$2,450,000',
      badge: 'SOLD • EQUESTRIAN ESTATE',
      badgeClass: 'badge-sold',
      specs: '4 BD • 5 BA • 4,890 Sq. Ft. • 5.2 Acres & Private Barn',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    },
    '408-camino-del-monte-sol': {
      title: '408 Camino del Monte Sol',
      price: '$1,895,000',
      badge: 'SOLD • ART COLONY COMPOUND',
      badgeClass: 'badge-sold',
      specs: '4 BD • 3 BA • 3,198 Sq. Ft. • Painting Studio & Gardens',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    }
  };

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      const key = thumb.getAttribute('data-hero-thumb');
      const item = data[key];
      if (!item) return;

      thumbs.forEach(t => t.classList.remove('active', 'border-[#B87333]'));
      thumb.classList.add('active', 'border-[#B87333]');

      heroImage.style.opacity = '0.3';
      setTimeout(() => {
        heroImage.src = item.image;
        heroTitle.textContent = item.title;
        heroPrice.textContent = item.price;
        heroSpecs.textContent = item.specs;
        heroBadge.textContent = item.badge;
        heroBadge.className = `px-3 py-1 text-[11px] font-semibold rounded-full shadow-sm ${item.badgeClass}`;
        if (heroTrigger) heroTrigger.setAttribute('data-property-trigger', key);
        heroImage.style.opacity = '1';
      }, 150);
    });
  });
}

