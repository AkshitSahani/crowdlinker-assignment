import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './screens/Home';
// const UrlContext = React.createContext('http://localhost:3001');
import {Provider} from 'react-redux';
import store from './reduxStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <Home />
      </div>
      </Provider>
    );
  }
}

export default App;
