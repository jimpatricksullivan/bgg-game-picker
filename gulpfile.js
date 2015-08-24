var gulp = require('gulp');
var mocha = require('gulp-mocha');
var karma = require('karma').server;
var bower = require('gulp-bower');
gulp.task('bower', function() {
    return bower({
        cwd: './public'
    });
});

gulp.task('test:public', ['bower'], function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('test:server', function() {
    return gulp.src(['spec/*.spec.js'], { read: false })
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['test:server', 'test:public']);