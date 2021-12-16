import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import web3 from './web3';

function App() {
  console.log(web3.version);  // 1.6.1
  web3.eth.getAccounts().then(console.log);   // ['0xe67C2DC72e00D927F127Bb7CA259F75ca7142ec8']

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
// import injected from './web3InjectedAccounts';

export default App;
