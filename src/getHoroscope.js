const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

const getHoroscope = (callback) => {
    const nowDate = moment().format('YYYY-MM-DD');
    const myAstro = '4';
    const url = `http://astro.click108.com.tw/daily_4.php?iAcDay=${ nowDate }&iAstro=${ myAstro }`;
    request(url, (err, res, body) => {
        const $ = cheerio.load(body);

        const todayFotune = $('.TODAY_FORTUNE > .TODAY_LUCKY > .LUCKY');

        const todayHoroscope = {
        	luckyNumber: todayFotune.eq(0).text().trim(),
        	luckyColor: todayFotune.eq(1).text().trim(),
            todayDescription: $('.TODAY_WORD').text().trim()
        };

        const message = `獅子座今日幸運數字：${ todayHoroscope.luckyNumber }, 幸運顏色： ${ todayHoroscope.luckyColor }, 總結：${ todayHoroscope.todayDescription }`;

        callback(err, message);
    });
}

module.exports = getHoroscope;