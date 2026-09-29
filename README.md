# Deep Patel - Developer Portfolio & Personal Website

A modern, accessible, and responsive one-page personal developer portfolio built with semantic HTML5, modular CSS3, and modern JavaScript. Designed to showcase engineering skills, featured projects, and open source contributions.

---

## 🌟 What You Will Learn in This Project

1. **Turning Requirements into Code**: Transforming structured descriptions into an interactive, high-performance website with bespoke design tokens and accessible landmarks.
2. **What GitHub Is and Why Teams Use It**:
   - **Distributed Version Control**: Tracks every single commit and change over time, allowing teams to review history and revert bugs safely.
   - **Open Collaboration**: Anyone can inspect code, suggest improvements, submit Pull Requests, and open issues.
   - **Portfolio & Credibility**: Provides a verified, public link for recruiters, teammates, and clients to see actual code quality.
3. **Publishing Live to the World**: How to push code to GitHub and host it live using GitHub Pages or Vercel with zero server overhead.

---

## 🚀 Key Features

- **Semantic HTML5 & Accessibility**: Fully compliant with WCAG 2.1 AA standards, keyboard navigation, and explicit `:focus-visible` states.
- **Modern Responsive Design**: Mobile-first architecture tested across 320px (mobile), 768px (tablet), and 1440px (desktop).
- **Design Tokens (CSS Variables)**: Curated dark palette, glassmorphism blur effects, and smooth micro-animations without external framework overhead.
- **Dynamic Projects & Filters**: Filter projects by categories (All, AI & Web Apps, Tools & Systems) rendered via JavaScript ES6 modules.
- **Interactive Contact Features**: Live input validation, clipboard email copying, and toast notifications.
- **Zero Cumulative Layout Shift (CLS)**: Explicit dimensions on all image and media containers.

---

## 📁 File Structure

```text
├── index.html                 # Semantic single-page application entry point
├── CHANGELOG.md               # Chronological log of all additions and updates
├── README.md                  # Project documentation and GitHub guide
├── assets/
│   └── images/                # Visual media and project mockups
│       ├── profile_avatar.jpg
│       ├── project_ai_studio.jpg
│       └── project_dev_connect.jpg
├── styles/
│   ├── variables.css          # Design tokens and CSS custom properties
│   ├── base.css               # Reset, typography, layout, focus outlines
│   ├── navigation.css         # Glassmorphic header and mobile drawer
│   ├── hero.css               # Hero section, avatar card, floating badges
│   ├── projects.css           # Projects showcase grid and filter buttons
│   ├── skills.css             # Categorized skill cards and chips
│   ├── contact.css            # Contact cards, form inputs, toast alert
│   └── footer.css             # Semantic footer and back-to-top control
└── scripts/
    ├── projectsData.js        # Project definitions and category queries
    ├── navigationHandler.js   # Mobile drawer and IntersectionObserver tracker
    ├── contactFormHandler.js  # Form validation and clipboard toast logic
    └── main.js                # Application bootstrapper
```

---

## 💻 Running Locally

You do not need heavy package installations. Serve the files using any local HTTP server:

```powershell
# Using Python built-in HTTP server:
python -m http.server 3000

# Or using Node.js npx serve:
npx serve .
```

Open your browser at `http://localhost:3000`.

---

## 🌐 Publishing to GitHub and Making It Live

### 1. Initialize Git and Commit
```powershell
git init
git add .
git commit -m "feat: initial commit of personal developer portfolio"
```

### 2. Create Public GitHub Repository
```powershell
gh repo create deep-patel-portfolio --public --source=. --remote=origin --push
```

### 3. Deploy Live with GitHub Pages
1. Go to your repository on GitHub: `https://github.com/PatelDeepB/deep-patel-portfolio`
2. Click **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/ (root)`.
4. Click **Save**. Within 1 minute, your live site will be ready at:
   `https://pateldeepb.github.io/deep-patel-portfolio/`
