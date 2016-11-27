const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

const getWeather = (callback) => {
    const dayOfWeek = moment().format('E');
    const url = `http://www.cwb.gov.tw/V7/forecast/f_index.htm`;
    request(url, function(err, res, body){
        const $ = cheerio.load(body);

        let cityWeather,
            todayForecast;

        if(dayOfWeek >= 1 && dayOfWeek < 6){
            // get Taipei city weather in workday.
            cityWeather = $('#TaipeiCityList').find('td');

            todayForecast = {
                cityname: cityWeather.eq(0).text(),
                temperature: cityWeather.eq(1).text(),
                probability: cityWeather.eq(2).text()
            }
        }
        else{
            // get new Taipei city weather in weekend.
            cityWeather = $('#TaipeiList').find('td');

            todayForecast = {
                cityname: cityWeather.eq(0).text(),
                temperature: cityWeather.eq(1).text(),
                probability: cityWeather.eq(2).text()
            }
        }

        var message = `今日${ todayForecast.cityname }氣象預測： 溫度預測：${ todayForecast.temperature }, 降雨機率：${ todayForecast.probability}`;

        callback(err, message);
    });
}

module.exports = getWeather;