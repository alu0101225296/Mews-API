const getAllArtists = require('./firebase/firebase-artist.js').getAllArtists;
const { parseEmail, parseNews } = require('./gmail/parser.js');
const { getMessage, watch, getHistory } = require('./gmail/gmail-basic.js');
const News = require('./gmail/news.js');
const fs = require('fs');

async function collectNews(newsId) {
	Promise.all([getMessage(newsId), getAllArtists()]).then((values) => {
		let artistNameList = values[1].map((artist) => artist.name);
		const message = values[0];
		const date = new Date(message.headers.date);

		let encoded_body = message.data.payload.parts[0].body.data;
		let decoded_body = Buffer.from(encoded_body, 'base64').toString('utf-8');

		let newsRawList = parseEmail(decoded_body);
		let newsList = newsRawList.map((news) => {
			const parsedNews = parseNews(news);
			let newsObj = new News(
				date,
				parsedNews.title,
				parsedNews.body,
				parsedNews.sourceLink
			);
			newsObj.setArtistInBody(artistNameList);
			return newsObj;
		});
		return newsList;
	});
}

async function notifyAndAddNewsFromMail() {
	let historyId = fs.readFileSync('historyId.txt', 'utf8');

	let newHistory = getHistory(historyId);

	if (newHistory.history != undefined) {
		// let messages = result.data.history.messages.messagesAdded.map(
		// 	(msg) => msg.id
		// );
		// let newsList = messages.map(async (messageId) => collectNews(messageId));
		// console.log(newsList);
		historyId = newHistory.historyId;
		fs.writeFileSync('historyId.txt', historyId);
		console.log('New news added');
	} else {
		console.log('No new news');
	}
}

module.exports = notifyAndAddNewsFromMail;
