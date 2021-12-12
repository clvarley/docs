/**
 * Function responsible for controller header scroll animations
 */
function header() {
    const navigation = document.querySelector("#navigation");

    /**
     * Callback for the navigation intersection observer
     *
     * @param {IntersectionObserverEntry[]} - Intersection details
     */
    const animate = ([entry]) => {
        navigation.classList.toggle("is-stuck", entry.intersectionRatio < 1);
    };

    const observer = new IntersectionObserver(animate, {
        rootMargin: "-1px 0px 0px 0px",
        threshold: 1.0
    });
    observer.observe(navigation);
}

module.exports = header;
