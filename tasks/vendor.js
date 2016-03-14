'use strict';

var gulp = require('gulp');
var path = require('path');

var config = require('./conf');

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('vendor', function() {
  var jsFilter = $.filter('**/*.js', { restore: true });
  var cssFilter = $.filter('**/*.css', { restore: true });
  var swfFilter = $.filter('**/*.swf', { restore: true });

  return gulp
    .src($.mainBowerFiles())
    .pipe($.ignore.exclude(config.bowerIgnore))
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.concat('js/vendor.min.js'))
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', config.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('/'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.concat('css/vendor.min.css'))
    .pipe($.minifyCss({ processImport: false }))
    .pipe($.sourcemaps.write('/'))
    .pipe(cssFilter.restore)
    .pipe(swfFilter)
    .pipe(gulp.dest(config.paths.dist + '/swf'))
    .pipe(swfFilter.restore)
    .pipe(gulp.dest(config.paths.dist))
    .pipe($.size({ title: config.paths.dist + '/', showFiles: true }));
});
