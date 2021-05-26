const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { errorHandler, notFound } = require('./middleware/middleware');
const main = require('./api/main');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors());

app.use(morgan('dev'));

app.use(helmet());

app.get('/url', (req, res) => {
	res.status(200).render('main', { shortUrl: null, error: null });
});

app.use('/url', main);

app.use(notFound);
app.use(errorHandler);

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
