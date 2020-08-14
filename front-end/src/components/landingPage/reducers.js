import {SET_ALL_CAMPAIGNS, LOADING} from './actionTypes';

const campaignLoadingReducer = (state = false, action) => {
	switch (action.type) {
		case LOADING:
			return action.payload;
		default:
			return state;
	}
};

const campaignReducer = (state = [], action) => {
	switch (action.type) {
		case SET_ALL_CAMPAIGNS:
			return action.payload;
		default:
			return state;
	}
};

export default {campaignLoadingReducer, campaignReducer};
