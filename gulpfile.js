const { src, dest, series, parallel } = require( "gulp" );
const uglify = require( "gulp-uglify" );
const rename = require( "gulp-rename" );
const compiler = require( "sass" );
const sass = require( "gulp-sass" )( compiler );
const babel = require( "gulp-babel" );
const purgecss = require('gulp-purgecss')
const combineMedia = require( "gulp-combine-media" );
const browserify = require( "browserify" );
const source = require( "vinyl-source-stream" );
const buffer = require( "vinyl-buffer" );

// Path to the root directory (change if desired)
const root = ".";

// Used for versioning
const timestamp = Date.now();

/**
 * Builds JS for the site
 */
function buildJs() {
    const bundle = browserify({
        entries: root + "/src/js/main.js"
    });

    return bundle.bundle()
        .pipe( source( "main.js" ) )
        .pipe( buffer() )
        .pipe( babel({
            presets: [["@babel/env", {
                targets: { edge: "12" }
            }]]
        }))
        .pipe( uglify() )
        .pipe( rename({
            extname: ".min.js"
        }))
        .pipe( dest( root + "/public/assets/" ) );
}

/**
 * Builds the CSS for the site
 */
function buildCss() {
    return src( root + "/src/sass/main.scss" )
        .pipe( sass({
            outputStyle: "expanded"
        }))
        .pipe( combineMedia() )
        .pipe( sass({
            outputStyle: "compressed",
            precision: 2
        }))
        .pipe( purgecss({
            content: ["public/**/*.html"],
            safelist: ["is-stuck", "is-open", "has-js", "has-nojs"]
        }) )
        .pipe( rename({
            extname: ".min.css"
        }))
        .pipe( dest( root + "/public/assets/" ) );
}

/**
 * Move icon font and SVG into the public assets folder
 */
function moveIcons() {
    return src([
            root + "/src/font/icomoon/*.ttf",
            root + "/src/font/icomoon/*.woff"
        ])
        .pipe( rename( function (path) {
            path.basename = "icons";

            return path;
        }))
        .pipe( dest( root + "/public/assets/font/") );
}

// Make it public
exports.default = parallel(buildJs, buildCss, moveIcons);
