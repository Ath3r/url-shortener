const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { errorHandler, notFound } = require('./middleware/middleware');
const main = require('./api/main');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.use(cors());

app.use(morgan('dev'));

app.use(helmet());

app.get('/', (req, res) => {
	res.json({
		route: 'GET req for main route',
	});
});

app.use('/url', main);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
