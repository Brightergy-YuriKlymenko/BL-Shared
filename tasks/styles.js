'use strict';

var gulp = require('gulp');
/*var browserSync = require('browser-sync');*/

var config = require('./conf');

var $ = require('gulp-load-plugins')();

/*gulp.task('styles-reload', ['styles'], function () {
  return buildStyles()
    .pipe(browserSync.stream());
});*/

gulp.task('styles', function () {
  return buildStyles();
});

var buildStyles = function () {
  var sassOptions = {
    style: 'expanded',
    includePaths: [
      './bower_components'
    ]
  };

  var autoPrefixerOptions = {
    browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
  };

  return gulp.src([
      config.paths.src + '/assets/scss/main.scss'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.sass(sassOptions)).on('error', config.errorHandler('Sass'))
    .pipe($.autoprefixer(autoPrefixerOptions)).on('error', config.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(config.paths.dist + '/css/'));
};
