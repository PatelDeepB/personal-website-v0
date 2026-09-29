/**
 * Projects Data Module
 * Provides project showcase information and query helper functions.
 */

/**
 * @typedef {Object} ProjectRecord
 * @property {string} id
 * @property {string} title
 * @property {string} category
 * @property {string} description
 * @property {string[]} technologies
 * @property {string} imagePath
 * @property {string} liveUrl
 * @property {string} githubUrl
 */

/**
 * Collection of featured engineering projects.
 * @type {readonly ProjectRecord[]}
 */
export const FEATURED_PROJECTS = Object.freeze([
  {
    id: 'ai-skill-studio',
    title: 'AI Skill Studio & Workflow Automation',
    category: 'ai-apps',
    description: 'An intelligent workflow platform that transforms high-level prompts into deployable full-stack skills and web applications with real-time analytics.',
    technologies: ['TypeScript', 'Next.js', 'TailwindCSS', 'OpenAI API', 'Node.js'],
    imagePath: 'assets/images/project_ai_studio.jpg',
    liveUrl: 'https://github.com/PatelDeepB',
    githubUrl: 'https://github.com/PatelDeepB'
  },
  {
    id: 'dev-merge-platform',
    title: 'DevMerge Git Collaboration Hub',
    category: 'tools-systems',
    description: 'A developer collaboration platform featuring visual commit graph tracking, asynchronous inline code reviews, and automated CI/CD pipeline triggers.',
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Git CLI', 'WebSockets'],
    imagePath: 'assets/images/project_dev_connect.jpg',
    liveUrl: 'https://github.com/PatelDeepB',
    githubUrl: 'https://github.com/PatelDeepB'
  }
]);

/**
 * Retrieves all featured projects.
 * @returns {readonly ProjectRecord[]}
 */
export function getAllProjects() {
  return FEATURED_PROJECTS;
}

/**
 * Filters projects by a selected category key.
 * @param {string} selectedCategory
 * @returns {readonly ProjectRecord[]}
 */
export function getProjectsByCategory(selectedCategory) {
  if (!selectedCategory || selectedCategory === 'all') {
    return FEATURED_PROJECTS;
  }

  return FEATURED_PROJECTS.filter(function matchCategory(project) {
    return project.category === selectedCategory;
  });
}
