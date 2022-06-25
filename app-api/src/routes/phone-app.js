const { getAllArtists } = require('../../../firebase/firebase-artist.js');
const { getNewsByArtist } = require('../../../firebase/firebase-news.js');

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

module.exports = router;
