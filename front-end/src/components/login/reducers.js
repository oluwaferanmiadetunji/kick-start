import { REGISTER_LOADING, REGISTER_REQUEST_COMPLETE } from './actionTypes';

const registerLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case REGISTER_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const registerStatusReducer = (state = '', action) => {
	switch (action.type) {
		case REGISTER_REQUEST_COMPLETE:
			return action.payload.status;
		default:
			return state;
	}
};

const registerMessageReducer = (state = '', action) => {
	switch (action.type) {
		case REGISTER_REQUEST_COMPLETE:
			return action.payload.message;
		default:
			return state;
	}
};

export default { registerLoadingReducer, registerStatusReducer, registerMessageReducer };
