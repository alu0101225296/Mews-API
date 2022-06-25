const {
	addArtist,
	removeAllArtist,
	getArtistByName,
} = require('./firebase/firebase-artist.js');
const artistList = require('./artist-list.json');
const { getNewsByArtist } = require('./firebase/firebase-news.js');

// const artistLista = ['1', '3'];

// getNewsByArtist(artistLista).then((news) => {
// 	console.log(news.length);
// });

const name = 'Ed Sheeran';
getArtistByName(name)
	.then((artistId) => {
		console.log(artistId);
	})
	.catch((error) => {
		console.log(error);
	});
