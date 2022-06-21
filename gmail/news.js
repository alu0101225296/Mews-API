class News {
	artist;
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

	setArtist(artist) {
		this.artist = artist;
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

	getArtist() {
		return this.artist;
	}

	setArtistInBody(artistList) {
		let newsContent = (this.title + ' ' + this.body).toLowerCase();
		artistList.forEach((artist) => {
			if (newsContent.includes(artist.toLowerCase())) {
				this.artist = artist;
			}
		});
	}
}

module.exports = News;
