import { all } from 'redux-saga/effects';
import { saga as RegisterSaga } from './components/registration';
import { saga as loginSaga } from './components/login';

export default function* rootSaga() {
	yield all([RegisterSaga(), loginSaga()]);
}
