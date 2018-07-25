import React, { Component } from 'react';
import './App.css';
import Table from './tables/table';

class App extends Component {
  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <h1 className="App-title">Clngrous Dashboard</h1>
        </header>
        <Table />
      </div>
    );
  }
}

export default App;
