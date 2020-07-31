import { ATTEMPT_REGISTER } from './actionTypes';

function registerUser({ email, password, name, confirmPassword, gender }) {
	return {
		type: ATTEMPT_REGISTER,
		email,
		password,
		name,
		confirmPassword,
		gender,
	};
}

export default { registerUser };
