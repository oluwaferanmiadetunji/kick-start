const functions = require('firebase-functions');
const app = require('express')();

const cors = require('cors');
app.use(cors());

const { login, signup } = require('./handlers');

app.post('/signup', signup);
app.post('/login', login);
app.get('/', (req, res) => {
	return res.status(200).json({ status: 'success', message: 'Successful' });
});

exports.api = functions.region('europe-west2').https.onRequest(app);
