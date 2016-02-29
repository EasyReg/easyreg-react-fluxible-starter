const browserify = require('browserify');
const watchify = require('watchify');
const bundleLogger = require('../util/bundleLogger.js');
const gulp = require('gulp-help')(require('gulp'));
const handleErrors = require('../util/handleErrors');
const source = require('vinyl-source-stream');
const config = require('../config').browserify;
const _ = require('lodash');
const babelify = require('babelify');
const envify = require('envify/custom');

const browserifyTask = (cb, devMode) => {
    let bundleArr = config.bundleConfigs.length;

    const browserifyThis = (bundleConfig) => {
        if (devMode) {
            _.extend(bundleConfig, watchify.args, {
                debug: true
            });

            bundleConfig = _.omit(bundleConfig, ['external', 'require']);
        }

        let b = browserify(bundleConfig);

        b.transform(envify());
        b.transform(babelify, {
            presets: ['es2015', 'react', 'stage-2']
        });

        const bundle = () => {
            bundleLogger.start(bundleConfig.outputName);

            return b
                .bundle()
                // Report compile errors
                .on('error', handleErrors)
                // Use vinyl-source-stream to make the
                // stream gulp compatible. Specify the
                // desired output filename here.
                .pipe(source(bundleConfig.outputName))
                // Specify the output destination
                .pipe(gulp.dest(bundleConfig.dest))
                .on('end', reportFinished);
        };

        if (devMode) {
            // Wrap with watchify and rebundle on changes
            b = watchify(b);
            // Rebundle on update
            b.on('update', bundle);
            bundleLogger.watch(bundleConfig.outputName);
        } else {
            // Sort out shared dependencies.
            // b.require exposes modules externally
            if (bundleConfig.require) {
                b.require(bundleConfig.require);
            }
            // b.external excludes modules from the bundle, and expects
            // they'll be available externally
            if (bundleConfig.external) {
                b.external(bundleConfig.external);
            }
        }

        var reportFinished = function() {
            // Log when bundling completes
            bundleLogger.end(bundleConfig.outputName);

            if (bundleArr) {
                bundleArr--;
                if (bundleArr === 0) {
                    // If queue is empty, tell gulp the task is complete.
                    // https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
                    cb();
                }
            }
        };

        return bundle();
    };

    config.bundleConfigs.forEach(browserifyThis);
};

gulp.task('browserify', false, browserifyTask);

module.exports = browserifyTask;
