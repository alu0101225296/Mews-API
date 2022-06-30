const alerts = require('google-alerts-api');
const { HOW_OFTEN, DELIVER_TO, HOW_MANY, SOURCE_TYPE } = alerts;

const MAIL = 'sample@gmail.com';
const PASSWORD = '********';
const NAME = 'alert-name';

alerts.configure({
	mail: MAIL,
	password: PASSWORD,
});

alerts.sync(() => {
	const alertToCreate = {
		howOften: HOW_OFTEN.AT_MOST_ONCE_A_DAY,
		lang: 'en',
		name: NAME,
		region: 'PL',
		howMany: HOW_MANY.BEST,
		deliverTo: DELIVER_TO.MAIL,
		deliverToData: MAIL,
	};

	console.log(alertToCreate);

	alerts.create(alertToCreate, (err, alert) => {
		console.log(err);
	});
});
