import { takeLatest, put } from 'redux-saga/effects';
import { BASE_URL } from './constants';
import actions from './actions';
import { ATTEMPT_REGISTER } from './actionTypes';

// Function to register user
function* registerUser(action) {
	// make a call to the API to register the user passing the data
	console.log('Attempt to make saga call');
	console.log(action);
	const response = yield fetch(`${BASE_URL}/register`, {
		body: JSON.stringify(action.payload),
		header: { 'Content-Type': 'application/json' },
		method: 'POST',
	})
		.then((res) => res.json())
		.then((res) => {
			console.log(res);
		})
		.catch(() => {
			console.log('Error');
		});
	console.log(response);
	// stop loading
	yield put(actions.loadingReducer(false));
}

// watched for ATTEMPT_REGISTER action type, it then calls registerUser with the action

function* registerSaga() {
	yield takeLatest(ATTEMPT_REGISTER, registerUser);
}

export default registerSaga;
