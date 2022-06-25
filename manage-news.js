const getAllArtists = require('./firebase/firebase-artist.js').getAllArtists;
const { parseEmail, parseNews } = require('./gmail/parser.js');
const { getMessage, watch, getHistory } = require('./gmail/gmail-basic.js');
const News = require('./gmail/news.js');
const addNews = require('./firebase/firebase-news.js').addNews;
const fs = require('fs');

const historyFile = '/root/mews/Mews-API/historyId.txt';

async function collectNews(newsId) {
	let artistList = await getAllArtists();
	const message = await getMessage(newsId);

	artistNameList = artistList.map((artist) => artist.name);
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
}

async function notifyAndAddNewsFromMail() {
	let historyId = fs.readFileSync(historyFile, 'utf8');

	let newHistory = await getHistory(historyId);

	if (newHistory.history != undefined) {
		let messages = newHistory.history[
			newHistory.history.length - 1
		].messagesAdded.map((msg) => msg.message.id);

		let newsList = await Promise.all(
			messages.map(async (messageId) => {
				let news = await collectNews(messageId);
				console.log(messageId);
				console.log(news);
				return news;
			})
		);

		newsList = newsList.flat();
		newsList.forEach((news) => {
			addNews(news.convertToJson());
		});

		historyId = newHistory.historyId;
		fs.writeFileSync(historyFile, historyId);

		console.log('New news added');
	} else {
		console.log('No new news');
	}
}

module.exports = notifyAndAddNewsFromMail;
