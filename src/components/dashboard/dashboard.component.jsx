import React, { Component } from 'react';
import config from 'react-global-configuration';
import styled from 'styled-components';
import Web3Proxy from '../../web3/web3-proxy';

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
  height: 75  0px;
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
  font-family: "Courier New";
`;

class Dashboard extends Component {

  constructor (props) {
    super(props);

    const abi = JSON.parse(config.get('abi'));
    this.state = {
      isContractOwner: false,
      quantityToMint: 0,
      accountToMintTo: '',
      web3Proxy: new Web3Proxy(abi, config.get('contractAddress'), this.handleSelectionChange, config.get('desiredNetwork'))
    }
  }

  componentDidMount() {
    this.determineIfContractOwner();
  }

  handleSelectionChange = () => {
    this.determineIfContractOwner();
  }

  determineIfContractOwner = () => {
    this.state.web3Proxy.getNetwork().then(network=>{
      const isContractNetwork = config.get('contractNetwork') === network;
      const isContractOwner = isContractNetwork && this.state.web3Proxy.getSelectedAccount().toUpperCase() === config.get('contractOwner').toUpperCase();      
      this.setState({ isContractOwner });
    });
  }

  getDefaultAccount = () => {
    const account = this.state.web3Proxy.getDefaultAccount();
    this.props.addOutputLine(account?account:"not set");
  }

  setDefaultAccount = () => {
    this.state.web3Proxy.getAccounts().then(accounts=>{
      const account = (accounts.length > 0)?accounts[0]:"no account";
      this.state.web3Proxy.setDefaultAccount(account);
    });
  }

  getAccount = () => {
    this.props.addOutputLine(this.state.web3Proxy.getSelectedAccount());
  }

  getAccounts = () => {
    this.state.web3Proxy.getAccounts().then(accounts=>{
      this.props.addOutputLine(JSON.stringify(accounts));  
    });
  }

  getBalance = () => {
    this.state.web3Proxy.getAccounts()
    .then(accounts=>{
      const account = (accounts.length > 0)?accounts[0]:undefined;
      if (account) {
        this.state.web3Proxy.getBalance(account)
        .then(balance=>{
          this.props.addOutputLine(`${account}: ${balance}`);
        })
        .catch(error=>{
          this.props.addOutputLine(`${error}`);
        })
      }
    });
  }

  getDesiredNetwork = () => {
    this.props.addOutputLine(this.state.web3Proxy.getDefaultNetwork());
  }

  getNetwork = () => {
    this.state.web3Proxy.getNetwork().then(network=>{
      this.props.addOutputLine(network);
    }) 
  }

  isExpectedNetwork = () => {
    this.state.web3Proxy.isDesiredNetwork().then(isExpected=>{
      this.props.addOutputLine(isExpected?"TRUE":"FALSE");
    })
  }

//   transfer = () => {
//     this.state.web3Proxy.getAccounts().then(accounts=>{
//       const sendingAddress = (accounts.length > 0)?accounts[0]:undefined;
//       if (sendingAddress) {
// the beneficiaryAddress global config does not exist anymore        
//         this.state.web3Proxy.transferTo(sendingAddress, config.get('beneficiaryAddress'), this.state.quantityToMint)
//         .then(txHash=>{
//           this.props.addOutputLine(`TX: ${txHash}`);
//         })
//         .catch(error=>{
//           this.props.addOutputLine(`error: ${error}`);
//         })
//       } 
//     });
//   }

  setMinter = () => {
    this.state.web3Proxy.getAccounts().then(accounts=>{
      const mintingAddress = (accounts.length > 0)?accounts[0]:undefined;
      if (mintingAddress) {
        this.state.web3Proxy.setMinter(mintingAddress)
        .then(response=>{
          this.props.addOutputLine(`response: ${response}`);
        })
        .catch(error=>{
          this.props.addOutputLine(`error: ${error}`);
        })
      } 
    });
  }

  mint = () => {
    if (this.state.accountToMintTo) {
      this.state.web3Proxy.getAccounts().then(accounts=>{
        const mintingAddress = (accounts.length > 0)?accounts[0]:undefined;
        if (mintingAddress) {
          this.state.web3Proxy.mintTo(mintingAddress, this.state.accountToMintTo, this.state.quantityToMint)
          .then(txHash=>{
            this.props.addOutputLine(`TX: ${txHash}`);
          })
          .catch(error=>{
            this.props.addOutputLine(`error: ${error}`);
          })
        } 
      });
      }
  }

  handleMintQuantityChange = (event) => {
    this.setState({quantityToMint: event.target.value});
  }

  handleAccountToMintToChange = (event) => {
    this.setState({accountToMintTo: event.target.value});
  }

  clearTerminal = () => {
    this.props.clearOutputs();
  }

  render() {

    const outputLines = this.props.outputLines.map((outputLine)=>{
      console.log(`outputLine: ${JSON.stringify(outputLine)}`);
      return (
        <li key={outputLine.id}>
          {outputLine.line}
        </li>
      );
    });

    return (
      <DashboardConsole>
        {this.state.isContractOwner&&<ControlStrip>
          <Button onClick={this.setMinter}>Set Minter</Button>
          <InputField type={"number"} value={this.state.quantityToMint} onChange={this.handleMintQuantityChange} step={1000} min={0} />
          <Button onClick={this.mint}>Mint To</Button>
          <InputField value={this.state.accountToMintTo} onChange={this.handleAccountToMintToChange} />
        </ControlStrip>}
        <ControlStrip>        
          <Button onClick={this.getAccount}>Account</Button>
          <Button onClick={this.getNetwork}>Network</Button>
          <Button onClick={this.getBalance}>Balance</Button>
        </ControlStrip>
        <TerminalConsole>
          <OutputLineList>
            {outputLines}
          </OutputLineList>
        </TerminalConsole>
        <ControlStrip style={{border: 0}}>
          <Button onClick={this.clearTerminal}>Clear</Button>
        </ControlStrip>
      </DashboardConsole>
    );
  }
}

export default Dashboard;