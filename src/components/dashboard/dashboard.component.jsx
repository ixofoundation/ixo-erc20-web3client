import React, { Component } from 'react';
import config from 'react-global-configuration';
import styled from 'styled-components';
import Web3Proxy from '../../web3/web3-proxy';
import MintInput from '../mint-input/mint-input';
import ProjectWalletInput from '../project-wallet-input/project-wallet-input';
import TransferInput from '../transfer-input/transfer-input';

const DashboardConsole = styled.div`
	background-color: lightblue;
	border: 1px solid blue;
	border-radius: 10px;
	margin: 10px;
	overflow: hidden;
`;

const ControlStrip = styled.div`
	border: 1px solid blue;
	border-radius: 5px;
	height: 40px;
	background-color: lightblue;
	margin-left: 15px;
	margin-right: 15px;
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
`;

const Button = styled.button`
	height: 25px;
	min-width: 150px;
	color: azure;
	background: blue;
	border: 3px;
	border-radius: 2.5px;
	margin: auto;
	font-size: 14px;
`;

const InputField = styled.input`
	height: 25px;
	min-width: 150px;
	color: black;
	background: lightgrey;
	border: 1px solid black;
	border-radius: 2.5px;
	margin: auto;
	font-size: 14px;
`;

const TerminalConsole = styled.div`
	border-radius: 5px;
	height: 75 0px;
	background-color: black;
	color: yellow;
	font-size: 13px;
	margin-left: 15px;
	margin-right: 15px;
	padding: 10px;
`;

const OutputLineList = styled.ul`
	list-style: none;
	padding-inline-start: 10px;
	font-family: 'Courier New';
`;

class Dashboard extends Component {
	constructor(props) {
		super(props);

		const erc20Abi = JSON.parse(config.get('erc20Abi'));
		const projectWalletAbi = JSON.parse(config.get('projectWalletAbi'));
		this.state = {
			isContractOwner: false,
			mintingTransactionQuantity: 0,
			mintingTransactionBeneficiaryAccount: '',
			transferTransactionQuantity: 0,
			transferTransactionBeneficiaryAccount: '',
			web3Proxy: new Web3Proxy(
				erc20Abi,
				config.get('ixoERC20TokenContract'),
				projectWalletAbi,
				config.get('projectWalletRegistryContract'),
				this.handleSelectionChange,
				config.get('desiredNetwork')
			),
			erc20ContractAddress: config.get('ixoERC20TokenContract'),
			authContractAddress: config.get('authContract'),
			projectDid: ''
		};
	}

	componentDidMount() {
		this.determineIfContractOwner();
	}

	handleSelectionChange = () => {
		this.determineIfContractOwner();
	};

	determineIfContractOwner = () => {
		this.state.web3Proxy.getNetwork().then(network => {
			const isContractNetwork = config.get('contractNetwork') === network;
			const isContractOwner = isContractNetwork && this.state.web3Proxy.getSelectedAccount().toUpperCase() === config.get('contractOwner').toUpperCase();
			this.setState({ isContractOwner });
		});
	};

	getDefaultAccount = () => {
		const account = this.state.web3Proxy.getDefaultAccount();
		this.props.addOutputLine(account ? account : 'not set');
	};

	setDefaultAccount = () => {
		this.state.web3Proxy.getAccounts().then(accounts => {
			const account = accounts.length > 0 ? accounts[0] : 'no account';
			this.state.web3Proxy.setDefaultAccount(account);
		});
	};

	getAccount = () => {
		this.props.addOutputLine(this.state.web3Proxy.getSelectedAccount());
	};

	getAccounts = () => {
		this.state.web3Proxy.getAccounts().then(accounts => {
			this.props.addOutputLine(JSON.stringify(accounts));
		});
	};

	getBalance = () => {
		this.state.web3Proxy.getAccounts().then(accounts => {
			const account = accounts.length > 0 ? accounts[0] : undefined;
			if (account) {
				this.state.web3Proxy
					.getBalance(account)
					.then(balance => {
						this.props.addOutputLine(`${account}: ${balance}`);
					})
					.catch(error => {
						this.props.addOutputLine(`${error}`);
					});
			}
		});
	};

	getDesiredNetwork = () => {
		this.props.addOutputLine(this.state.web3Proxy.getDefaultNetwork());
	};

	getNetwork = () => {
		this.state.web3Proxy.getNetwork().then(network => {
			this.props.addOutputLine(network);
		});
	};

	isExpectedNetwork = () => {
		this.state.web3Proxy.isDesiredNetwork().then(isExpected => {
			this.props.addOutputLine(isExpected ? 'TRUE' : 'FALSE');
		});
	};

	setMinter = () => {
		this.state.web3Proxy.getAccounts().then(accounts => {
			const mintingAddress = accounts.length > 0 ? accounts[0] : undefined;
			if (mintingAddress) {
				this.state.web3Proxy
					.setMinter(mintingAddress)
					.then(response => {
						this.props.addOutputLine(`response: ${response}`);
					})
					.catch(error => {
						this.props.addOutputLine(`error: ${error}`);
					});
			}
		});
	};

	mint = () => {
		if (this.state.mintBeneficiaryAddress) {
			this.state.web3Proxy.getAccounts().then(accounts => {
				const mintingAddress = accounts.length > 0 ? accounts[0] : undefined;
				if (mintingAddress) {
					this.state.web3Proxy
						.mintTo(mintingAddress, this.state.mintBeneficiaryAddress, this.state.transactionQuantity)
						.then(txHash => {
							this.props.addOutputLine(`TX: ${txHash}`);
						})
						.catch(error => {
							this.props.addOutputLine(`error: ${error}`);
						});
				}
			});
		}
	};

	handleMintingTransactionQuantityChange = event => {
		this.setState({ mintingTransactionQuantity: parseInt(event.target.value) });
	};

	handleMintingTransactionBeneficiaryAddressChange = event => {
		this.setState({ mintingTransactionBeneficiaryAccount: event.target.value });
	};

	handleTransferTransactionQuantityChange = event => {
		this.setState({ transferTransactionQuantity: parseInt(event.target.value) });
	};

	handleTransferTransactionBeneficiaryAddressChange = event => {
		this.setState({ transferTransactionBeneficiaryAccount: event.target.value });
	};

	handleProjectDidChange = event => {
		this.setState({ projectDid: event.target.value });
	};

	handleTokenMinting = event => {
		if (this.state.mintingTransactionBeneficiaryAccount && this.state.mintingTransactionQuantity > 0) {
			this.state.web3Proxy
				.mintTo(this.state.mintingTransactionBeneficiaryAccount, this.state.mintingTransactionQuantity)
				.then(txHash => {
					this.props.addOutputLine(`TX: ${txHash}`);
					this.setState({ mintingTransactionBeneficiaryAccount: '', mintingTransactionQuantity: 0 });
				})
				.catch(error => {
					this.props.addOutputLine(`error: ${error}`);
				});
		}
	};

	handleCreateProjectWallet = () => {
		this.state.web3Proxy
			.createWallet('0x' + new Buffer(this.state.projectDid).toString('hex'))
			.then(txHash => {
				this.props.addOutputLine(`TX: ${txHash}`);
			})
			.catch(error => {
				this.props.addOutputLine(`error: ${error}`);
			});
	};

	handleGetProjectWalletAddress = () => {
		this.state.web3Proxy
			.getProjectWallet('0x' + new Buffer(this.state.projectDid).toString('hex'))
			.then(address => {
				this.props.addOutputLine(`Project Wallet Address: ${address}`);
			})
			.catch(error => {
				this.props.addOutputLine(`${error}`);
			});
	}

	handleTokenTransfer = event => {
		if (this.state.transferTransactionBeneficiaryAccount && this.state.transferTransactionQuantity > 0) {
			this.state.web3Proxy
				.transferTo(this.state.transferTransactionBeneficiaryAccount, this.state.transferTransactionQuantity)
				.then(txHash => {
					this.props.addOutputLine(`TX: ${txHash}`);
					this.setState({ transferTransactionBeneficiaryAccount: '', transferTransactionQuantity: 0 });
				})
				.catch(error => {
					this.props.addOutputLine(`error: ${error}`);
				});
		}
	};

	clearTerminal = () => {
		this.props.clearOutputs();
	};

	render() {
		const outputLines = this.props.outputLines.map(outputLine => {
			console.log(`outputLine: ${JSON.stringify(outputLine)}`);
			return <li key={outputLine.id}>{outputLine.line}</li>;
		});

		return (
			<DashboardConsole>
				{this.state.isContractOwner && (
					<ControlStrip>
						<Button onClick={this.setMinter}>Set Minter</Button>
						<MintInput
							quantity={this.state.mintingTransactionQuantity}
							handleQuantityChange={this.handleMintingTransactionQuantityChange}
							beneficiaryAddress={this.state.mintingTransactionBeneficiaryAccount}
							handleBeneficiaryAddressChange={this.handleMintingTransactionBeneficiaryAddressChange}
							handleTokenMinting={this.handleTokenMinting}
						/>
					</ControlStrip>
				)}
				{this.state.isContractOwner && (
					<ControlStrip>
						<ProjectWalletInput
							projectDid={this.state.projectDid}
							handelProjectDidChange={this.handleProjectDidChange}
							handleCreateProjectWallet={this.handleCreateProjectWallet}
							handleGetProjectWalletAddress={this.handleGetProjectWalletAddress}
						/>
					</ControlStrip>
				)}
				<ControlStrip>
					<Button onClick={this.getAccount}>Account</Button>
					<Button onClick={this.getNetwork}>Network</Button>
					<Button onClick={this.getBalance}>Balance</Button>
				</ControlStrip>
				<ControlStrip>
					<TransferInput
						quantity={this.state.transferTransactionQuantity}
						handleQuantityChange={this.handleTransferTransactionQuantityChange}
						beneficiaryAddress={this.state.transferTransactionBeneficiaryAccount}
						handleBeneficiaryAddressChange={this.handleTransferTransactionBeneficiaryAddressChange}
						handleTokenTransfer={this.handleTokenTransfer}
					/>
				</ControlStrip>
				<TerminalConsole>
					<OutputLineList>{outputLines}</OutputLineList>
				</TerminalConsole>
				<ControlStrip style={{ border: 0 }}>
					<Button onClick={this.clearTerminal}>Clear</Button>
				</ControlStrip>
			</DashboardConsole>
		);
	}
}

export default Dashboard;
