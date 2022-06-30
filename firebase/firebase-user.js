const db = require('./database.js');
const { getArtistsById } = require('./firebase-artist.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;
const { getNewsByArtist } = require('./firebase-news.js');

async function addUser(user) {
	db.collection('Users').doc(user.uid).set(user);
}

async function addSubscription(uid, subscription) {
	db.collection('Users')
		.doc(uid)
		.update({
			subscription: FieldValue.arrayUnion(subscription),
		});
	// increment artist's subscription count
	db.collection('Artists')
		.doc(subscription)
		.update({
			followers: FieldValue.increment(1),
		});
}

async function removeSubscription(uid, subscription) {
	db.collection('Users')
		.doc(uid)
		.update({
			subscription: FieldValue.arrayRemove(subscription),
		});
	// decrement artist's subscription count
	db.collection('Artists')
		.doc(subscription)
		.update({
			followers: FieldValue.increment(-1),
		});
}

async function getSubscriptions(uid) {
	const user = await db.collection('Users').doc(uid).get();
	if (!user.exists) {
		return [];
	}
	return user.data().subscription;
}

async function isSubscribed(uid, subscription) {
	const subscriptions = await getSubscriptions(uid);
	return subscriptions.includes(subscription);
}

async function getSubscribedArtists(uid) {
	const subscriptions = await getSubscriptions(uid);
	if (!subscriptions || subscriptions.length === 0) {
		return [];
	}
	const artists = await db
		.collection('Artists')
		.where('id', 'in', subscriptions)
		.get();
	return artists.docs.map((doc) => doc.data());
}

async function getRecentNews(uid) {
	const subscribedArtists = await getSubscriptions(uid);
	if (!subscribedArtists || subscribedArtists.length === 0) {
		return [];
	}

	const allNews = await Promise.all(
		subscribedArtists.map(async (artistId) => {
			const artistInfo = await getArtistsById(artistId);
			return getNewsByArtist(artistId).then((news) => {
				news.forEach((n) => {
					n.artist = artistInfo;
				});
				return news;
			});
		})
	);
	return allNews.flat().sort((a, b) => {
		return new Date(b.date) - new Date(a.date);
	});
}

module.exports = {
	addUser,
	addSubscription,
	removeSubscription,
	getSubscriptions,
	isSubscribed,
	getSubscribedArtists,
	getRecentNews,
};
