## 大白萝卜 / Ordis 的个人主页

线上地址：https://imbhj.com

GitHub Pages 镜像：https://laugh0608.github.io

设计风格和部分代码参考自 [zyyo 的开源主页模板](https://github.com/ZYYO666/homepage)，在此基础上重构为当前的内容与视觉。

### 技术栈

- 纯静态 HTML / CSS / JavaScript，无构建步骤
- IIFE + `window.Ordis` 命名空间，不使用 ES6 `import/export`，支持直接打开 `index.html`
- 模块化 CSS：`static/css/main.css` 通过 `@import` 组织 base / layout / components / utilities
- 深色 / 浅色主题：Cookie 记录用户选择，系统偏好兜底；`<head>` 内联脚本先设置 `data-theme`，避免闪白
- 响应式：桌面侧栏 + 移动端单列；移动端提供“关于我”折叠区
- 图片优先使用 WebP，字体使用系统字体 + Pacifico；不依赖第三方图标 CDN
- SEO：canonical、Open Graph、Twitter Card、JSON-LD、sitemap、robots、自定义 404

### 页面结构

1. Hero：大白萝卜 / Ordis、身份、定位、CTA、右侧 Now building 卡
2. 现在：RadishFlow、Radish 社区、RadishAxiom
3. 入口：RadishX、Radish 社区、CEPD@BBS、OrdisBlog（归档）
4. 精选项目：6 个项目，带状态和技术栈
5. 化工 × 软件工具箱：CAPE-OPEN、Aspen bkp、PDF 工具
6. Radish 家族：8 个产品入口 + 全部 12 个
7. 技术栈：语言 / 后端与 AI / 前端与客户端 / 化工与工程
8. 移动端“关于我” + 页脚

### 本地开发

```bash
python3 -m http.server 8000
# 或 npx http-server
```

访问 `http://localhost:8000`。页面不依赖构建工具，也可以直接双击 `index.html` 预览；推荐用静态服务器测试相对路径和 404。

### 部署

- 主站：Vercel，自定义域 `https://imbhj.com`
- 镜像：GitHub Pages，`https://laugh0608.github.io`
- 推送到 `master` 后两边自动部署；canonical 指向 `https://imbhj.com/`
- 自定义 404 由根目录 `404.html` 提供

### 项目结构

```text
├── index.html              # 主页面
├── 404.html                # 自定义 404
├── robots.txt
├── sitemap.xml
├── static/
│   ├── css/
│   │   ├── main.css        # CSS 入口
│   │   ├── base/           # reset / variables / fonts
│   │   ├── layout/         # grid / sidebar / main / footer
│   │   ├── components/     # hero / sections / project-card / skills / ...
│   │   └── utilities/      # responsive
│   ├── js/
│   │   ├── main.js         # 初始化入口
│   │   ├── core/           # utils / theme
│   │   └── components/     # project-card / modal
│   ├── img/                # WebP 图片、favicon、OG 封面
│   └── fonts/              # Pacifico
└── CLAUDE.md
```

### 内容维护

- Hero、时间线、项目卡：`index.html` 对应 `#top`、`.ordis-timeline`、`#work` 等区块
- 主题色、状态色：`static/css/base/variables.css`
- 背景图：`static/img/background.webp`（1920×1152），替换后在 `variables.css` 中确认 `--main-bg-color`
- 头像：`static/img/avatar.webp`（角色 + 白萝卜徽标；源图 `logokuang.webp` / `logo-bailuobo.jpg` 保留）
- 新增 CSS：放到对应目录，并在 `static/css/main.css` 增加 `@import`
- 新增 JS：IIFE + `window.Ordis`，在 `index.html` 底部按依赖顺序加载

### 性能

- 页面图片优先使用 WebP，字体只保留 Pacifico，Latin 使用系统字体
- 首屏同源资源约 152KB（本地未压缩）；不再加载 skillicons、snake SVG 和 loader
- 修改图片时保持 WebP 和合适尺寸，避免重新引入大体积 TTF 或第三方图标服务

### 致谢

感谢 [zyyo](https://github.com/ZYYO666) 提供的设计灵感和代码参考。
