import { put, takeLatest } from 'redux-saga/effects';
import { BASE_URL } from '../../constant';
import { TRY_REGISTER, REGISTER_REQUEST_COMPLETE } from './actionTypes';
import actions from './actions';

const signup = function* signup(action) {
	const response = yield fetch(`${BASE_URL}/signup`, {
		body: JSON.stringify(action.payload),
		header: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const data = yield response.json();
	yield put({ type: REGISTER_REQUEST_COMPLETE, payload: data });
	yield put(actions.registerLoading(false));
};

function* registerSaga() {
	yield takeLatest(TRY_REGISTER, signup);
}

export default registerSaga;
