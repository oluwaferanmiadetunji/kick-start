import { all } from 'redux-saga/effects';
import { saga as RegisterSaga } from './components/registration';

export default function* rootSaga() {
	yield all([RegisterSaga()]);
}
