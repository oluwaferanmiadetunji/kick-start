import { ATTEMPT_REGISTER, REGISTER_ERROR, REGISTER_SUCCESS } from './actionTypes';

const registerReducer = (state = { loading: false, successful: false, errors: [], messages: [] }, action) => {
	switch (action.type) {
		case ATTEMPT_REGISTER:
			return {
				loading: true,
				successful: false,
				message: 'Signing up...',
				errors: [],
			};
		case REGISTER_SUCCESS:
			return {
				loading: false,
				successful: true,
				message: 'Account registered',
				errors: [],
			};
		case REGISTER_ERROR:
			return {
				loading: false,
				successful: false,
				message: 'Account not registered',
				errors: [],
			};
		default:
			return state;
	}
};

export default { registerReducer };
