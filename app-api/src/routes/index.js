const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
	res.send('Mews API');
});

module.exports = router;
