import web3 from './web3';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0x0bcE6DDd5F042c5226E7B6Bc5e5E13011660a018');

export default instance;
