// const getHoroscope = require('./src/getHoroscope');
// const getWeather = require('./src/getWeather');
const getAppleDaily = require('./src/getNews/getAppleDaily');
// const moment = require('moment');

// getHoroscope(moment).then((horoscope) => console.log(horoscope));
// getWeather(moment).then((weather) => console.log(weather));
getAppleDaily().then((topic) => console.log(topic));
