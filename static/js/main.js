/**
 * Ordis Personal Homepage
 * Customized by: Ordis (大白萝卜)
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};

    // 初始化
    document.addEventListener('DOMContentLoaded', () => {
        // 禁用右键（可选）
        Ordis.disableContextMenu();

        // 初始化主题
        new Ordis.ThemeManager();

        // 初始化组件
        Ordis.initProjectCards();
        Ordis.initModal();

        // 可选：启用性能监控
        // Ordis.initPerformanceMonitor();
    });

    // 页面加载完成
    window.addEventListener('load', () => {
        Ordis.initLoader();
    });
})(window);
