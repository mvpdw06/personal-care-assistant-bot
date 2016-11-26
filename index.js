var getHoroscope = require('./getHoroscope');
var getWeather = require('./getWeather');
var later = require('later');

getHoroscope(function(err, horoscpoe){
    console.log(horoscpoe);
});

getWeather(function(err, weather){
    console.log(weather);
});