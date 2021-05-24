const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { errorHandler, notFound } = require('../middleware/middleware');
const main = require('./shortener/main');

const app = express();

app.use(express.static('public'));

app.use(cors());

app.use(express.json());

app.use(morgan('dev'));

app.use(helmet());

app.get('/', (req, res) => {
	res.json({
		route: 'GET req for main route',
	});
});

app.use('/', main);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
