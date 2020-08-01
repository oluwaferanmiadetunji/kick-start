const { admin, db } = require('./admin');

const firebaseConfig = require('./config');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

exports.signup = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		name: req.body.name,
		phone: req.body.phone,
		gender: req.body.gender,
	};

	let token, userId;
	db.doc(`/users/${newUser.email}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({
					email: 'This email is already taken',
				});
			} else {
				return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				name: newUser.name,
				email: newUser.email,
				gender: newUser.gender,
				phone: newUser.phone,
				createdAt: new Date().toISOString(),
				userId,
			};
			return db.doc(`/users/${newUser.email}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({
				token: token,
				message: 'User created successfully',
			});
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({
					email: 'Email is already in use',
				});
			} else {
				return res.status(500).json({
					general: 'Something went wrong! Please try again',
				});
			}
		});
};

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token });
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
				return res.status(400).json({
					general: 'Wrong credentials! Please, try again',
				});
			} else {
				return res.status(500).json({
					general: 'Something went wrong! Please try again',
				});
			}
		});
};
