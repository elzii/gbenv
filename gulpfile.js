/**
 * Modules
 * @type {Public}
 */
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserify   = require('gulp-browserify'),
    compass      = require('gulp-compass'),
    minifycss    = require('gulp-minify-css'),
    concat       = require('gulp-concat'),
    wrap         = require('gulp-wrap'),
    rename       = require('gulp-rename'),
    sourcemaps   = require('gulp-sourcemaps'),
    gutil        = require('gulp-util'),
    uglify       = require('gulp-uglify'),
    path         = require('path'),
    fileinclude  = require('gulp-file-include'),
    tinylr;



/**
 * Modules
 * @type {Private}
 */
var config   = require('./config/config.js'),
    secrets  = require('./config/secrets.js'),
    log      = require('./config/log.js')










/**
 * -----------------------------------------
 * TASK: Express
 * -----------------------------------------
 */
gulp.task('express', function() {
  var express   = require('express'),
      app       = express()

  // USE
  app.use(require('connect-livereload')({ port: config.ports.livereload }))
  app.use(express.static(__dirname + '/app'))

  // LISTEN
  app.listen( config.ports.express )


  gutil.log( gutil.colors.black.bgYellow( ' EXPRESS SERVER RUNNING ' ), gutil.colors.bgCyan.black( ' http://localhost:' + config.ports.express + ' ') )
})




/**
 * -----------------------------------------
 * TASK: Live Reload
 * -----------------------------------------
 */
gulp.task('livereload', function (event) {
  tinylr = require('tiny-lr')()
  tinylr.listen( config.ports.livereload )

  gutil.log( gutil.colors.black.bgMagenta( ' LIVERELOAD ' ), gutil.colors.bgCyan.black( ' http://localhost:' + config.ports.livereload + ' ') )
})













/**
 * -----------------------------------------
 * TASK: Styles
 * -----------------------------------------
 */
gulp.task('styles', function() {

  return sass( config.paths.css, { style: 'expanded' })
    .on('error', function (e) {
      console.log('ERROR', e)
    })
    .pipe(sourcemaps.init())
    .pipe(gulp.dest( config.paths.css ))

})
















/**
 * -----------------------------------------
 * TASK: Browserify
 * -----------------------------------------
 */
gulp.task('browserify', function() {
  return gulp.src( config.paths.js + 'src.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : !gulp.env.production
    }))
    .pipe(gulp.dest( config.paths.js + 'build/' ))
});













/**
 * -----------------------------------------
 * TASK: Watch
 * -----------------------------------------
 */
gulp.task('watch', function() {
  gulp.watch([ config.paths.css + '/**/*.scss'], ['styles'], function(event) {
    log.notifyLiveReload(tinylr, event)
  })
  gulp.watch([ config.paths.js + '/**/*.js'], function (event) {
    log.notifyLiveReload(tinylr, event)
  })

  gulp.watch([ config.paths.js + 'src.js'], ['browserify'], function (event) {
    log.notifyLiveReload(tinylr, event)
    console.log('src.js changed')
  })

  // gulp.watch([ config.paths.css + '/**/*.css'], function (event) {
  //   log.notifyLiveReload(tinylr, event)
  // })
  // gulp.watch([
  //   config.paths.src + '*.html',
  //   config.paths.partials + '*.tpl.html',
  // ], ['partials'])
})










/**
 * -----------------------------------------
 * TASK: Default
 * -----------------------------------------
 */
gulp.task('default', [
  'express', 
  'livereload', 
  'styles', 
  'browserify', 
  // 'partials',
  'watch'
], function() {

})

