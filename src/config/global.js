const erc20Abi = require('./IxoERC20Token.abi.json');
const projectWalletAbi = require('./ProjectWalletRegistry.abi.json');
const environments = [{
		network: 'ropsten',
		ixoERC20TokenContract: '0x24cc742b89ba0f113e368571cb10107a0c27023d',
		projectWalletRegistryContract: '0x9b1c7a77e5227fd17b4bb5fa73557ec14a1fc266',
		authContract: '0xc29b8374e89c7d4506eff559140394ebb619bea2',
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