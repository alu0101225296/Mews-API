const { getAllArtists } = require('../../../firebase/firebase-artist.js');
const {
	getNewsByArtist,
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

router.get('/api/news/:artistId', (req, res) => {
	if (!req.query.limit || !req.query.startAfter) {
		getNewsByArtist(req.params.artistId).then((news) => {
			res.json(news);
		});
	} else if (req.query.start) {
		getNewsByArtistUsingLimitAndStartAfter(
			req.params.artistId,
			req.query.limit,
			req.query.start
		).then((news) => {
			res.json(news);
		});
	} else {
		getNewsByArtistUsingLimit(req.params.artistId, req.query.limit).then(
			(news) => {
				res.json(news);
			}
		);
	}
});

// Recent news of artists that the user is subscribed to
router.get('/api/user/:uid/news', (req, res) => {
	getRecentNews(req.params.uid).then((news) => {
		res.json(news);
	});
});

// Register user
router.post('/api/user/:uid', (req, res) => {
	addUser(req.body).then(() => {
		res.json({ success: true });
	});
});

// Get user subscribed artists
router.get('/api/user/:uid/subs', (req, res) => {
	getSubscribedArtists(req.params.uid).then((artists) => {
		res.json(artists);
	});
});

// Subscribe to artist
router.put('/api/user/:uid/subs/:artistId', (req, res) => {
	addSubscription(req.params.uid, req.params.artistId).then(() => {
		res.json({ success: true });
	});
});

// Unsubscribe from artist
router.delete('/api/user/:uid/subs/:artistId', (req, res) => {
	removeSubscription(req.params.uid, req.params.artistId).then(() => {
		res.json({ success: true });
	});
});

// Check if user is subscribed to artist
router.get('/api/user/:uid/subs/:artistId', (req, res) => {
	isSubscribed(req.params.uid, req.params.artistId).then((subscribed) => {
		res.json({ subscribed });
	});
});

module.exports = router;
