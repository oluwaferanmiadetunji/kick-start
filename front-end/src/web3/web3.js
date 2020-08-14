import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
	web3 = new Web3(window.web3.currentProvider);
} else {
	const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/d2a41f1c86a645418e88258b7cb1c52c');
	web3 = new Web3(provider);
}

export default web3;
