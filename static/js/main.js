/**
 * Ordis Personal Homepage
 * Customized by: Ordis (大白萝卜)
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};

    document.addEventListener('DOMContentLoaded', () => {
        // 初始化主题（head 中的内联脚本已先设置好 data-theme，这里同步开关状态）
        new Ordis.ThemeManager();

        // 初始化组件
        Ordis.initProjectCards();
        Ordis.initModal();
    });
})(window);
