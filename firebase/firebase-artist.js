const db = require('./database.js');

async function addArtist(artist) {
	const artistRef = db.collection('Artists').doc(artist.id);
	const artistSnapshot = await artistRef.get();
	if (artistSnapshot.exists) {
		return;
	}
	await artistRef.set(artist);
}

async function removeArtist(artistId) {
	await db.collection('Artists').doc(artistId).delete();
}

async function removeAllArtist() {
	db.collection('Artists')
		.get()
		.then((querySnapshot) => {
			querySnapshot.docs.forEach((snapshot) => {
				snapshot.ref.delete();
			});
		});
}

async function getAllArtists() {
	const snapshot = await db.collection('Artists').get();
	return snapshot.docs.map((doc) => doc.data());
}

async function getArtistsById(artistId) {
	return (await db.collection('Artists').doc(artistId).get()).data();
}

// no debería ser necesaria
async function getArtistByName(artistName) {
	const referenced = db.collection('Artists');
	const snapshot = await referenced.where('name', '==', artistName).get();
	if (snapshot.empty) {
		console.log('No matching documents.');
		return;
	}
	return snapshot.docs[0].data();
}

module.exports = {
	addArtist,
	removeArtist,
	removeAllArtist,
	getAllArtists,
	getArtistsById,
	getArtistByName,
};
