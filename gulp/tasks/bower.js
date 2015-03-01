var gulp = require('gulp');
var bower = require('gulp-bower');

gulp.task('bower', function() {
  'use strict';
  return bower({ cwd: './public' }).pipe(gulp.dest('lib/'));
});

gulp.task('default', ['bower']);