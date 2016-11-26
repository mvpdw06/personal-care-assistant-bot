var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

function getHoroscope(callback){
    var nowDate = moment().format('YYYY-MM-DD');
    var dayOfWeekEng = moment().format('dddd');
    var myAstro = '4';
    var url = 'http://astro.click108.com.tw/daily_4.php?iAcDay=' + nowDate + '&iAstro=' + myAstro;
    request(url, function(err, res, body){
        var $ = cheerio.load(body);

        var todayFotune = $('.TODAY_FORTUNE > .TODAY_LUCKY > .LUCKY');

        var todayHoroscope = {
        	luckyNumber: todayFotune.eq(0).text().trim(),
        	luckyColor: todayFotune.eq(1).text().trim(),
            todayDescription: $('.TODAY_WORD').text().trim()
        };

        var message = nowDate + '(' + dayOfWeekEng + ') 獅子座今日幸運數字：' + todayHoroscope.luckyNumber + ', 幸運顏色：' + todayHoroscope.luckyNumber + ' ,總結：' + todayHoroscope.todayDescription;

        callback(err, message);
    });
}

module.exports = getHoroscope;