const notifyAndAddNewsFromMail = require('../../../manage-news.js');
const { Router } = require('express');
const router = Router();

router.get('/push-notification', (req, res) => {
	res.send('Push notification sent');
});

router.post('/push-notification', (req, res) => {
	console.log(req.body);
	notifyAndAddNewsFromMail();
	res.send('Push notification POST');
});

module.exports = router;
