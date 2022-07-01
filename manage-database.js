const {
	addArtist,
	removeAllArtist,
	getArtistByName,
	getAllArtists,
	getArtistsById,
} = require('./firebase/firebase-artist.js');
const artistList = require('./artist-list.json');
const {
	getNewsByArtist,
	getNewsByArtistUsingLimit,
} = require('./firebase/firebase-news.js');
const {
	addUser,
	addSubscription,
	removeSubscription,
	getSubscriptions,
	isSubscribed,
	getSubscribedArtists,
	getRecentNews,
} = require('./firebase/firebase-user.js');
// const artistLista = ['3'];

// getNewsByArtist('3').then((news) => {
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

// getAllArtists().then((artists) => {
// 	console.log(artists);
// });

// addUser({ uid: 'aE45nq1O8TV33DnK0qqopchZIJ32', subscription: [] });
// addSubscription('aE45nq1O8TV33DnK0qqopchZIJ32', '2');
// removeSubscription('aE45nq1O8TV33DnK0qqopchZIJ32', '8');
// isSubscribed('aE45nq1O8TV33DnK0qqopchZIJ32', '8').then((subscribed) => {
// 	console.log(subscribed);
// });
// getSubscriptions('aE45nq1O8TV33DnK0qqopchZIJ32').then((subscriptions) => {
// 	console.log(subscriptions);
// });
// getSubscribedArtists('aE45nq1O8TV33DnK0qqopchZIJ32').then((artists) => {
// 	console.log(artists);
// });
// getArtistsById('2').then((artist) => {
// 	console.log(artist);
// });

// getRecentNews('aE45nq1O8TV33DnK0qqopchZIJ32').then((news) => {
// 	console.log(news);
// });

getNewsByArtistUsingLimit('3', 10).then((news) => {
	console.log(news.lastNews);
});
