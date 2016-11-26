var request = require('request');
var cheerio = require('cheerio');
var moment = require('moment');

function getWeather(callback){
    var nowDate = moment().format('YYYY-MM-DD');
    var dayOfWeek = moment().format('E');
    var dayOfWeekEng = moment().format('dddd');
    
    var url = 'http://www.cwb.gov.tw/V7/forecast/f_index.htm';
    request(url, function(err, res, body){
        var $ = cheerio.load(body);

        var cityWeather,
            todayForecast;
        if(dayOfWeek >= 1 && dayOfWeek < 6){
            // get Taipei city weather
            console.log('1');
            cityWeather = $('#TaipeiCityList').find('td');

            todayForecast = {
                cityname: cityWeather.eq(0).text(),
                temperature: cityWeather.eq(1).text(),
                probability: cityWeather.eq(2).text()
            }
        }
        else{
            // get new Taipei city weather
            cityWeather = $('#TaipeiList').find('td');

            todayForecast = {
                cityname: $('#TaipeiList').find('td').eq(0).text(),
                temperature: $('#TaipeiList').find('td').eq(1).text(),
                probability: $('#TaipeiList').find('td').eq(2).text()
            }
        }

        var message = nowDate + '(' + dayOfWeekEng + ') 今日' + todayForecast.cityname + '氣象預測： 溫度預測：' +  todayForecast.temperature + ', 降雨機率：' + todayForecast.probability

        callback(err, message);
    });
}

module.exports = getWeather;