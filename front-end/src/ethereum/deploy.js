const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
	'zero apart reform rack west fire ramp twist popular repair envelope short',
	'https://rinkeby.infura.io/v3/d2a41f1c86a645418e88258b7cb1c52c'
);

const web3 = new Web3(provider);

const deploy = async () => {
	const accounts = await web3.eth.getAccounts();
	console.log('Deploying from ', accounts[0]);
	const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
		.deploy({
			data: compiledFactory.bytecode,
			arguments: ['Hi there!'],
		})
		.send({ gas: '1000000', from: accounts[0] });
	console.log('Deploying to ', result.options.address);
};

deploy();
