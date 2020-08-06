const {db, firebase} = require('./admin');

exports.signup = (req, res) => {
	const request = JSON.parse(req.body);
	const newUser = {
		email: request.email,
		password: request.password,
		name: request.name,
		phone: request.phone,
		gender: request.gender,
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
				status: 'success',
				token,
				message: 'User created successfully',
			});
		})
		.catch((err) => {
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({status: 'error', message: 'Email is already in use'});
			} else {
				return res.status(500).json({status: 'error', message: 'Something went wrong! Please try again'});
			}
		});
};

exports.login = (req, res) => {
	const request = JSON.parse(req.body);
	const user = {
		email: request.email,
		password: request.password,
	};

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.status(200).json({status: 'success', token, message: 'User logged in'});
		})
		.catch((err) => {
			if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
				return res.status(400).json({status: 'error', message: 'Wrong credentials! Please, try again'});
			} else {
				return res.status(500).json({status: 'error', message: 'Something went wrong! Please try again'});
			}
		});
};
