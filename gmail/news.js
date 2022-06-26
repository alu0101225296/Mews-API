const { getArtistByName } = require('../firebase/firebase-artist.js');

class News {
	artistId;
	artistImage;
	artistName;
	date;
	title;
	body;
	sourceLink;

	constructor(date, title, body, sourceLink) {
		this.date = date;
		this.title = title;
		this.body = body;
		this.sourceLink = sourceLink;
	}

	setTitle(title) {
		this.title = title;
	}

	setBody(body) {
		this.body = body;
	}

	setSourceLink(source) {
		this.sourceLink = source;
	}

	getDate() {
		return this.date;
	}

	getTitle() {
		return this.title;
	}

	getBody() {
		return this.body;
	}

	getSourceLink() {
		return this.sourceLink;
	}

	async setArtistInBody(artistList) {
		let newsContent = (this.title + ' ' + this.body).toLowerCase();
		for (let i = 0; i < artistList.length; i++) {
			let artistName = artistList[i].toLowerCase();
			if (newsContent.includes(artistName)) {
				let artist = await getArtistByName(artistList[i]);
				this.artistId = artist.id;
				this.artistName = artist.name;
				this.artistImage = artist.image;
				break;
			}
		}
	}

	convertToJson() {
		return {
			date: this.date,
			title: this.title,
			body: this.body,
			sourceLink: this.sourceLink,
			artistName: this.artistName,
			artistImage: this.artistImage,
			artistId: this.artistId,
		};
	}
}

module.exports = News;
