import { REGISTER_USER } from './actionTypes';

const registerLoadingReducer = (state = false, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const register = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER:
			return {
				...state,
				response: action.payload,
			};
		default:
			return state;
	}
};

export default { registerLoadingReducer, register };
