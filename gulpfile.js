const gulp = require('gulp');
const converter = require('./converter');

/* Default task to convert HTML to markdown + additional data points */
gulp.task('html2md', function(callback){
	var stream = gulp.src('./output/html/*.html')
		.pipe(converter())
		.pipe(gulp.dest('output/md'))
	return stream;
})

