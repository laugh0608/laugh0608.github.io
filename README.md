## 大白萝卜的个人主页

地址：https://www.imbhj.com

本项目的设计风格和部分代码参考自 [zyyo 的开源主页模板](https://github.com/ZYYO666/homepage)，经过重构和定制开发。

### 技术栈

- 纯静态 HTML/CSS/JavaScript
- ES6 模块化架构
- 响应式设计
- 深色/浅色主题切换
- 模块化 CSS 架构（无需构建工具）

### 本地开发

```bash
# 使用任意静态服务器
python -m http.server 8000
# 或
npx http-server
```

访问 http://localhost:8000

### 项目结构

```
├── index.html                 # 主入口文件
├── static/
│   ├── css/
│   │   ├── main.css          # CSS 入口（导入所有模块）
│   │   ├── base/             # 基础样式
│   │   ├── layout/           # 布局样式
│   │   ├── components/       # 组件样式
│   │   └── utilities/        # 工具样式
│   ├── js/
│   │   ├── main.js           # JavaScript 入口
│   │   ├── core/             # 核心模块
│   │   └── components/       # 组件模块
│   ├── img/                  # 图片资源
│   ├── svg/                  # SVG 图标
│   └── fonts/                # 字体文件
└── CLAUDE.md                 # 开发指南
```

### 致谢

感谢 [zyyo](https://github.com/ZYYO666) 提供的设计灵感和代码参考。
