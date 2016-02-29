var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config = require('../config').sass;
var autoprefixer = require('gulp-autoprefixer');

var taskDef = function() {
    return gulp.src(config.src)
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest(config.dest));
};

module.exports = taskDef;

gulp.task('sass', false, taskDef);
