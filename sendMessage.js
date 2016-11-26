var TelegramBot = require('node-telegram-bot-api');
var getHoroscope = require('./getHoroscope');
var getWeather = require('./getWeather');

// get from Heroku config variable
var token = process.env.token;
var myTelegramID = process.env.myTelegramID;
var port = process.env.PORT || 8443;
var host = process.env.HOST;

var webhook = {
	webHook: {
		port: port,
		host: host
	}
}

var bot = new TelegramBot(token, webhook);

console.log('app start!');

// bot send message every day morning.
getHoroscope(function(err, horoscope){
	console.log('send Message:', horoscope);
	bot.sendMessage(myTelegramID, horoscope);
});

getWeather(function(err, weather){
	console.log('send weather', weather);
	bot.sendMessage(myTelegramID, weather);
})

console.log('time now: ', new Date());