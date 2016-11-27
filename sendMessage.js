var TelegramBot = require('node-telegram-bot-api');
var getHoroscope = require('./src/getHoroscope');
var getWeather = require('./src/getWeather');
var moment = require('moment');
var later = require('later');

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

// bot send message every day 8:00 morning.
later.date.timezone("Asia/Taipei");
// var sched = later.parse.recur().on(8).hour();
var sched = later.parse.recur().on(5).second();
var todayInfo = {
	nowDate: moment().format('YYYY-MM-DD'),
	dayOfWeekEng: moment().format('dddd')
}

var instance = later.setInterval(function() {

	bot.sendMessage(myTelegramID, '早安 Ryan，今天是' + todayInfo.nowDate + '(' + todayInfo.dayOfWeekEng + ')').then(function(){
		getHoroscope(function(err, horoscope){
			console.log('send Message:', horoscope);
			bot.sendMessage(myTelegramID, horoscope).then(function(){
				getWeather(function(err, weather){
					console.log('send weather', weather);
					bot.sendMessage(myTelegramID, weather).then(function(){
						bot.sendMessage(myTelegramID, '祝你有個美好的一天～');
					});
					
				});
			});
		});
	});

}, sched);
