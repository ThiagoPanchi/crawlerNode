const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

request('https://www.imdb.com/chart/moviemeter', (error, response, body) => {
  if(error) console.log('Error:' + error);
    let $ = cheerio.load(body);

    $('.lister-list tr').each(function(){
      var title = $(this).find('.titleColumn a').text().trim();
      let rating = $(this).find('.imdbRating strong').text().trim();

      console.log('Título: ' + title);
      fs.appendFile('imdb.txt', title + ' , ' + rating+ '\n', function(err){
        if(err) throw err;
        console.log('Arquivo Salvo com Sucesso.');
      });
    });
});