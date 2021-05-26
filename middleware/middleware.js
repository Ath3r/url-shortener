//Route not found handler
const notFound = (req, res, next) => {
	res.render('404');
};

//All routes error handler

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
	const statusCode = res.statusCode !== 200 ? 500 : res.statusCode;
	res
		.status(statusCode)
		.render('main', { error: error.message, shortUrl: null });
};

module.exports = {
	notFound,
	errorHandler,
};
