const request = require('request');
const cheerio = require('cheerio');

const getTaiwanApple = () => new Promise((resolve, reject) => {
    const url = `http://www.appledaily.com.tw/appledaily/todayapple`;
    request(url, (err, res, body) => {
        const $ = cheerio.load(body);

        const topNews = $('.thoracis > h1');

        const result = {
        	topic: topNews.text(),
        	link: topNews.find('a').attr('href')
        };

        const message = `蘋果頭條：${ result.topic }`;
        
        resolve(message);
    });
});

module.exports = getTaiwanApple;