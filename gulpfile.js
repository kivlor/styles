// require require require
var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	notify = require('gulp-notify'),
	livereload = require('gulp-livereload'),

	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),

	onError = function(err) { console.log(err) }

gulp.task('styles', function() {
	return gulp.src('scss/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(sass({ style: 'expanded' }))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('scss/**/*.scss', ['styles']);
	gulp.watch(['dist/**']).on('change', livereload.changed);
});

gulp.task('build', function() {
	gulp.start('styles');
});

gulp.task('default', ['watch']);