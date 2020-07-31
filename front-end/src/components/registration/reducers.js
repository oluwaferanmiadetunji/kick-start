import { TOGGLE_LOADING } from './actionTypes';

const registerLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case TOGGLE_LOADING:
			return action.payload;
		default:
			return state;
	}
};

export default { registerLoadingReducer };
