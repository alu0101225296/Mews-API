const { google } = require('googleapis');
const fs = require('fs');
const oAuth2Client = require('./Authentication/Credentials.js');
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
const historyFile = 'historyId.txt';

async function getMessage(newsId) {
	const message = await gmail.users.messages.get({
		userId: 'me',
		id: newsId,
	});
	return message;
}

// llamarla cada 72 horas
async function watch() {
	let watch = await gmail.users.watch({
		userId: 'me',
		requestBody: {
			topicName: 'projects/tfg-app-350217/topics/gmail-topic',
		},
	});
	let historyId = watch.data.historyId;
	console.log(historyId);
	fs.writeFileSync(historyFile, historyId);
}

async function getHistory(historyId) {
	const history = await gmail.users.history.list({
		userId: 'me',
		historyTypes: 'messageAdded',
		labelIds: 'INBOX',
		startHistoryId: historyId,
	});
	return history.data;
}

module.exports = { getMessage, watch, getHistory };
