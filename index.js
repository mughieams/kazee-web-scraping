var request = require('request');
var cheerio = require('cheerio');

var url = "https://news.ycombinator.com";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    $('span.comhead').each(function(i, element){
        // Select previous element
        var a = $(this).prev();
        // Get the rank by parsing the element two levels above the "a" element
        var rank = a.parent().parent().text();
        // Parse the link title
        var title = a.text();
        // Parse the href attribute form the "a" element
        var url = a.attr('href');
        // Get the subtext children from the next row in the HTML table.
        var subtext = a.parent().parent().next().children('.subtext').children();
        // Extract the relevant data from the children
        var points = $(subtext).eq(0).text();
        var username = $(subtext).eq(1).text();
        var comments = $(subtext).eq(2).text();
        // Our parsed meta data object
        var metadata = {
            rank: parseInt(rank),
            title: title,
            url: url,
            points: parseInt(points),
            username: username,
            comments: parseInt(comments)
        };
        console.log(metadata);
    });
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});