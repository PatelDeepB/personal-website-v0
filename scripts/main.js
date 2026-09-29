/**
 * Main Application Bootstrap Module
 * Initializes modular subsystems and renders dynamic project cards.
 */

import { getAllProjects, getProjectsByCategory } from './projectsData.js';
import { initializeNavigation } from './navigationHandler.js';
import { initializeContactFeatures } from './contactFormHandler.js';

document.addEventListener('DOMContentLoaded', initializeApplication);

/**
 * Orchestrates page component initialization.
 * @returns {void}
 */
function initializeApplication() {
  initializeNavigation();
  initializeContactFeatures();

  const allProjects = getAllProjects();
  renderProjectsGrid(allProjects);
  setupCategoryFilters();
}

/**
 * Renders the project cards into the DOM.
 * @param {readonly import('./projectsData.js').ProjectRecord[]} projects
 * @returns {void}
 */
function renderProjectsGrid(projects) {
  const container = document.querySelector('#projectsGrid');
  if (!container) {
    return;
  }

  container.innerHTML = '';

  projects.forEach(function buildCard(project) {
    const cardElement = createProjectCardElement(project);
    container.appendChild(cardElement);
  });
}

/**
 * Creates an individual project card article element.
 * @param {import('./projectsData.js').ProjectRecord} project
 * @returns {HTMLElement}
 */
function createProjectCardElement(project) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.id = `project-${project.id}`;

  const techListHtml = project.technologies
    .map(tech => `<li class="tech-tag">${escapeHtml(tech)}</li>`)
    .join('');

  article.innerHTML = `
    <div class="project-card-image-wrap">
      <img 
        src="${escapeHtml(project.imagePath)}" 
        alt="${escapeHtml(project.title)} preview" 
        class="project-card-image"
        width="640" 
        height="360"
        loading="lazy"
      />
    </div>
    <div class="project-card-content">
      <span class="project-card-tag">${escapeHtml(project.category.replace('-', ' '))}</span>
      <h3 class="project-card-title">${escapeHtml(project.title)}</h3>
      <p class="project-card-description">${escapeHtml(project.description)}</p>
      <ul class="project-tech-list" aria-label="Technologies used">
        ${techListHtml}
      </ul>
      <div class="project-card-actions">
        <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="View source code on GitHub for ${escapeHtml(project.title)}">
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
          </svg>
          Source Code
        </a>
        <a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-action-link" aria-label="View live project for ${escapeHtml(project.title)}">
          <svg class="action-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
          Live Preview
        </a>
      </div>
    </div>
  `;

  return article;
}

/**
 * Sets up project category filtering event listeners.
 * @returns {void}
 */
function setupCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');

  filterButtons.forEach(function attachListener(button) {
    button.addEventListener('click', function handleFilterClick() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const targetCategory = button.getAttribute('data-category') || 'all';
      const filtered = getProjectsByCategory(targetCategory);
      renderProjectsGrid(filtered);
    });
  });
}

/**
 * Escapes unsafe characters for HTML injection safety.
 * @param {string} rawString
 * @returns {string}
 */
function escapeHtml(rawString) {
  const div = document.createElement('div');
  div.textContent = rawString;
  return div.innerHTML;
}
