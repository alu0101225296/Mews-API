const db = require('./database.js');

async function addNews(news) {
	db.collection('News').add(news);
}

async function getAllNews() {
	const snapshot = await db.collection('News').get();
	return snapshot.docs.map((doc) => doc.data());
}

async function getNewsByArtist(listOfArtistId) {
	const news = await db
		.collection('News')
		.orderBy('date', 'desc')
		.where('artistId', 'in', listOfArtistId)
		.get();
	return news.docs.map((doc) => doc.data());
}

module.exports = { addNews, getAllNews, getNewsByArtist };
