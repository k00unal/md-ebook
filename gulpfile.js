const gulp = require('gulp');
const converter = require('./converter');
const prettify = require('gulp-html-prettify');

/* Default task to convert HTML to markdown + additional data points */

gulp.task('pretty', function() {
	gulp.src('./scrap/**/*.html')
	  .pipe(prettify({indent_char: ' ', indent_size: 2}))
	  .pipe(gulp.dest('./output/html/'))
});

gulp.task('html2md', function(callback){
	var stream = gulp.src('./output/**/*.html')
		.pipe(converter())
		.pipe(gulp.dest('./output/md/'))
	return stream;
})




