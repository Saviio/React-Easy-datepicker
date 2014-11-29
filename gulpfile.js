var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

gulp.task('build', function(){
  browserify(['./app.js'])
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./'))
});

gulp.task('watch', function() {
    gulp.watch(['*.jsx'], ['build']);
});

gulp.task('default', ['watch', 'build']);
