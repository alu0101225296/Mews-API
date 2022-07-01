const db = require('./database.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

async function addNews(news) {
	const newsContent = (news.title + '\n' + news.body).toLowerCase();
	db.collection('Artists')
		.get()
		.then((artists) => {
			artists.forEach((artist) => {
				const artistName = artist.data().name.toLowerCase();
				const artistId = artist.id;
				if (newsContent.includes(artistName)) {
					db.collection('Artists').doc(artistId).collection('News').add(news);
				}
			});
		});
}

// not used
async function getAllNews() {
	const snapshot = await db.collection('News').get();
	return snapshot.docs.map((doc) => doc.data());
}

async function getNewsByArtist(artistId) {
	const snapshot = await db
		.collection('Artists')
		.doc(artistId)
		.collection('News')
		.get();
	return snapshot.docs.map((doc) => doc.data());
}

async function getNewsByArtistUsingLimit(artistId, limit) {
	const snapshot = await db
		.collection('Artists')
		.doc(artistId)
		.collection('News')
		.orderBy('date', 'desc')
		.limit(limit)
		.get();
	const lastNews = snapshot.docs[snapshot.docs.length - 1].id;
	const news = snapshot.docs.map((doc) => doc.data());
	return { news, lastNews };
}

async function getNewsByArtistUsingLimitAndStartAfter(
	artistId,
	limit,
	startAfter
) {
	const snapshot = await db
		.collection('Artists')
		.doc(artistId)
		.collection('News')
		.orderBy('date', 'desc')
		.startAfter(startAfter)
		.limit(limit)
		.get();
	const lastNews = snapshot.docs[snapshot.docs.length - 1].id;
	const news = snapshot.docs.map((doc) => doc.data());
	return { news, lastNews };
}

module.exports = {
	addNews,
	getAllNews,
	getNewsByArtist,
	getNewsByArtistUsingLimit,
	getNewsByArtistUsingLimitAndStartAfter,
};
