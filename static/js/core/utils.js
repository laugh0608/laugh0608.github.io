/**
 * Ordis Personal Homepage - Utilities
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};

    // Cookie 管理
    Ordis.Cookie = {
        set(name, value, days) {
            let expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        get(name) {
            const nameEQ = name + "=";
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.indexOf(nameEQ) === 0) {
                    return cookie.substring(nameEQ.length);
                }
            }
            return null;
        }
    };

    // 禁用右键（可选）
    Ordis.disableContextMenu = function () {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault();
        });
    };

    // 通用工具函数
    Ordis.toggleClass = function (selector, className) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.classList.toggle(className);
        });
    };
})(window);
