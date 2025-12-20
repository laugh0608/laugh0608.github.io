/**
 * Ordis Personal Homepage - Page Loader
 */

export function initLoader() {
    const pageLoading = document.querySelector("#ordis-loader");
    if (pageLoading) {
        setTimeout(() => {
            pageLoading.style.opacity = '0';
        }, 100);
    }
}
