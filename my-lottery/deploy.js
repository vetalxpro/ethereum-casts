const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'correct deny word glance critic eight ice flee cover forest man floor',
  'https://rinkeby.infura.io/zgxSsid2wgzrInW0SulJ'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[ 0 ]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [] })
    .send({ gas: '1000000', from: accounts[ 0 ] });
  console.log(interface);
  console.log('Contract deployed to ', result.options.address);
};
deploy()
  .catch(( err ) => console.log(err));
