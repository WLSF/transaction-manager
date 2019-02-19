import React, { Component } from 'react';
import './App.css';
import PersonList from './components/Transactions/TransactionsHome';
import HeaderComponent from './components/Common/HeaderComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <PersonList />
      </div>
    );
  }
}

export default App;
