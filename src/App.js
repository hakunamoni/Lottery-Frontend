import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import web3 from './web3';

function App() {
  console.log(web3.version);
  web3.eth.getAccounts().then(console.log);
  // web3.eth.getAccounts()
  //    returns promise
  // normally, make use of the async/await syntax, but can't use aync/await with the render method of react component.
  // for any account retrieved will be automatically pass to the function name ("console.log") in .then, so it will be logged in the console

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
