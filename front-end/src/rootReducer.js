import { combineReducers } from 'redux';
import { reducers as registrationReducer } from './components/registration';

const allReducers = combineReducers({
	registerLoading: registrationReducer.registerLoadingReducer,
	registerStatus: registrationReducer.registerStatusReducer,
});

export default allReducers;
