
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const runSequence = require('run-sequence');

const content = require('../src/content');
const partialsConfig = require('../src/templates/partials/config');

function devConfig(gulp, paths) {

    gulp.task('sass', () => {
        return gulp.src(paths.src.css)
            .pipe(sass({ includePaths: ['src/scss'] })).on('error', sass.logError)
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(concat('index.css'))
            .pipe(gulp.dest(paths.dist.css))
            .pipe(browserSync.stream());
    });
    gulp.task('templates', () => {
        gulp.src(paths.src.templates)
            .pipe(mustache(content, { extension: '.html' }, { partialsConfig }))
            .pipe(gulp.dest(paths.dist.templates));
    });
    gulp.task('js', () => {
        return gulp.src(paths.src.js)
            .pipe(ts({
                noImplicitAny: true,
                outFile: 'bundle.js',
                module: 'system',
            }))
            .pipe(gulp.dest(paths.dist.js));
    });
    gulp.task('clean', () => {
        const fileFilter = filter(['**', '!*public/vendor/**/*.*']);
        return gulp.src(['public/**/*.js', 'public/**/*.css', 'public/**/*.html'], { read: false })
            .pipe(fileFilter)
            .pipe(clean());
    });
    gulp.task('copy', () => {
        gulp.src(paths.src.assets)
            .pipe(gulp.dest(paths.dist.assets));
    });
    gulp.task('copyUtil', () => {
        gulp.src(paths.src.util)
            .pipe(gulp.dest(paths.dist.util));
    });
    gulp.task('serve', (done) => {
        runSequence('clean', 'copyUtil', 'copy', 'templates', 'sass', 'js', () => {
            browserSync.init({
                server: "./public"
            });
            done();
        })


        gulp.watch(paths.src.css, ['sass']);
        gulp.watch(paths.src.js, ['js']).on('change', browserSync.reload);
        gulp.watch(paths.src.templates, ['templates']);
        gulp.watch("public/*.html").on('change', browserSync.reload);
    });
    gulp.task('default', ['serve']);
}
module.exports = devConfig;
