var gulp = require('gulp');

var config = require('./conf');

const $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('files:images', function () {
  return gulp.src(config.paths.src + '/assets/img/**/*')
    .pipe($.imagemin({
      progressive: true
    }))
    .pipe(gulp.dest(config.paths.dist + '/images/'))
    .pipe($.size());
});

gulp.task('files:fonts', function () {

  return gulp.src(config.paths.src + 'assets/fonts/**/*')
    .pipe(gulp.dest(config.paths.dist + '/fonts/'));
});

gulp.task(
  'files',
  ['files:images', 'files:fonts']
);
