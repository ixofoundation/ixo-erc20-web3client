const abi = require('./IxoERC20Token.abi.json');
const environments = [
  {
    network: "ropsten",
    contract: "0x7eef79aa5bbe0aba4f5d11017ecb604cd81f1f97",
    owner: "0xb4b59c3acfeb9afd9398c88b2f6f003cbf29b553"
  },
  {
    network: "private",
    contract: "0x58250bafe2417d3c798f7a124b46ef81fbc185da",
    owner: "0xd290d694d8e085c7637f173c082b2aa4d86cd879"
  }
];

const environment = environments.find(env=>{return env.network===process.env.ETHEREUM_NETWORK});
const config = {
  abi: JSON.stringify(abi),
  desiredNetwork: environment.network,
  contractAddress: environment.contract,
  contractOwner: environment.owner
};

export default config;