const erc20Abi = require('./IxoERC20Token.abi.json');
const projectWalletAbi = require('./ProjectWalletFactory.abi.json');
const environments = [
	{
		network: 'ropsten',
		tokenContract: '0xe26d76587209cb1c7bd4c44ac23382b0c1ad69fc',
		projectWalletContract: '0x47222edd16c3a345748f0dd2acbbd282bdff6052',
		owner: '0x647CD1829Ad0FF896640FCd3a29cF6Af0dE10A83'
	},
	{
		network: 'private',
		tokenContract: '0xc2fb2a5543024a67d58c078403ba95d3ff54b1ed',
		projectWalletContract: '0x47222edd16c3a345748f0dd2acbbd282bdff6052',
		owner: '0xA8ede9207268dA9ea4502C0ce7fdb405CcE2170A'
	}
];

const environment = environments.find(env => {
	return env.network === process.env.ETHEREUM_NETWORK;
});
const config = {
	erc20Abi: JSON.stringify(erc20Abi),
	projectWalletAbi: JSON.stringify(projectWalletAbi),
	contractNetwork: environment.network,
	tokenContractAddress: environment.tokenContract,
	projectWalletContractAddress: environment.projectWalletContract,
	contractOwner: environment.owner
};

export default config;
