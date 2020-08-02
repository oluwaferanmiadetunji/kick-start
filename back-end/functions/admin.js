const admin = require('firebase-admin');
const FSA = require('./FSA.json');
const firebaseConfig = require('./config');
const firebase = require('firebase');

admin.initializeApp({
	credential: admin.credential.cert(FSA),
});

firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

module.exports = { admin, db, firebase };
