import { REGISTER_USER } from './actionTypes';

const registerUser = (data) => ({
	type: REGISTER_USER,
	payload: data,
});

export default { registerUser };
