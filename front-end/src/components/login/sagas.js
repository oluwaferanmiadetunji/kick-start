import {put, takeLatest} from 'redux-saga/effects';
import {BASE_URL} from '../../constant';
import {TRY_LOGIN, LOGIN_REQUEST_COMPLETE} from './actionTypes';
import actions from './actions';

const login = function* login(action) {
	const response = yield fetch(`${BASE_URL}/login`, {
		body: JSON.stringify(action.payload),
		header: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});
	const data = yield response.json();
	yield put({type: LOGIN_REQUEST_COMPLETE, payload: data.message});
	if (data.status === 'success') {
		localStorage.setItem('Token', data.token);
		yield put(actions.isLogged(true));
	}
	yield put(actions.loginLoading(false));
};

function* loginSaga() {
	yield takeLatest(TRY_LOGIN, login);
}

export default loginSaga;
