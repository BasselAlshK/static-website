const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const mustache = require("gulp-mustache");
const ts = require('gulp-typescript');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const pump = require('pump');

const content = require('../src/content');
const partialsConfig = require('../src/templates/partials/config');

function prodConfig(gulp, paths) {

    gulp.task('sassBuild', () => {
        return gulp.src(paths.src.css)
            .pipe(sass({ includePaths: ['src/scss'], outputStyle: 'compressed' })).on('error', sass.logError)
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(concat('index.css'))
            .pipe(gulp.dest(paths.dist.css));
    });
    gulp.task('templatesBuild', () => {
        gulp.src(paths.src.templates)
            .pipe(mustache(content, { extension: '.html' }, { partialsConfig }))
            .pipe(gulp.dest(paths.dist.templates));
    });
    gulp.task('jsBuild', (cb) => {
        pump([
            gulp.src(paths.src.js),
            ts({
                noImplicitAny: true,
                outFile: 'bundle.js',
                module: 'system',
            }),
            uglify(),
            gulp.dest(paths.dist.js)
        ], cb);
    });
    gulp.task('cleanBuild', () => {
        return gulp.src(['public/**/*.*'], { read: false })
            .pipe(clean());
    });
    gulp.task('copyBuild', () => {
        gulp.src(paths.src.assets)
            .pipe(gulp.dest(paths.dist.assets));
    });
    gulp.task('copyUtilBuild', () => {
        gulp.src(paths.src.util)
            .pipe(gulp.dest(paths.dist.util));
    });
    gulp.task('build', (done) => {
        runSequence('cleanBuild', 'copyUtilBuild', 'copyBuild', 'templatesBuild', 'sassBuild', 'jsBuild', () => {
            done();
        });
    });
    gulp.task('dist', ['build']);
}
module.exports = prodConfig;
