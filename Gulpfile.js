var gulp = require('gulp'),
connect = require('gulp-connect'),
ts = require('gulp-typescript'),
wiredep = require('wiredep').stream;

var dist = 'dist';
var app = 'app';
var root = './';

gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src('./app/*.html')
  .pipe(wiredep())
  .pipe(gulp.dest(root))
  .pipe(connect.reload());
});

gulp.task('typescript', function() {
  return gulp.src(app + '/**/*.ts')
  .pipe(ts({
    outFile: 'script.js'
  }))
  .pipe(gulp.dest(root));
});

gulp.task('watch', function() {
  gulp.watch(app + '/*.html', ['html']);
  gulp.watch(app + '/*.ts', ['typescript']);
});

gulp.task('default', ['html', 'typescript', 'connect', 'watch']);
