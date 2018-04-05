const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const runSequence = require('run-sequence');

const content = require('./src/content');
const partialsConfig = require('./src/templates/partials/config');
const paths = {
    src: {
        css: 'src/scss/*.scss',
        js: 'src/**/*.ts',
        templates: './src/templates/**/*.mustache',
        contentPath: './src/content/index.json'
    },
    dist: {
        css: 'public/css',
        js: 'public/js',
        templates: 'public',
    }
};

gulp.task('sass', () => {
    return gulp.src(paths.src.css)
        .pipe(sass())
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
gulp.task('serve', (done) => {
    runSequence('clean', 'templates', 'sass', 'js', () => {
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
