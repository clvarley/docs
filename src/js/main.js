"use strict";

const queue = window.cmdQueue || [];
const header = require("./src/header.js");

queue.push( header );

// Execute the queue if items are pending
document.addEventListener( "DOMContentLoaded", () => {
    if ( queue.length ) {
        queue.forEach( (callback) => callback() );
    }

    window.cmdQueue = { push: (callback) => callback() };
});
