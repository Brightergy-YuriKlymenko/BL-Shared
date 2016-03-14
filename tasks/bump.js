'use strict';

var gulp = require('gulp');
var path = require('path');
var yargs = require('yargs');

var config = require('./conf');

const $ = require('gulp-load-plugins')();

const argv = yargs
  .option('type', {
    describe: 'Semver version type to bump. `major|minor|patch|prerelease`',
    choices: ['major', 'minor', 'patch', 'prerelease'],
    default: 'patch'
  })
  .option('preid', {
    describe: 'Set the prerelase tag to use.',
    default: false
  })
  .option('version', {
    describe: 'Set a specific version to bump to.',
    default: false
  })
  .argv;

gulp.task('bump', function () {
  var options = {};

  if (argv.version) {
    options.version = argv.version;
  } else {
    options.type = argv.type;
    options.preid = argv.preid;
  }

  return gulp.src([
      path.join(__dirname, '../package.json'),
      path.join(__dirname, '../bower.json')
    ])
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
});
