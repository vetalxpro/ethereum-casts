import React, { Component } from 'react';
import { lottery } from './lottery';
import { web3 } from './web3';
import './App.css';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const [ manager, players, balance ] = await Promise.all([
      lottery.methods.manager().call(),
      lottery.methods.getPlayers().call(),
      web3.eth.getBalance(lottery.options.address)
    ]);
    this.setState({ manager, players, balance });
  }

  onSubmit = async ( event ) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.enter().send({
      from: accounts[ 0 ],
      value: web3.utils.toWei(this.state.value, 'ether')
    });
    this.setState({ message: 'You have benn entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.pickWinner().send({
      from: accounts[ 0 ]
    });
    this.setState({ message: 'A winner has been picker!' });
  };

  render() {
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currenty {this.state.players.length} people entered competing to
          win {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Want to try your luck?</h4>
          <div>
            <label>Amount of ether to enter</label>
            <input onChange={event => this.setState({ value: event.target.value })} type="text"
                   value={this.state.value}/>
          </div>
          <button type="submit">Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr/>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;
