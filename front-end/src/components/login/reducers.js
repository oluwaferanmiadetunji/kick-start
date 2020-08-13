import {LOGIN_LOADING, LOGIN_REQUEST_COMPLETE, USER_AUTHENTICATED, SET_NAME} from './actionTypes';

const loginLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case LOGIN_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const loginMessageReducer = (state = '', action) => {
	switch (action.type) {
		case LOGIN_REQUEST_COMPLETE:
			return action.payload;
		default:
			return state;
	}
};

const nameReducer = (state = '', action) => {
	switch (action.type) {
		case SET_NAME:
			return action.payload;
		default:
			return state;
	}
};

const authReducer = (state = false, action) => {
	switch (action.type) {
		case USER_AUTHENTICATED:
			return action.payload;
		default:
			return state;
	}
};

export default {loginLoadingReducer, loginMessageReducer, authReducer, nameReducer};
