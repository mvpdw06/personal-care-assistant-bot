const TelegramBot = require('node-telegram-bot-api');
const getHoroscope = require('./src/getHoroscope');
const getWeather = require('./src/getWeather');
const moment = require('moment');
const later = require('later');

// get from Heroku config variable
const token = process.env.token;
const myTelegramID = process.env.myTelegramID;
const port = process.env.PORT || 8443;
const host = process.env.HOST;

const botSettings = {
	webHook: {
		port: port,
		host: host,
		polling: true
	},
	polling: true
}

const myName = 'Ryan';

const bot = new TelegramBot(token, botSettings);
console.log('app start!');

// bot send message every day 8:00 morning.
later.date.timezone("Asia/Taipei");
const sched = later.parse.recur().on(8).hour();

const instance = later.setInterval(() => {
	// get today info.
	const todayInfo = {
		nowDate: moment().format('YYYY-MM-DD'),
		dayOfWeekEng: moment().format('dddd')
	}

	bot.sendMessage(myTelegramID, `早安 ${myName}，今天是 ${todayInfo.nowDate} (${todayInfo.dayOfWeekEng})`)
	.then((response) => getHoroscope(moment))
	.then((horoscope) => {
		console.log('send Horoscope: ', horoscope);
		return bot.sendMessage(myTelegramID, horoscope);
	})
	.then((response) => getWeather(moment))
	.then((weather) => {
		console.log('send weather: ', weather);
		return bot.sendMessage(myTelegramID, weather);
	})
	.then((response) => bot.sendMessage(myTelegramID, '祝你有個美好的一天～'));

}, sched);

// get normal response.
bot.onText(/\/start/, function (msg) {
    let resp = `${myName} sir, what do you want?`;
    bot.sendMessage(myTelegramID, resp)
	.then((response) => {
		console.log('get command start, response: ', resp);
	});
});

// get now weather.
bot.onText(/\/nowWeather/, function (msg) {
	let resp;
	getWeather(moment)
	.then((weather) => {
		resp = weather;
		return bot.sendMessage(myTelegramID, weather);
	})
	.then((response) => {
		console.log('get command nowWeather, response: ', resp);
	});
});