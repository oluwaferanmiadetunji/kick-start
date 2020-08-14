import web3 from './web3';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0x3f3fECd0d22Dd051dB0f22FC7FAB39dd80f9830f');

export default instance;
