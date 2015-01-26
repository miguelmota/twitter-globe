var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var compass = require('gulp-compass');
var minifyCSS = require('gulp-minify-css');
var exec = require('child_process').exec;
var react = require('gulp-react');

gulp.task('compass', function(cb) {
    exec('compass compile', cb);
});

gulp.task('react', function () {
  return gulp.src('jsx/*.jsx')
  .pipe(react())
  .pipe(gulp.dest('jsx-compiled'));
});

gulp.task('compress', function() {
  gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['compass']);
  gulp.watch('jsx/*.jsx', ['react']);
});
