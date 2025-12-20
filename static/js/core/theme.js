/**
 * Ordis Personal Homepage - Theme Manager
 */

import { Cookie } from './utils.js';

export class ThemeManager {
    constructor() {
        this.STORAGE_KEY = 'ordis-theme';
        this.currentTheme = this.loadTheme();
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindToggle();
    }

    loadTheme() {
        // 优先级：Cookie > 系统偏好 > 默认
        const stored = Cookie.get(this.STORAGE_KEY);
        if (stored) return stored;

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    applyTheme(theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', theme);

        // 更新贪吃蛇图片
        const snakeImg = document.getElementById('ordis-snake');
        if (snakeImg) {
            snakeImg.src = `./static/svg/snake-${theme === 'dark' ? 'Dark' : 'Light'}.svg`;
        }

        // 更新切换器状态
        const checkbox = document.getElementById('ordis-theme-toggle');
        if (checkbox) {
            checkbox.checked = theme === 'light';
        }

        Cookie.set(this.STORAGE_KEY, theme, 365);
        this.currentTheme = theme;
    }

    toggle() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    bindToggle() {
        const checkbox = document.getElementById('ordis-theme-toggle');
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                this.toggle();
            });
        }
    }
}
