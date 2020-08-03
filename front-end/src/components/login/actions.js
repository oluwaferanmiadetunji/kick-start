import { TRY_REGISTER, REGISTER_LOADING } from './actionTypes';

const registerUser = (data) => ({
	type: TRY_REGISTER,
	payload: data,
});

const registerLoading = (value) => ({
	payload: value,
	type: REGISTER_LOADING,
});

export default { registerUser, registerLoading };
