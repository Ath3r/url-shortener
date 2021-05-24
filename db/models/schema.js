const yup = require('yup');

const schema = yup.object().shape({
	shortUrl: yup
		.string()
		.trim()
		.matches(/[\w\-]/i),
	url: yup.string().trim().url().required(),
});

module.exports = schema;
