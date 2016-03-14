'use strict';

/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');
var nconf = require('nconf');

nconf.argv().env();

exports.environment = {
  'ENV'       : nconf.get('ENV')
};

/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};

exports.paths = {
  src: 'src',
  dist: 'dist/',
  e2e: 'e2e'
};

/**
 * Ignore files from bower packages
 */

exports.bowerIgnore = [
  '**/_bootstrap.scss' ,
  '**/bootstrap.js',
  '**/angular-mocks.js'
];
