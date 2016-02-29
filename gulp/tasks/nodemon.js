const nodemon = require('gulp-nodemon');
const config = require('../config.js').nodemon;
const gulp = require('gulp-help')(require('gulp'));

gulp.task('nodemon', 'Starts local dev server and watches', ['watch'], cb => {
    let started = false;
    return nodemon(config)
        .on('start', () => {
            if(!started){
                started = true;
                setTimeout(() => {
                    cb();
                }, 1000);
            }
        });
});
