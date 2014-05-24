var gulp = require('gulp'),
    rename = require('gulp-rename'),
    watch = require('gulp-watch'),
    browserify = require('gulp-browserify'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    mainScript = './src/js/index.js',
    paths;

paths = {
    'mainScript': mainScript,
    'scripts': [mainScript, './src/js/**/*.js'],
    'html': './src/index.html'
};

gulp.task('jshint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function () {
    return gulp.src(paths.mainScript)
        .pipe(browserify().on('error', function (e) { console.log('Browserify has failed\n', e); }))
        .pipe(rename('index.js'))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('livereload', ['browserify'], function () {
    return gulp.src(paths.scripts)
        .pipe(livereload());
});

gulp.task('index.html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', function () {
    livereload();
    gulp.watch(paths.html, ['index.html', 'livereload']);
    gulp.watch(paths.scripts, ['browserify', 'livereload', 'jshint']);
});
