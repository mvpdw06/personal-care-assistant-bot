const getHoroscope = require('./src/getHoroscope');
const getWeather = require('./src/getWeather');
const cmdConstant = require('./src/cmdConstant');
const getAppleDaily = require('./src/getNews/getAppleDaily');

const TelegramBot = require('node-telegram-bot-api');
const moment = require('moment');
const later = require('later');

// get from Heroku config variable
const token = process.env.token;
const myTelegramID = process.env.myTelegramID;
const port = process.env.PORT || 8443;
const host = process.env.HOST;
const timezone = process.env.TZ || 'Asia/Taipei';

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
later.date.timezone(timezone);
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

bot.onText(/\/help/, () => {
	let resp = `
		You can control me by sending these commands:
		/start to say hello to you.
		/help see what can I do for you.
		/getWeather see weather prediction. 
	`;
	bot.sendMessage(myTelegramID, resp)
	.then((response) => {
		console.log('get command help, response: ', resp);
	});
})

// get normal response.
bot.onText(/\/start/, (msg) => {
    let resp = `${myName} sir, what do you want?`;
    bot.sendMessage(myTelegramID, resp)
	.then((response) => {
		console.log('get command start, response: ', resp);
	});
});

// get now weather.
bot.onText(/\/nowWeather/, (msg) => {
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

bot.onText(/\/getAppleDaily/, (msg) => {
	let resp;
	getAppleDaily()
	.then((topic) => {
		resp = topic;
		return bot.sendMessage(myTelegramID, resp);
	})
	.then((response) => {
		console.log('get command getAppleDaily, response: ', resp);
	});
});