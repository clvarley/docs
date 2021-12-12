let computed;

/**
 * Computes the root font size (in pixels) of this document
 *
 * @return {Number} Font size
 */
const getRootFontSize = function() {
    if (computed) {
        return computed;
    }

    const style = window.getComputedStyle(document.documentElement);
    computed = parseInt(style["font-size"]);

    return computed;
};

module.exports = getRootFontSize;
