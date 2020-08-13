import {combineReducers} from 'redux';
import {reducers as registrationReducer} from './components/registration';
import {reducers as loginReducer} from './components/login';

const allReducers = combineReducers({
	registerLoading: registrationReducer.registerLoadingReducer,
	registerStatus: registrationReducer.registerStatusReducer,
	registerMessage: registrationReducer.registerMessageReducer,
	loginLoading: loginReducer.loginLoadingReducer,
	loginMessage: loginReducer.loginMessageReducer,
	isUserLoggedIn: loginReducer.authReducer,
	name: loginReducer.nameReducer,
});

export default allReducers;
