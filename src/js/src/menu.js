/**
 * Function responsible for registering necessary menu hooks
 */
function menu() {
    const button = document.getElementById("btn-menu");
    const element = document.getElementById("menu");
    let is_open = false;

    button.addEventListener("click", () => {
        if (is_open) {
            element.classList.remove("is-open");
            element.setAttribute("aria-expanded", "false");
            element.blur();
        } else {
            element.classList.add("is-open");
            element.setAttribute("aria-expanded", "true");
            element.focus();
        }

        // Flip the toggle
        is_open = !is_open;
    });
}

module.exports = menu;
