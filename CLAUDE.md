# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT**:
- **Language**: 请使用中文与用户交流，除非用户明确要求使用英语或其他语言。
- **Git Commits**: 在创建 git commit 时，**不要**添加 Claude 的协作信息（Co-Authored-By: Claude），保持提交信息简洁。

## Project Overview

This is a personal homepage website (laugh0608.github.io) - a static single-page application showcasing personal information, projects, and skills.

**Live Site**: https://www.imbhj.com

**Attribution**: 设计风格和部分代码参考自 [zyyo 的开源主页模板](https://github.com/ZYYO666/homepage)，经过重构实现了品牌一致性（ordis/bailuobo 命名）、性能优化和模块化架构。

## Architecture

### Static Site Structure (Refactored)

This is a modular static website with no build process required:

- **index.html** - Main entry point (~385 lines, uses modular CSS/JS)
- **static/css/** - Modular CSS architecture
  - `main.css` - CSS entry point (imports all modules)
  - `base/` - Reset, variables, fonts
  - `layout/` - Grid, sidebar, main, footer
  - `components/` - Loading, project cards, social icons, modal, theme toggle, etc.
  - `utilities/` - Responsive styles
- **static/js/** - Modular JavaScript (ES6 modules)
  - `main.js` - JavaScript entry point
  - `core/` - Utils, theme manager, loader
  - `components/` - Project cards, modal, performance monitor
- **static/img/** - Images
- **static/svg/** - SVG graphics (including theme-specific snake graphics)
- **static/fonts/** - Custom fonts (Ubuntu, Pacifico)

### Naming Convention

**CSS Classes**: BEM methodology with `ordis-` prefix
- Block: `.ordis-container`, `.ordis-sidebar`, `.ordis-project`
- Element: `.projectItemLeft`, `.projectItemRight` (legacy, to be refactored)
- Modifier: `.ordis-project.pressed`

**IDs**: `ordis-` prefix
- `#ordis-loader`, `#ordis-loader-spinner`
- `#ordis-snake`, `#ordis-theme-toggle`

**Files**: kebab-case
- CSS: `project-card.css`, `theme-toggle.css`
- JS: `theme.js`, `modal.js`

### Key Features

1. **Theme System**: Light/Dark mode toggle with cookie persistence
   - Theme state stored in cookies (365 days)
   - Theme-specific SVG graphics (snake-Light.svg, snake-Dark.svg)
   - CSS custom properties in `base/variables.css` define theme colors
   - Managed by `ThemeManager` class in `core/theme.js`
   - Toggle controlled via checkbox `#ordis-theme-toggle`

2. **Responsive Design**: Desktop and mobile layouts
   - Two-column layout (`.ordis-sidebar`, `.ordis-main`)
   - Separate skill icons for PC and mobile (skillPc/skillWap)
   - Mobile-first performance optimizations

3. **Interactive Elements**:
   - Project cards with press effects (mousedown/touchstart)
   - Image popup modal (`.tc` class) for QR codes
   - Performance-optimized blur effects (渐进增强)

4. **Content Sections**:
   - Personal info and timeline (sidebar)
   - Main sites showcase (CEPD@BBS, OrdisBlog, OrdisAFFiNE, OrdisAI)
   - Personal projects (GitHub repositories)
   - Skills display (using skillicons.dev API)

5. **Performance Optimizations**:
   - Blur effects use progressive enhancement (mobile-friendly)
   - Passive event listeners for touch events
   - CSS `@media (prefers-reduced-motion)` support
   - Modular loading with ES6 modules

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

- Main container: `.ordis-container` with `.ordis-sidebar` and `.ordis-main` children
- Project items use `.ordis-project` with classes `a` (main sites) or `b` (personal projects)
- Icons use inline SVG with class `.icon`

### CSS Architecture

- Theme variables defined in `base/variables.css` using CSS custom properties
- Modular CSS files organized by function (base, layout, components, utilities)
- Performance-sensitive properties:
  - `--card-filter`: Blur for cards (uses progressive enhancement)
  - `--back-filter`: Background blur (optimized for mobile)
  - Recommendation: Blur effects automatically adjust based on device capabilities

### JavaScript Patterns

- ES6 modules (no frameworks)
- Event delegation for project items
- Cookie-based state management for theme
- Optional performance monitoring (FPS counter)

## Important Notes

1. **Right-click disabled**: Context menu is prevented in `core/utils.js`
2. **Chinese content**: Site content is primarily in Chinese
3. **No build tools**: Direct file editing, no transpilation or bundling
4. **Git ignored**: IDE folders (.idea, .vs, .vscode) are excluded

## Common Tasks

### Adding a New Project

Edit `index.html` in the appropriate section:
- Main sites: lines ~234-273 (`.ordis-project-list` with class `a`)
- Personal projects: lines ~283-347 (`.ordis-project-list` with class `b`)

```html
<a class="ordis-project b" href="GITHUB_URL" target="_blank">
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

Edit `static/css/base/variables.css`:
- `:root` block for light theme
- `[data-theme="dark"]` block for dark theme

### Updating Personal Information

- Timeline: Edit `index.html` lines ~58-149 (`.ordis-timeline` section)
- Tags: Edit `index.html` lines ~47-56 (`.ordis-tags` section)
- Description: Edit `index.html` lines ~158-170 (header section)

### Changing Background Image

Replace `static/img/background.jpg` or update the `--main-bg-color` property in `base/variables.css`.

### Adding New CSS Styles

1. Create a new file in the appropriate directory (`base/`, `layout/`, `components/`, or `utilities/`)
2. Add `@import url('./path/to/new-file.css');` to `static/css/main.css`

### Adding New JavaScript Functionality

1. Create a new module in `static/js/core/` or `static/js/components/`
2. Wrap the module in an IIFE and attach functions/classes to the `window.Ordis` namespace (see existing modules)
3. Add a `<script src="...">` tag in `index.html` in dependency order (before files that use it, after files it depends on)
4. Use the new function via `Ordis.xxx` in `static/js/main.js`

## Important Notes

1. **No ES6 Modules**: JavaScript files use IIFE pattern with `window.Ordis` namespace instead of `import/export`. This allows direct `file://` protocol preview (double-click `index.html`) without needing a local HTTP server.
2. **Script Load Order**: Scripts must be loaded in dependency order in `index.html` — utils first, then theme/loader/components, finally main.js
3. **No Build Process**: All files are served directly, no transpilation or bundling
4. **CSS @import**: Uses CSS `@import` for modularity (acceptable for static sites)
5. **Naming Convention**: All new classes should use `ordis-` prefix
6. **Performance**: Blur effects are optimized for mobile devices using progressive enhancement
