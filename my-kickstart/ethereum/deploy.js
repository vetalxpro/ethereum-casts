const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs-extra');
const path = require('path');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
  'correct deny word glance critic eight ice flee cover forest man floor',
  'https://rinkeby.infura.io/zgxSsid2wgzrInW0SulJ'
);

const web3 = new Web3(provider);
const outputFilePath = path.resolve(__dirname, 'address.txt');

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[ 0 ]);
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode, arguments: [] })
    .send({ gas: '1000000', from: accounts[ 0 ] });
  console.log('Contract deployed to ', result.options.address);


  fs.outputFileSync(outputFilePath, result.options.address);
};
deploy()
  .catch(( err ) => console.log(err));
