var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    paths;

paths = {
    'scripts': ['./src/js/index.js', './src/js/**/*.js'],
    'html': './src/index.html'
};

gulp.task('browserify', function () {
    gulp.src('./src/js/index.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('index.html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    gulp.watch(paths.html, ['index.html']);
    gulp.watch(paths.scripts, ['browserify']);
});
