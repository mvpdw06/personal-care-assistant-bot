const getHoroscope = require('./src/getHoroscope');
const getWeather = require('./src/getWeather');
const later = require('later');

getHoroscope((err, horoscpoe) => console.log(horoscpoe));

getWeather((err, weather) => console.log(weather));