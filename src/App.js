import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import reducers from './reducers';
import ReduxPromise from 'redux-promise';
import Dashboard from './components/dashboard/index'; 
import InstallMetaMask from './components/install-metamask/install-metamask-component';
import globalConfig from 'react-global-configuration';
import config from './config/global';
globalConfig.set(config);

const store = createStore(
    reducers,
    applyMiddleware(logger, ReduxPromise)
);

class App extends Component {

  render() {
    const { web3 } = window;
    return web3?(<Dashboard/>):(<InstallMetaMask/>);
    // return (<div><h1>{process.env.ETHEREUM_NETWORK}</h1></div>)
  }
}
export default App;

const wrapper = document.getElementById("app-root");
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : false;