const { Router } = require('express');
const { nanoid } = require('nanoid');
const schema = require('../db/models/schema');
const router = Router();
require('dotenv').config();
const db = require('../db/database');
const urls = db.get('urls');
urls.createIndex({ shortUrl: 1 }, { unique: true });

router.post('/', async (req, res, next) => {
	let { shortUrl, url } = req.body;
	try {
		await schema.validate({
			shortUrl,
			url,
		});
		if (!shortUrl) {
			shortUrl = nanoid(5);
		} else {
			const existing = await urls.findOne({ shortUrl });
			if (existing) {
				throw new Error('Short Url in use');
			}
		}
		shortUrl = shortUrl.toLowerCase();
		const newUrl = {
			url,
			shortUrl,
		};
		await urls.insert(newUrl);
		console.log(process.env.HOST);
		res.status(201).render('main', { shortUrl, error: null });
	} catch (error) {
		console.log(error);
		return next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	const { id: shortUrl } = req.params;
	try {
		const url = await urls.findOne({ shortUrl });
		if (url) {
			return res.redirect(url.url);
		}
		res.status(404).render('404');
	} catch (error) {
		console.log(error);
		res.status(404).render('404');
	}
});

module.exports = router;
