/**
 * Ordis Personal Homepage - Page Loader
 */

(function (global) {
    const Ordis = global.Ordis = global.Ordis || {};

    Ordis.initLoader = function () {
        const pageLoading = document.querySelector("#ordis-loader");
        if (pageLoading) {
            setTimeout(() => {
                pageLoading.style.opacity = '0';
            }, 100);
        }
    };
})(window);
