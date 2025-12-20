/**
 * Ordis Personal Homepage
 * Customized by: Ordis (大白萝卜)
 */

import { disableContextMenu } from './core/utils.js';
import { ThemeManager } from './core/theme.js';
import { initLoader } from './core/loader.js';
import { initProjectCards } from './components/project-card.js';
import { initModal } from './components/modal.js';
// import { initPerformanceMonitor } from './components/performance.js';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 禁用右键（可选）
    disableContextMenu();

    // 初始化主题
    const themeManager = new ThemeManager();

    // 初始化组件
    initProjectCards();
    initModal();

    // 可选：启用性能监控
    // initPerformanceMonitor();
});

// 页面加载完成
window.addEventListener('load', () => {
    initLoader();
});
