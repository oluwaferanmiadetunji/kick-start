import { ATTEMPT_REGISTER, TOGGLE_LOADING } from './actionTypes';

const registerUser = (data) => {
	return {
		type: ATTEMPT_REGISTER,
		payload: data,
	};
};

const loadingReducer = (value) => ({
	payload: value,
	type: TOGGLE_LOADING,
});

export default { registerUser, loadingReducer };
