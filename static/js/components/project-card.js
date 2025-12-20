/**
 * Ordis Personal Homepage - Project Card Interactions
 */

function handlePress(event) {
    this.classList.add('pressed');
}

function handleRelease(event) {
    this.classList.remove('pressed');
}

function handleCancel(event) {
    this.classList.remove('pressed');
}

export function initProjectCards() {
    const buttons = document.querySelectorAll('.ordis-project');
    buttons.forEach(button => {
        button.addEventListener('mousedown', handlePress);
        button.addEventListener('mouseup', handleRelease);
        button.addEventListener('mouseleave', handleCancel);
        button.addEventListener('touchstart', handlePress, { passive: true });
        button.addEventListener('touchend', handleRelease, { passive: true });
        button.addEventListener('touchcancel', handleCancel, { passive: true });
    });
}
