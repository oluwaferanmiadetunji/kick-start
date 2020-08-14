import {GET_ALL_CAMPAIGNS, SET_ALL_CAMPAIGNS, LOADING} from './actionTypes';

const getCampaigns = (data) => ({
	type: GET_ALL_CAMPAIGNS,
	payload: data,
});

const set_loading = (value) => ({
	type: LOADING,
	payload: value,
});

export default {getCampaigns, set_loading};
