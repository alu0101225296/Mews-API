const db = require('./database.js');

async function addNews(news) {
	const newsRef = db.collection('News').add(news);
}

async function getAllNews() {
	const snapshot = await db.collection('News').get();
	return snapshot.docs.map((doc) => doc.data());
}

async function getNewsByArtist(artistId) {
	const snapshot = await db.collection('News').get();
	return snapshot.docs.map((doc) => {
		return artistId.includes(doc.data().id) ? doc.data() : null;
	});
}

module.exports = { addNews, getAllNews, getNewsByArtist };
