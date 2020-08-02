const functions = require('firebase-functions');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const { login, signup } = require('./handlers');

app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.region('europe-west2').https.onRequest(app);
