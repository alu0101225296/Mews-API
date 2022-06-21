const { addArtist, removeAllArtist } = require('./firebase/firebase-artist.js');
const artistList = require('./artist-list.json');

try {
	artistList.forEach((artist) => addArtist(artist));
	console.log('Artists added');
} catch (error) {
	console.log(error);
}

// removeAllArtist();
