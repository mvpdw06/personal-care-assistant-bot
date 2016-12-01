const getHoroscope = require('./src/getHoroscope');
const getWeather = require('./src/getWeather');
const moment = require('moment');

getHoroscope(moment).then((horoscope) => console.log(horoscope));
getWeather(moment).then((weather) => console.log(weather));
