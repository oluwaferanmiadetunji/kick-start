import web3 from './web3';
import CampaignFactory from '../ethereum/build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), '0xbB292423aaACEFfa1B145308fC6eC171c779c66d');

export default instance;
