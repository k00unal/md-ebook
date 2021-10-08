const gutil = require('gulp-util');
const through = require('through2');
const html2md = require('to-markdown');
const cheerio = require('cheerio');
const TurndownService = require('turndown')
const turndownService = new TurndownService();


/**
 * This method will parse the HTML of the input file and also return the specified content section as markdown.
 * @return steam The file stream passed by gulp
 */
function parseHTML(){
	var stream = through.obj(function(file, enc, cb) {

		var $ = cheerio.load(file.contents);

		// page properties
		var contentObj = {
			JavaScript: $('nav.breadcrumbs-container').html(),
			content: $('main').html(),
			mainContent: html2md($.html('article section.section')) // Converted to markdown
		};

		var headerMsg = "\n\n Book \n\n\n\n";
		var outputString = '';
		outputString += headerMsg;
        
		for (var row in contentObj) {
			if (row === 'mainContent') {
				outputString += "\n\n ebook \n\n";
				outputString += contentObj[row];
			} else {
				outputString += row + ': ' + contentObj[row] + '\n';
			}
		}

        
		const markdown = turndownService.turndown(outputString)
		
		
		if (file.contents.length){
			file.contents = new Buffer(markdown);
		}

		file.path = gutil.replaceExtension(file.path, '.md');

		cb(null,file);
	});

	return stream;
}

module.exports = parseHTML;