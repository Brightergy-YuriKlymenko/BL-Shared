'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

wrench.readdirSyncRecursive('./tasks').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./tasks/' + file);
});

/*gulp.task('default', ['clean'], function () {
  gulp.start('build');
});*/
