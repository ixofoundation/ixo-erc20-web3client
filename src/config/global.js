const erc20Abi = require('./IxoERC20Token.abi.json');
const projectWalletAbi = require('./ProjectWalletRegistry.abi.json');
const environments = [{
		network: 'ropsten',
		ixoERC20TokenContract: '0x827a41c26784e0f51081e6d26687bff9c1c667e6',
		projectWalletRegistryContract: '0xfe45b990a1dd890adfac13b0a9c77758cc83a862',
		authContract: '0x9b79db40c5cec3ccb7401dc1e21eb5c65e7033c9',
		owner: '0xb4B59C3aCFeB9AFd9398C88B2f6f003cBf29B553'
	},
	{
		network: 'private',
		tokenContract: '0x827a41c26784e0f51081e6d26687bff9c1c667e6',
		projectWalletRegistryContract: '0xfe45b990a1dd890adfac13b0a9c77758cc83a862',
		authContract: '0x9b79db40c5cec3ccb7401dc1e21eb5c65e7033c9',
		owner: '0xb4B59C3aCFeB9AFd9398C88B2f6f003cBf29B553'
	}
];

const environment = environments.find(env => {
	return env.network === process.env.ETHEREUM_NETWORK;
});
const config = {
	erc20Abi: JSON.stringify(erc20Abi),
	projectWalletAbi: JSON.stringify(projectWalletAbi),
	contractNetwork: environment.network,
	ixoERC20TokenContract: environment.ixoERC20TokenContract,
	projectWalletRegistryContract: environment.projectWalletRegistryContract,
	authContract: environment.authContract,
	contractOwner: environment.owner
};

export default config;