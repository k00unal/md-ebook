const scrape = require('website-scraper'); 
const websiteUrl = 'https://www.learnrxjs.io/'; 

scrape({ 
    urls: [websiteUrl], 
    urlFilter: function (url) { 
        return url.indexOf(websiteUrl) === 0; 
    }, 
    recursive: true, 
    maxDepth: 50, 
    prettifyUrls: true, 
    // filenameGenerator: 'byType', 
    filenameGenerator: 'bySiteStructure', 
    directory: './scrap/book/' ,
}).then((data) => { 
    console.log("Entire website succesfully downloaded"); 
}).catch((err) => { 
    console.log("An error ocurred", err); 
}); 