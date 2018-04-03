const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");
const ts = require('gulp-typescript');
const content = require('./content/content');
const clean = require('gulp-clean');

const paths = {
    src: {
        css: 'src/scss/*.scss',
        js: 'src/**/*.ts',
        templates: './src/templates/*.*',
        content: './content/content.js'
    },
    dist: {
        css: 'public/css',
        js: 'public/js',
        templates: 'public',
    }
};

gulp.task('sass', function () {
    return gulp.src(paths.src.css)
        .pipe(sass())
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
});
gulp.task('templates', function () {
    gulp.src(paths.src.templates)
        .pipe(mustache(content, {extension: '.html'}, {}))
        .pipe(gulp.dest(paths.dist.templates));
});
gulp.task('js', function () {
    return gulp.src(paths.src.js)
        .pipe(ts({
            noImplicitAny: true,
            outFile: 'bundle.js'
        }))
        .pipe(gulp.dest(paths.dist.js));
});
gulp.task('clean', function () {
    return gulp.src('public/**/*.*', { read: false })
        .pipe(clean());
});
gulp.task('serve', ['clean', 'templates', 'sass', 'js'], function () {
    browserSync.init({
        server: "./public"
    });

    gulp.watch(paths.src.css, ['sass']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.templates, ['templates']);
    gulp.watch(paths.src.content, ['templates']);
    gulp.watch("public/*.html").on('change', browserSync.reload);
});
gulp.task('default', ['serve']);
