const request = require('request');
const cheerio = require('cheerio');

const getNBA = () => new Promise((resolve, reject) => {
    const url = `http://www.nba.com/`;
    request(url, (err, res, body) => {
        const $ = cheerio.load(body);

        const topNews = $('.content_list--item_wrapper').eq(0);

        const topics = [];

        topNews.find('a').map((topic) => {
            topics.push({
                topic: topic.text(),
                link: topic.attr('href')
            });
        });

        const result = {
            topicCount: topNews.find('a').length,
        	topics: `[${topics[0].topic}](${topics[0].link})`
        };

        const message = `NBA ${ result.topicCount } topics： \n ${ result.topics }`;
        
        resolve(message);
    });
});

module.exports = getNBA;