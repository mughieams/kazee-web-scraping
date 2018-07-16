var request = require('request');
var cheerio = require('cheerio');

var url = "https://detik.com";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    $('span.sub_judul', 'ul.list_feed').each(function(i, element){
        var a = $(this);
        var title = a.next('a').text();
        var url = a.next().attr('href');
        var sub = a.next().next().text();
        var date = sub.split(" | ");
        var metadata = {
            title: title,
            url: url,
            subtitle: date[0],
            date: date[1]
        }
        console.log(metadata);
    });
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});