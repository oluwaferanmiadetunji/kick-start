import { combineReducers } from 'redux';
import { reducers as registrationReducer } from './components/registration';

const allReducers = combineReducers({
	registerLoading: registrationReducer.registerLoadingReducer,
});

export default allReducers;
