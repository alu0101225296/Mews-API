const { getArtistByName } = require('../firebase/firebase-artist.js');

class News {
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

	convertToJson() {
		return {
			date: this.date,
			title: this.title,
			body: this.body,
			sourceLink: this.sourceLink,
		};
	}
}

module.exports = News;
