const getMessage = require('./gmail-basic.js');
const News = require('./news.js');

function parseEmail(emailBody) {
	let bodyEnd = emailBody.indexOf(
		'\r\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -'
	);
	
	if (bodyEnd == -1) {
		return [];
	}

	emailBody = emailBody.slice(0, bodyEnd).replace(/\=\=\=.+?\=\=\=/, '');
	let newsList = emailBody.split(/\r\n\r\n/).filter(Boolean);
	return newsList;
}

function parseNews(newsRaw) {
	let news = {};
	let newsList = newsRaw.split(/\r\n/);

	if (newsList.length < 4) {
		throw new Error('Something went wrong parsing the news');
	}
	news.sourceLink = newsList.pop();
	let body = newsList.pop();
	while (newsList.at(-1).length > 50) {
		body = newsList.pop() + ' ' + body;
	}
	news.body = body;
	newsList.pop();
	news.title = newsList.join(' ');

	return news;
}

function parsePushNotification(body) {
	let encodedData = body.message.data;
	let decodedData = Buffer.from(encodedData, 'base64').toString('utf-8');
	let data = JSON.parse(decodedData);
	return data;
}

module.exports = { parseEmail, parseNews, parsePushNotification };
