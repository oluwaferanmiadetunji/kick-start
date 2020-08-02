import { REGISTER_LOADING, REGISTER_REQUEST_COMPLETE } from './actionTypes';

const registerLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case REGISTER_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const registerStatusReducer = (state = { status: false, message: '', error: {} }, action) => {
	switch (action.type) {
		case REGISTER_REQUEST_COMPLETE:
			return {
				...state,
				status: true,
				message: action.payload.message,
			};
		default:
			return state;
	}
};

export default { registerLoadingReducer, registerStatusReducer };
