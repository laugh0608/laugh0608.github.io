/**
 * Ordis Personal Homepage - Project Card Interactions
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};

    function handlePress(event) {
        this.classList.add('pressed');
    }

    function handleRelease(event) {
        this.classList.remove('pressed');
    }

    function handleCancel(event) {
        this.classList.remove('pressed');
    }

    Ordis.initProjectCards = function () {
        const buttons = document.querySelectorAll('.ordis-project');
        buttons.forEach(button => {
            button.addEventListener('mousedown', handlePress);
            button.addEventListener('mouseup', handleRelease);
            button.addEventListener('mouseleave', handleCancel);
            button.addEventListener('touchstart', handlePress, { passive: true });
            button.addEventListener('touchend', handleRelease, { passive: true });
            button.addEventListener('touchcancel', handleCancel, { passive: true });
        });
    };
})(window);
