const gulp = require('gulp-help')(require('gulp'));

const tasks = [
    'sass',
    'nodemon'
];

gulp.task('default', 'Runs build and starts watch task', tasks);
