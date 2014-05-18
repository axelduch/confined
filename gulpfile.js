var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    paths;

paths = {
    'scripts': ['./src/js/index.js', './src/js/**/*.js'],
    'html': './src/index.html'
};

gulp.task('jshint', function () {
    gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    gulp.src(paths.scripts)
        .pipe(browserify().on('error', function (e) { console.log('Browserify has failed'); }))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('livereload', function () {
    gulp.src(paths.scripts)
        .pipe(livereload());
});

gulp.task('index.html', function () {
    gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    gulp.watch(paths.html, ['index.html', 'livereload']);
    gulp.watch(paths.scripts, ['browserify', 'livereload', 'jshint']);
});
