import { takeLatest, put } from 'redux-saga/effects';
import { ATTEMPT_REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from './actionTypes';

// Runs when there is an ATTEMPT_REGISTER happens
function* registerUser(action) {
	try {
		const { email, password, name, confirmPassword, gender } = action;
		const response = yield 'Testing';
		console.log(email, password, name, confirmPassword, gender);
		yield put({ type: REGISTER_SUCCESS, response });
	} catch (err) {
		yield put({ type: REGISTER_ERROR, err });
	}
}

// watched for ATTEMPT_REGISTER action type, it then calls registerUser with the action

function* registerSaga() {
	yield takeLatest(ATTEMPT_REGISTER, registerUser);
}

export default registerSaga;
