const { getAllArtists } = require('../../../firebase/firebase-artist.js');
const {
	getNewsByArtistUsingLimit,
	getNewsByArtistUsingLimitAndStartAfter,
} = require('../../../firebase/firebase-news.js');
const {
	addUser,
	addSubscription,
	removeSubscription,
	isSubscribed,
	getSubscribedArtists,
	getRecentNews,
} = require('../../../firebase/firebase-user.js');
const { Router } = require('express');
const router = Router();

// get all artists
router.get('/api/artist', (req, res) => {
	getAllArtists().then((artists) => {
		res.json(artists);
	});
});

router.get('/api/news/:artistId/:limit', (req, res) => {
	getNewsByArtistUsingLimit(req.params.artistId, req.params.limit).then(
		(news) => {
			res.json(news);
		}
	);
});

router.get('/api/news/:artistId/:limit/:start', (req, res) => {
	getNewsByArtistUsingLimitAndStartAfter(
		req.query.artistId,
		req.query.limit,
		req.query.start
	).then((news) => {
		res.json(news);
	});
});

// Recent news of artists that the user is subscribed to
router.get('/api/user/:uid/news', (req, res) => {
	getRecentNews(req.params.uid).then((news) => {
		res.json(news);
	});
});

// Register user
router.post('/api/user/:uid', (req, res) => {
	addUser(req.params.uid).then(() => {
		res.json({ success: true });
	});
});

// Get user subscribed artists
router.get('/api/user/:uid/subs', (req, res) => {
	getSubscribedArtists(req.query.uid).then((artists) => {
		res.json(artists);
	});
});

// Subscribe to artist
router.put('/api/user/:uid/subs/:artistId', (req, res) => {
	addSubscription(req.query.uid, req.query.artistId).then(() => {
		res.json({ success: true });
	});
});

// Unsubscribe from artist
router.delete('/api/user/:uid/subs/:artistId', (req, res) => {
	removeSubscription(req.body.uid, req.body.subscription).then(() => {
		res.json({ success: true });
	});
});

// Check if user is subscribed to artist
router.get('/api/user/:uid/subs/:artistId', (req, res) => {
	isSubscribed(req.query.uid, req.query.artistId).then((subscribed) => {
		res.json({ subscribed });
	});
});

module.exports = router;
