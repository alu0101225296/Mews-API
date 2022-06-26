const {
	addArtist,
	removeAllArtist,
	getArtistByName,
} = require('./firebase/firebase-artist.js');
const artistList = require('./artist-list.json');
const { getNewsByArtist } = require('./firebase/firebase-news.js');
const {
	addUser,
	addSubscription,
	removeSubscription,
	getSubscriptions,
	isSubscribed,
} = require('./firebase/firebase-user.js');
// const artistLista = ['3'];

// getNewsByArtist(artistLista).then((news) => {
// 	console.log(news);
// });

// artistList.forEach((artist) => {
// 	addArtist(artist)
// 		.then(() => {
// 			console.log('Artist added');
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });

// addUser({ uid: 'A4TgP3NAsGVfwwX5jcGzRb0LMwj2', subscription: [] });
// addSubscription('A4TgP3NAsGVfwwX5jcGzRb0LMwj2', '8');
// removeSubscription('A4TgP3NAsGVfwwX5jcGzRb0LMwj2', '3');
// isSubscribed('A4TgP3NAsGVfwwX5jcGzRb0LMwj2', '8').then((subscribed) => {
// 	console.log(subscribed);
// });
// getSubscriptions('A4TgP3NAsGVfwwX5jcGzRb0LMwj2').then((subscriptions) => {
// 	console.log(subscriptions);
// });
