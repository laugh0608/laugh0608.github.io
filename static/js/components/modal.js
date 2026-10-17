/**
 * Ordis Personal Homepage - Modal Component
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};
    let lastFocusedElement = null;

    function setOpen(open) {
        const tc = document.querySelector('.tc');
        const tcMain = document.querySelector('.tc-main');
        if (!tc) return;

        tc.classList.toggle('active', open);
        if (tcMain) {
            tcMain.classList.toggle('active', open);
        }
        tc.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('modal-open', open);

        if (open) {
            lastFocusedElement = document.activeElement;
            if (tcMain) {
                tcMain.setAttribute('tabindex', '-1');
                tcMain.focus();
            }
        } else if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    }

    function pop(imageURL) {
        const tc = document.querySelector('.tc');
        const tcImg = document.querySelector('.tc-img');
        if (!tc) return;

        if (imageURL && tcImg) {
            tcImg.src = imageURL;
        }
        setOpen(!tc.classList.contains('active'));
    }

    Ordis.initModal = function () {
        const tc = document.querySelector('.tc');
        const tcMain = document.querySelector('.tc-main');

        if (tc) {
            tc.addEventListener('click', () => {
                pop();
            });
        }

        if (tcMain) {
            tcMain.addEventListener('click', (event) => {
                event.stopPropagation();
            });
        }

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && tc && tc.classList.contains('active')) {
                pop();
            }
        });

        // 将 pop 函数暴露到全局，以便 HTML 中的 onclick 可以调用
        global.pop = pop;
    };
})(window);
