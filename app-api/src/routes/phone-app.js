const { getAllArtists } = require('../../../firebase/firebase-artist.js');
const { getNewsByArtist } = require('../../../firebase/firebase-news.js');
const {
	addUser,
	addSubscription,
	removeSubscription,
} = require('../../../firebase/firebase-user.js');
const { Router } = require('express');
const router = Router();

router.get('/api/artist', (req, res) => {
	getAllArtists().then((artists) => {
		res.json(artists);
	});
});

router.get('/api/news/', (req, res) => {
	console.log(req.query.array);
	getNewsByArtist(req.query.array).then((news) => {
		res.json(news);
	});
});

router.post('/api/user/add', (req, res) => {
	console.log(req.body);
	addUser(req.body).then(() => {
		res.json({ success: true });
	});
});

router.put('/api/user/sub', (req, res) => {
	console.log(req.body);
	addSubscription(req.body.uid, req.body.subscription).then(() => {
		res.json({ success: true });
	});
});

router.put('/api/user/unsub', (req, res) => {
	console.log(req.body);
	removeSubscription(req.body.uid, req.body.subscription).then(() => {
		res.json({ success: true });
	});
});

module.exports = router;
