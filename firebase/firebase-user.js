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

module.exports = { addUser, addSubscription, removeSubscription };
