const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const router = express.Router();

const {
	EMAIL,
	NAME,
	STACK,
	CATFACT_TIMEOUT_MS,
	BASE_URL
} = process.env;


const userEmail = EMAIL;
const userName = NAME;
const userStack = STACK;

const http = axios.create({
	baseURL: BASE_URL,
	timeout: Number(CATFACT_TIMEOUT_MS || 5000),
});

router.get('/', async (req, res) => {

	try {

	const timestamp = new Date().toISOString();

	let factText = null;
	try {
		const response = await http.get('/fact', {
			headers: { 'Accept': 'application/json' },
		});
		if (response && response.data && typeof response.data.fact === 'string') {
			factText = response.data.fact;
		}
	} catch (error) {
		console.error('Cat Facts API error:', error.message);
	}

	if (!factText) {
		factText = 'Could not fetch a cat fact at this time.';
	}

	const payload = {
		status: 'success',
		user: {
			email: userEmail,
			name: userName,
			stack: userStack,
		},
		timestamp,
		fact: factText,
	};

	return res.type('application/json').status(200).json(payload);
} catch (err) {
	return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
}
});

module.exports = router;
