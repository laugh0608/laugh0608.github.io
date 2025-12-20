/**
 * Ordis Personal Homepage - Modal Component
 */

import { toggleClass } from '../core/utils.js';

function pop(imageURL) {
    const tcMainElement = document.querySelector(".tc-img");
    if (imageURL) {
        tcMainElement.src = imageURL;
    }
    toggleClass(".tc-main", "active");
    toggleClass(".tc", "active");
}

export function initModal() {
    const tc = document.getElementsByClassName('tc');
    const tc_main = document.getElementsByClassName('tc-main');

    if (tc[0]) {
        tc[0].addEventListener('click', () => {
            pop();
        });
    }

    if (tc_main[0]) {
        tc_main[0].addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // 将 pop 函数暴露到全局，以便 HTML 中的 onclick 可以调用
    window.pop = pop;
}
