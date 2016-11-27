var getHoroscope = require('./src/getHoroscope');
var getWeather = require('./src/getWeather');
var later = require('later');

getHoroscope(function(err, horoscpoe){
    console.log(horoscpoe);
});

getWeather(function(err, weather){
    console.log(weather);
});