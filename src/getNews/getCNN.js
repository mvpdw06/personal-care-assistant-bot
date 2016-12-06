const request = require('request');
const cheerio = require('cheerio');

const getCNN = () => new Promise((resolve, reject) => {
    const url = `http://edition.cnn.com/`;
    request(url, (err, res, body) => {
        const $ = cheerio.load(body);

        const topNews = $('.cd__content > h3 > a');

        const result = {
        	topic: $('.cd__headline-text').text(),
        	link: topNews.attr('href')
        };

        const message = `CNN 頭條：${ result.topic }`;
        
        resolve(topNews);
    });
});

module.exports = getCNN;