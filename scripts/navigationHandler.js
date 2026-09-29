/**
 * Navigation Handler Module
 * Manages responsive menu state, accessible aria attributes, and active section observation.
 */

/**
 * Initializes navigation bar behaviors including mobile drawer and section tracking.
 * @returns {void}
 */
export function initializeNavigation() {
  const toggleButton = document.querySelector('#mobileNavToggle');
  const mobileDrawer = document.querySelector('#mobileDrawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  const backToTopButton = document.querySelector('#backToTopBtn');

  if (toggleButton && mobileDrawer) {
    setupMobileMenu(toggleButton, mobileDrawer);
  }

  setupSmoothScrolling(navLinks, mobileDrawer, toggleButton);
  setupActiveSectionObserver();

  if (backToTopButton) {
    backToTopButton.addEventListener('click', handleBackToTopClick);
  }
}

/**
 * Sets up mobile menu toggle button and drawer interactions.
 * @param {HTMLButtonElement} toggleButton
 * @param {HTMLElement} mobileDrawer
 * @returns {void}
 */
function setupMobileMenu(toggleButton, mobileDrawer) {
  toggleButton.addEventListener('click', function handleToggle() {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    mobileDrawer.classList.toggle('is-open', !isExpanded);
  });
}

/**
 * Handles smooth scrolling and closes drawer when a link is clicked.
 * @param {NodeListOf<Element>} navLinks
 * @param {HTMLElement | null} mobileDrawer
 * @param {HTMLButtonElement | null} toggleButton
 * @returns {void}
 */
function setupSmoothScrolling(navLinks, mobileDrawer, toggleButton) {
  navLinks.forEach(function attachClick(link) {
    link.addEventListener('click', function handleLinkClick() {
      if (mobileDrawer && toggleButton && mobileDrawer.classList.contains('is-open')) {
        mobileDrawer.classList.remove('is-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Observes page sections to update active navigation indicators dynamically.
 * @returns {void}
 */
function setupActiveSectionObserver() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');

  if (!('IntersectionObserver' in window) || sections.length === 0) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(function handleIntersect(entries) {
    entries.forEach(function processEntry(entry) {
      if (entry.isIntersecting) {
        updateActiveLink(desktopLinks, entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(function observeSection(section) {
    observer.observe(section);
  });
}

/**
 * Updates the active class on desktop navigation links.
 * @param {NodeListOf<Element>} desktopLinks
 * @param {string} activeSectionId
 * @returns {void}
 */
function updateActiveLink(desktopLinks, activeSectionId) {
  desktopLinks.forEach(function evaluateLink(link) {
    const targetHref = link.getAttribute('href');
    const isCurrent = targetHref === `#${activeSectionId}`;
    link.classList.toggle('active', isCurrent);
  });
}

/**
 * Scrolls window smoothly back to the top.
 * @returns {void}
 */
function handleBackToTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
