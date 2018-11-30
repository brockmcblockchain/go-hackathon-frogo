'use strict';
// Get modules
var gulp       = require('gulp');
var sass       = require('gulp-sass');
var babel      = require('gulp-babel');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var imagemin   = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var plumber    = require('gulp-plumber');

// Task sass
gulp.task('styles', function () {
  gulp.src('css/source/style.scss')
    .pipe(plumber())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(gulp.dest('css'))
    .pipe(livereload());
});

// Task scripts
gulp.task('scripts', function () {
  gulp.src('js/source/*.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ["@babel/preset-env"]
    }))
    .pipe(uglify())
    .pipe(rename('main.js'))
    .pipe(gulp.dest('js'));4

});

// Task images
gulp.task('images', function () {
  gulp.src('images/source/*.{png,gif,jpg}')
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest('images/'));
});

// Task watch
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch('css/source/*.scss', ['styles']);
  gulp.watch('js/source/*.js', ['scripts']);
  gulp.watch('images/source/**', ['images']);
  //gulp.watch('app/views/**/*.php').on('change', function(file) {
  //server.changed(file.path);
  //});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['styles', 'scripts', 'images', 'watch']);
