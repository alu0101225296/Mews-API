const { getAllArtists } = require('../../../firebase/firebase-artist.js');
const { getNewsByArtist } = require('../../../firebase/firebase-news.js');
const {
	addUser,
	addSubscription,
	removeSubscription,
	getSubscriptions,
	isSubscribed,
	getSubscribedArtists,
} = require('../../../firebase/firebase-user.js');
const { Router } = require('express');
const router = Router();

router.get('/api/artist/all', (req, res) => {
	getAllArtists().then((artists) => {
		res.json(artists);
	});
});

router.get('/api/artist/subbed', (req, res) => {
	getSubscribedArtists(req.query.uid).then((artists) => {
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

router.get('/api/user/subbed', (req, res) => {
	console.log(req.query);
	isSubscribed(req.query.uid, req.query.artistId).then((subscribed) => {
		res.json({ subscribed });
	});
});

router.get('/api/user/subs', (req, res) => {
	console.log(req.query);
	getSubscriptions(req.query.uid).then((subscriptions) => {
		res.json(subscriptions);
	});
});

module.exports = router;
