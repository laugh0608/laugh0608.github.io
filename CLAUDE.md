# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Communication Guidelines

**IMPORTANT**:
- **Language**: 请使用中文与用户交流，除非用户明确要求使用英语或其他语言。
- **Git Commits**: 在创建 git commit 时，**不要**添加 Claude 的协作信息（Co-Authored-By: Claude），保持提交信息简洁。

## Project Overview

这是大白萝卜 / Ordis 的个人主页，一个无构建步骤的静态单页站点，用来展示个人定位、正在做的事、精选项目、Radish 家族和技术栈。

- **主站**: https://imbhj.com （Vercel）
- **镜像**: https://laugh0608.github.io （GitHub Pages）
- **Attribution**: 设计风格和部分代码参考自 [zyyo 的开源主页模板](https://github.com/ZYYO666/homepage)，现已重构为当前的信息架构和视觉。

## Architecture

### Static Site

- **index.html** — 主页面。按 Hero → 现在 → 入口 → 精选项目 → 工具箱 → Radish 家族 → 技术栈 → 移动端“关于我”的顺序组织。
- **static/css/** — 模块化 CSS，由 `main.css` 统一 `@import`
  - `base/` — `reset.css`、`variables.css`、`fonts.css`
  - `layout/` — `grid.css`、`sidebar.css`、`main.css`、`footer.css`
  - `components/` — `hero.css`、`sections.css`、`project-card.css`、`skills.css`、`social-icons.css`、`section-title.css`、`modal.css`、`theme-toggle.css`
  - `utilities/` — `responsive.css`
- **static/js/** — IIFE + `window.Ordis` 命名空间，不使用 ES6 `import/export`
  - `main.js` — 初始化入口
  - `core/utils.js` — Cookie、通用工具
  - `core/theme.js` — 主题管理
  - `components/project-card.js` — 项目卡按压反馈
  - `components/modal.js` — 二维码弹窗、焦点管理和 Esc 关闭
- **static/img/** — WebP 图片、favicon、OG 封面、二维码
- **static/fonts/** — 只保留 `Pacifico-Regular.ttf`；Latin 正文使用系统字体
- **404.html** — 自定义 404
- **robots.txt / sitemap.xml** — SEO 文件

### Naming

**CSS Classes**: 以 `ordis-` 前缀为主
- 布局：`.ordis-container`、`.ordis-sidebar`、`.ordis-main`
- 区块：`.ordis-section`、`.section-head`、`.title`、`.sectionIndex`
- 项目卡：`.ordis-project.project-featured`、`.projectTop`、`.projectStatus`、`.projectStack`
- 入口卡：`.ordis-link-card`
- 家族卡：`.family-item`
- 状态：`.is-active`、`.is-released`、`.is-dev`、`.is-archived`、`.is-tool`

**IDs**: `ordis-` 前缀或语义化区块 id
- `#ordis-theme-toggle`、`#top`、`#now`、`#sites`、`#work`、`#toolbox`、`#family`、`#skills`

**Files**: kebab-case（CSS / JS 文件名）

## Key Features

1. **Theme System**
   - 主题存 Cookie `ordis-theme`（365 天），无 Cookie 时跟随 `prefers-color-scheme`
   - `index.html` 的 `<head>` 内联脚本在 CSS 之前写入 `data-theme`，避免深色模式闪白
   - `ThemeManager` 在 `core/theme.js` 中同步开关状态、`color-scheme` 和 `meta[name="theme-color"]`
   - 主题变量在 `base/variables.css` 的 `:root` 和 `[data-theme="dark"]` 中维护

2. **Responsive Design**
   - 桌面：230px 侧栏 + 主内容，侧栏 sticky，高度 `calc(100vh - 96px)`
   - 移动端（≤800px）：隐藏侧栏，显示 `.index-logo` 和 `.ordis-mobile-about`
   - 项目卡：桌面 3 列 → ≤1150px 2 列 → ≤800px 1 列
   - Radish 家族：桌面 4 列 → ≤900px 2 列
   - 注意 `800px` 边界：侧栏在 `≤800px` 隐藏，`.index-logo` 在 `≥801px` 隐藏，避免两边同时消失

3. **Interactions**
   - 项目卡按压反馈（`project-card.js`）
   - 二维码弹窗（`.tc` / `.tc-main`），支持点击背景关闭、Esc 关闭、焦点返回
   - 主题开关使用视觉隐藏的 checkbox + label，保留键盘可聚焦

4. **Content Sections**
   - 侧栏：头像、地点、Radish / 萝卜工作室、标签、最近时间线
   - Hero：大白萝卜 / Ordis、身份、定位、CTA、社交图标
   - 现在：RadishFlow、Radish 社区、RadishAxiom
   - 入口：RadishX、Radish 社区、CEPD@BBS、OrdisBlog（归档）
   - 精选项目：RadishFlow、Radish、RadishCatalyst、RadishAxiom、CapeOpenCore、PythonToAspen
   - 工具箱：CapeOpen-CSharp、CapeOpen-Cpp、BlazorAspenBkpChange、PdfAddBlankPage
   - Radish 家族：Lex、Memory、Nexus、Ledger、Link、Root、Ink、Mind（与精选合计 12 个产品）
   - 技术栈：语言 / 后端与 AI / 前端与客户端 / 化工与工程

5. **Performance & SEO**
   - 页面图片优先使用 WebP；不加载第三方图标 CDN、snake SVG、loader
   - 首屏同源资源约 139KB（本地未压缩）
   - `canonical` 指向 `https://imbhj.com/`，同时提供 OG / Twitter / JSON-LD / sitemap / robots / 404
   - 使用 `prefers-reduced-motion` 降级动画

## Development Workflow

### Local Development

无构建步骤，使用任意静态服务器：

```bash
python3 -m http.server 8000
# 或 npx http-server
```

访问 `http://localhost:8000`。页面使用 IIFE，也支持直接双击 `index.html`；推荐用服务器测试相对路径、404 和 WebP。

### Deployment

主站由 Vercel 部署，GitHub Pages 作为镜像；推送到 `master` 两边都会更新。

```bash
git add .
git commit -m "Description of changes"
git push origin master
```

注意：GitHub Pages 的镜像与主站内容相同，页面已通过 canonical 指向 `https://imbhj.com/`。

## Code Conventions

### HTML

- 使用 `<main class="ordis-main">`、`<aside class="ordis-sidebar">`、`<section aria-labelledby="...">`
- 全页只有一个 `h1`（Hero），区块标题用 `h2`，项目名和技能组用 `h3`
- 图片必须有 `alt`；装饰性图片可用空 `alt` + `aria-hidden="true"`
- 外链加 `rel="noopener"`；交互元素避免嵌套 `<a>` 和 checkbox
- 允许用户缩放，不要恢复 `user-scalable=no`

### CSS

- 主题色、状态色优先使用 `variables.css` 中的自定义属性
- 状态徽章使用 `.projectStatus` + `.is-*` 类
- 精选项目卡使用 `.project-featured`，不要恢复旧的固定高度和 hover 撑满效果
- 性能敏感属性：`--card-filter`、`--back-filter`；移动端默认关闭卡片模糊
- 新样式放对应目录，并在 `static/css/main.css` 加 `@import`

### JavaScript

- 使用 IIFE + `window.Ordis`，不要引入 ES6 `import/export`
- 脚本在 `index.html` 底部按依赖顺序加载：`utils` → `theme` → 组件 → `main`
- Cookie 通过 `Ordis.Cookie` 读写
- 不要恢复右键禁用、全局 `user-select: none` 或 `outline: none`

## Common Tasks

### Adding a Selected Project

在 `#work` 的 `.ordis-project-list` 中新增一张卡（最多保持 6 张）：

```html
<a class="ordis-project b project-featured" href="URL" rel="noopener" target="_blank">
    <div class="projectTop">
        <span class="projectIndex">07</span>
        <span class="projectStatus is-dev">开发中</span>
        <span aria-hidden="true" class="projectArrow">↗</span>
    </div>
    <div class="projectItemLeft">
        <h3>Project Name</h3>
        <p>一句话说明它是什么、给谁用、有什么不同。</p>
    </div>
    <div aria-label="技术栈" class="projectStack">
        <span>Rust</span><span>.NET</span>
    </div>
</a>
```

状态类：`is-active`、`is-released`、`is-dev`、`is-archived`、`is-tool`。

### Adding a Radish Family Item

在 `#family` 的 `.family-grid` 中新增：

```html
<a class="family-item" href="https://radishx.com/xxx" rel="noopener" target="_blank">
    <strong>RadishXxx</strong>
    <span>一句话说明</span>
    <em class="is-dev">开发中</em>
</a>
```

家族状态类：`is-dev`、`is-preview`、`is-research`、`is-live`。

### Updating Timeline / Personal Info

- 桌面侧栏：`.ordis-timeline` 的 `#line` 列表
- 移动端：`.ordis-mobile-about` 里的 `.mobile-timeline`
- 两处需要同步更新；地点、工作室和标签分别在 `.ordis-profile-info`、`.ordis-tags`
- 页脚“最近更新”在 `<footer>` 中

### Changing Theme Colors

编辑 `static/css/base/variables.css`：
- `:root` — 默认/浅色主题
- `[data-theme="dark"]` — 深色主题
- `--muted-text-color`、`--subtle-border`、`--accent-*`、`--status-*` 是新增区块共用的辅助变量

### Changing Background / Avatar

- 背景：替换 `static/img/background.webp`，保持 `--main-bg-color` 路径一致；当前源尺寸为 800×480，若要更清晰需要换更高分辨率原图
- 头像叠层：替换 `static/img/logokuang.webp`，保持透明背景和 1:1 比例
- favicon：`static/img/favicon-32.png` / `apple-touch-icon.png`；`bailuobo.ico` 为兼容保留的小尺寸 ico

### Adding New CSS / JS

- CSS：在 `base/`、`layout/`、`components/` 或 `utilities/` 新建文件，并在 `main.css` 加 `@import`
- JS：新建 IIFE 模块并挂到 `window.Ordis`，在 `index.html` 底部按依赖顺序加 `<script>`

### SEO

- 修改标题/描述时同步更新 `<title>`、`meta[name="description"]`、`og:*`、`twitter:*`
- 页面内容有实质更新时，更新 `sitemap.xml` 的 `<lastmod>`
- OG 封面：`static/img/og-cover.jpg`（1200×630）
- 404 页面：根目录 `404.html`

## Manual Checks

改完后至少检查：

- 320 / 390 / 800 / 801 / 1024 / 1440 宽度无横向溢出
- 深色 / 浅色主题切换，刷新后保持
- 项目卡、入口卡、家族卡、技术栈在移动端单列/双列正常
- 移动端“关于我”可展开
- 二维码弹窗可打开、点击背景/Esc 可关闭
- 404、`sitemap.xml`、`robots.txt`、OG 图片可访问
- 外部链接无 404

## Important Notes

1. **No Build Process** — 所有文件直接部署，不要引入打包/转译步骤。
2. **No ES6 Modules** — 使用 IIFE + `window.Ordis`，保持 `file://` 可预览。
3. **Script Order** — `utils.js` → `theme.js` → 组件 → `main.js`。
4. **CSS @import** — 当前接受多个小 CSS 文件的加载方式；如要合并，需同时更新 `main.css`。
5. **Assets** — 优先 WebP、系统字体；不要重新引入 skillicons、snake SVG、Ubuntu TTF 或 loader。
6. **Deployment** — Vercel 主站 + GitHub Pages 镜像，canonical 始终指向 `https://imbhj.com/`。
7. **Content Language** — 站点内容以中文为主，专有名词保留英文。
