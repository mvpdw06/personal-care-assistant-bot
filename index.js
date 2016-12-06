// const getHoroscope = require('./src/getHoroscope');
// const getWeather = require('./src/getWeather');
const getTaiwanApple = require('./src/getNews/getTaiwanApple');
const getCNN = require('./src/getNews/getCNN');
const getNBA = require('./src/getNews/getNBA');
// const moment = require('moment');

// getHoroscope(moment).then((horoscope) => console.log(horoscope));
// getWeather(moment).then((weather) => console.log(weather));
getTaiwanApple().then((topic) => console.log(topic))
// getCNN().then((topic) => console.log(topic))
// getNBA().then((topic) => console.log(topic))
