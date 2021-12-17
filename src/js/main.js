"use strict";

const queue = window.cmdQueue || [];
const header = require("./src/header.js");
const menu = require("./src/menu.js");

queue.push(header);
queue.push(menu);

// Execute the queue if items are pending
document.addEventListener("DOMContentLoaded", () => {
    if (queue.length) {
        queue.forEach((callback) => callback());
    }

    window.cmdQueue = { push: (callback) => callback() };
});
