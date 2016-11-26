var getHoroscope = require('./getHoroscope');
var getWeather = require('./getWeather');

getHoroscope(function(err, horoscpoe){
    console.log(horoscpoe);
});

getWeather(function(err, weather){
    console.log(weather);
});