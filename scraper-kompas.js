var request = require('request');
var cheerio = require('cheerio');

var url = "https://kompas.com";

request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    $('div.article__list__title', 'div.latest').each(function(i, element){
        var a = $(this);
        var title = a.children().children().text();
        var url = a.children().children().attr('href');
        var subtitle = a.next('div.article__list__info').children('div.article__subtitle').text();
        var date = a.next('div.article__list__info').children('div.article__date').text();
        var metadata = {
            title: title,
            url: url,
            subtitle: subtitle,
            date: date,
        }
        console.log(metadata);
    });
  }
  else {
    console.log("We’ve encountered an error: " + error);
  }
});