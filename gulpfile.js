/* ======================================================================================
GULPFILE.js
====================================================================================== */

/*
REQUIRE TASKS
--------------------------------------------------------------------------------------- */
var gulp 		  = require('gulp'),
	sass 		  = require('gulp-sass'),
	minifyCss 	  = require('gulp-minify-css'),
	plumber 	  = require('gulp-plumber'),
	gutil 		  = require('gulp-util'),
	livereload	  = require('gulp-livereload');

/*
Paths
--------------------------------------------------------------------------------------- */
var dest 		= "./",
	src 		= "./",
	sassSrc 	= src + "./skins/houfek/scss/*.scss",
	sassDest 	= dest + "./public/static/houfek/css";

module.exports = {

	// SASS
	sass: {
		src: src + "/sass/*.{sass,scss}",
		dest: dest + "/css"
	},

	// Images
	images: {
		src: "/images/**",
		dest: "/images"
	}
};

/*
onError
--------------------------------------------------------------------------------------- */
var onError = function(err) {
	gutil.log(gutil.colors.red(err));
};


/*
SASS KOMPILACE
--------------------------------------------------------------------------------------- */
gulp.task('sass', async function() {
		gulp.src('./**/*.scss')
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sass())		
		.pipe(minifyCss())
		.pipe(gulp.dest('./'))
		.pipe(livereload());
});


/*
WATCH
--------------------------------------------------------------------------------------- */
gulp.task('watch', async function() {
	gulp.watch('./**/*.scss', gulp.series('sass'));
});


/*
DEFAULT TASK
--------------------------------------------------------------------------------------- */
gulp.task('default', gulp.series('sass', 'watch'));