const admin = require('firebase-admin');
const ServiceAccount = require('./Authentication/ServiceAccountKey.json');

admin.initializeApp({
	credential: admin.credential.cert(ServiceAccount),
});

const db = admin.firestore();

module.exports = db;
