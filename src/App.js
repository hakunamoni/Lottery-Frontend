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
    balance: '',   // balance is not actually a number, it's actually an object, it's a number that is wrapped in the library called "bignumber.js"
    value: ''     //this is similar to balance, but in this case, it's string owing to the text input is going to be empty string
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

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

        <form>
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
