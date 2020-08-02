import { REGISTER_LOADING, REGISTER_REQUEST_COMPLETE } from './actionTypes';

const registerLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case REGISTER_LOADING:
			return action.payload;
		default:
			return state;
	}
};

const registerStatusReducer = (state = { status: '', message: '' }, action) => {
	switch (action.type) {
		case REGISTER_REQUEST_COMPLETE:
			return {
				...state,
				status: action.payload.status,
				message: action.payload.message,
			};
		default:
			return state;
	}
};

export default { registerLoadingReducer, registerStatusReducer };
