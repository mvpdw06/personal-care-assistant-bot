var getHoroscpoe = require('./getHoroscpoe');
var getWeather = require('./getWeather');

getHoroscpoe(function(err, horoscpoe){
    console.log(horoscpoe);
});

getWeather(function(err, weather){
    console.log(weather);
});