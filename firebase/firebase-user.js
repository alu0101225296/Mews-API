const db = require('./database.js');
const FieldValue = require('firebase-admin').firestore.FieldValue;

async function addUser(user) {
	db.collection('Users').doc(user.uid).set(user);
}

async function addSubscription(uid, subscription) {
	db.collection('Users')
		.doc(uid)
		.update({
			subscription: FieldValue.arrayUnion(subscription),
		});
}

async function removeSubscription(uid, subscription) {
	db.collection('Users')
		.doc(uid)
		.update({
			subscription: FieldValue.arrayRemove(subscription),
		});
}

async function getSubscriptions(uid) {
	const user = await db.collection('Users').doc(uid).get();
	return user.data().subscription;
}

async function isSubscribed(uid, subscription) {
	const subscriptions = await getSubscriptions(uid);
	return subscriptions.includes(subscription);
}

async function getSubscribedArtists(uid) {
	const subscriptions = await getSubscriptions(uid);
	const artists = await db
		.collection('Artists')
		.where('id', 'in', subscriptions)
		.get();
	return artists.docs.map((doc) => doc.data());
}

async function getRecentNews(uid) {
	const subscriptions = await getSubscriptions(uid);
	const artists = await db
		.collection('Artists')
		.where('id', 'in', subscriptions)
		.get();
	const artistIds = artists.docs.map((doc) => doc.data().id);
	const news = await db
		.collection('News')
		.orderBy('date', 'desc')
		.where('artistId', 'in', artistIds)
		.get();
	return news.docs.map((doc) => doc.data());
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
