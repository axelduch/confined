var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('browserify', function () {
    gulp.src('src/index.js')
        .pipe(browserify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    gulp.run('browserify');
});
