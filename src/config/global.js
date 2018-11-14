const erc20Abi = require('./IxoERC20Token.abi.json');
const projectWalletAbi = require('./ProjectWalletRegistry.abi.json');
const environments = [{
		network: 'ropsten',
		ixoERC20TokenContract: '0xa3ff536d68969b3d152269d8c084071b2c7bf040',
		projectWalletRegistryContract: '0xd4a2e6d5bbc8255138cf47b622a5eee64cf89de6',
		authContract: '0x74cd3ed60ea64c1a9beac11aba52487d86c1a110',
		owner: '0x647CD1829Ad0FF896640FCd3a29cF6Af0dE10A83'
	},
	{
		network: 'private',
		ixoERC20TokenContract: '0xdcc9aaf02565239319cff15b287ca35d3e3ed32e',
		projectWalletRegistryContract: '0x9459b4effe8372c8d8d724fd8b2ba74ed4f461e7',
		authContract: '0x73ecaaf61d041438ab36cb24f71c868cc03a173b',
		owner: '0x3E6a6940d6DAdC10820e7f7735E343A3160b0374'
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