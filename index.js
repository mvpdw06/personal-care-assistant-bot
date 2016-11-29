const getHoroscope = require('./src/getHoroscope');
const getWeather = require('./src/getWeather');

getHoroscope.then((horoscope) => console.log(horoscope));
getWeather.then((weather) => console.log(weather));
