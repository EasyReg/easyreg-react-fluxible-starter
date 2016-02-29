const gulp = require('gulp-help')(require('gulp'));
const browserifyTask = require('./browserify');

gulp.task('watch', false, cb => {
    browserifyTask(cb, true);
});
