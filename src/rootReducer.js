import { combineReducers } from 'redux';
import { reducers as registrationReducer } from './components/registration';

const allReducers = combineReducers({
	register: registrationReducer.registerReducer,
});

export default allReducers;
