# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT**:
- **Language**: 请使用中文与用户交流，除非用户明确要求使用英语或其他语言。
- **Git Commits**: 在创建 git commit 时，**不要**添加 Claude 的协作信息（Co-Authored-By: Claude），保持提交信息简洁。

## Project Overview

This is a personal homepage website (laugh0608.github.io) - a static single-page application showcasing personal information, projects, and skills. The site is based on the original work by zyyo (https://github.com/ZYYO666/homepage) and customized for the owner "Ordis" (大白萝卜).

**Live Site**: https://www.imbhj.com

## Architecture

### Static Site Structure

This is a pure static website with no build process or package manager. Files are served directly:

- **index.html** - Single-page application entry point containing all HTML structure
- **static/css/** - Styling with theme system
  - `root.css` - CSS custom properties for theming (light/dark modes)
  - `style.css` - Main styles and responsive layouts
- **static/js/script.js** - Vanilla JavaScript for interactivity
- **static/img/** - Images and icons
- **static/svg/** - SVG graphics including theme-specific snake graphics
- **static/fonts/** - Custom fonts (Pacifico, Ubuntu)

### Key Features

1. **Theme System**: Light/Dark mode toggle with cookie persistence
   - Theme state stored in cookies (365 days)
   - Theme-specific SVG graphics (snake-Light.svg, snake-Dark.svg)
   - CSS custom properties in root.css define theme colors
   - Toggle controlled via checkbox in index.html:212

2. **Responsive Design**: Desktop and mobile layouts
   - Two-column layout (`.zyyo-left` sidebar, `.zyyo-right` main content)
   - Separate skill icons for PC and mobile (skillPc/skillWap)

3. **Interactive Elements**:
   - Project cards with press effects (mousedown/touchstart)
   - Image popup modal (`.tc` class) for QR codes and images
   - FPS counter (script.js:116-154)
   - Loading screen animation

4. **Content Sections**:
   - Personal info and timeline (left sidebar)
   - Main sites showcase (CEPD@BBS, OrdisBlog, OrdisAFFiNE, OrdisAI)
   - Personal projects (GitHub repositories)
   - Skills display (using skillicons.dev API)

## Development Workflow

### Local Development

Since this is a static site with no build process:

1. **Serve locally**: Use any static file server
   ```bash
   # Python 3
   python -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000

   # Node.js (if http-server is installed)
   npx http-server
   ```

2. **View in browser**: Navigate to `http://localhost:8000`

### Deployment

This is a GitHub Pages site. Changes pushed to the `master` branch are automatically deployed.

```bash
git add .
git commit -m "Description of changes"
git push origin master
```

## Code Conventions

### HTML Structure

- Main container: `.zyyo-main` with `.zyyo-left` and `.zyyo-right` children
- Project items use `.projectItem` with classes `a` (main sites) or `b` (personal projects)
- Icons use inline SVG with class `.icon`

### CSS Architecture

- Theme variables defined in `root.css` using CSS custom properties
- Multiple theme presets available (only the last one in root.css is active)
- Performance-sensitive properties:
  - `--card_filter`: Blur for cards (expensive on low-end devices)
  - `--back_filter`: Background blur (alternative to card blur)
  - Recommendation: Use only one blur type at a time

### JavaScript Patterns

- Vanilla JavaScript (no frameworks)
- Event delegation for project items
- Cookie-based state management for theme
- FPS monitoring for performance debugging

## Important Notes

1. **Right-click disabled**: Context menu is prevented (script.js:11-13)
2. **Original attribution**: Copyright notice in console and comments reference original author zyyo
3. **Chinese content**: Site content is primarily in Chinese
4. **No build tools**: Direct file editing, no transpilation or bundling
5. **Git ignored**: IDE folders (.idea, .vs, .vscode) are excluded

## Common Tasks

### Adding a New Project

Edit `index.html` in the appropriate section (lines 235-274 for main sites, 284-348 for personal projects):

```html
<a class="projectItem b" href="GITHUB_URL" target="_blank">
    <div class="projectItemLeft">
        <h1>Project Name</h1>
        <p>Project description</p>
    </div>
    <div class="projectItemRight">
        <img alt="" src="./static/img/iX.png">
    </div>
</a>
```

### Modifying Theme Colors

Edit `static/css/root.css` and adjust CSS custom properties in the active theme block (the last `html {}` block in the file).

### Updating Personal Information

- Timeline: Edit `index.html` lines 59-150 (`.left-time` section)
- Tags: Edit `index.html` lines 48-57 (`.left-tag` section)
- Description: Edit `index.html` lines 159-171 (header section)

### Changing Background Image

Replace `static/img/background.jpg` or update the `--main_bg_color` property in `root.css`.
