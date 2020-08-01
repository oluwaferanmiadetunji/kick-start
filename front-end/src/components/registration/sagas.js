import { takeEvery } from 'redux-saga/effects';
import { BASE_URL } from './constants';
import { REGISTER_USER } from './actionTypes';

const signup = function* signup(action) {
	const response = yield fetch(`${BASE_URL}`, {
		body: JSON.stringify(action.payload),
		header: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		});
	console.log(response);
};

function* registerSaga() {
	yield takeEvery(REGISTER_USER, signup);
}

export default registerSaga;
