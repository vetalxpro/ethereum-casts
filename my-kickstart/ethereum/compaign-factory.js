import web3 from './web3';

import CampaignFactory from './build/CampaignFactory';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6ef9161412793b9b85B68b03f422DF1682a73B27');

export default instance;
