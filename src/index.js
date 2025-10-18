const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const meRouter = require('./routes/me');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (req, res) => {
	res.type('application/json').status(200).json({ status: 'ok' });
});

app.use('/me', meRouter);

app.use((req, res, next) => {
  res.status(404).json({
	success: false,
	message: 'Sorry, the resource you requested could not be found.'
	});
});

app.use((err, req, res, next) => {
	console.error('Unhandled error:', err);
	res.type('application/json').status(500).json({ error: 'Internal Server Error' });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
