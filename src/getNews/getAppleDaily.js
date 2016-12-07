const request = require('request');
const cheerio = require('cheerio');

const getAppleDaily = () => new Promise((resolve, reject) => {
    const url = `http://www.appledaily.com.tw/appledaily/article/headline`;
    request(url, (err, res, body) => {
        const $ = cheerio.load(body);

        const topNews = $('.echn').eq(0).find('h1');

        const result = {
        	topic: topNews.text(),
        	link: topNews.find('a').attr('href')
        };

        const message = `蘋果新聞頭條：${ result.topic }`;
        
        resolve(message);
    });
});

module.exports = getAppleDaily;