import { Component } from 'react'; 
import React from 'react'; 
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount() {
    // whenever making call() in javascript react world that uses the provider from web3, 
    // don't have to make use of "from" property that specify which account is sending transaction
    // that is true with call()
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  // onSubmit() {
  // }
  // when make use of any event handler with react, worry about the context ("this") of the function
  // traditionally, did such calling "<form onSubmit={this.onSubmit.bind(this)}>"
  // with the version of "Babel" (that is running inside the create-react-app start pack), don't manually binding the function
  // rather than using above syntax ("onSubmit() {}"), use the following syntax
  // onSubmit = () => {};
  // important thing, don't worry about using "this" inside of the function 
  // the value of "this" will be automatically set to be equal to the component
  onSubmit = async (event) => {
    // whenever onSubmit gets called, it will be called with an "event" object and that "event" represents the form submission
  
    event.preventDefault();
    // make sure the form does not attempt to submit itself in the classic HTML

    // send transaction
    // for sending transaction, it's not true to not specify the "from" property
    // it should retrieve list of accounts from the web3 object 
    // and specify the account that's used to send money over to that particular function that exists on the contract
    const accounts = await web3.eth.getAccounts();
    
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager}.
          There are currently {this.state.players.length} people entered,
          competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>
        
        <hr />

        <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input 
              value={this.state.value}
              onChange={ event => this.setState({ value: event.target.value })} 
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );  
  }
}

export default App;
