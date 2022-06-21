const express = require('express');
const app = express();
const morgan = require('morgan');

// settings
app.set('port', process.env.PORT || 3000);

// Middleware: permite ver los datos que llegan a la API
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/push-notification'));

// Start server
app.listen(app.get('port'), () => {
	console.log('Server is running on port 3000');
});
