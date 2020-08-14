import {put, takeLatest} from 'redux-saga/effects';
import {GET_ALL_CAMPAIGNS, SET_ALL_CAMPAIGNS} from './actionTypes';
import actions from './actions';
import factory from '../../web3/factory';

const getCampaigns = function* getCampaigns() {
	yield put(actions.set_loading(true));
	const AllCampaigns = yield factory.methods.getDeployedCampaigns().call();
	yield put({type: SET_ALL_CAMPAIGNS, payload: AllCampaigns});
	yield put(actions.set_loading(false));
};

function* campaignsSaga() {
	yield takeLatest(GET_ALL_CAMPAIGNS, getCampaigns);
}

export default campaignsSaga;
