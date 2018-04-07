const gulp = require('gulp');
const devConfig = require('./config/dev');
const prodConfig = require('./config/prod');
const paths = {
    src: {
        css: 'src/scss/*.scss',
        js: 'src/**/*.ts',
        templates: './src/templates/**/*.mustache',
        contentPath: './src/content/index.json',
        assets: './src/assets/**/*',
        util: './website-util/**/*.*',
    },
    dist: {
        css: 'public/css',
        js: 'public/js',
        templates: 'public',
        assets: 'public/assets',
        util: 'public/'
    }
};
devConfig(gulp, paths);
prodConfig(gulp, paths);