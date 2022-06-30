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

module.exports = { addNews, getAllNews, getNewsByArtist };
