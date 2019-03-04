import React, {Component} from 'react';
import axios from 'axios';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

class Home extends Component {
  state = {
    type: 'login',
  }

  onButtonPress = () => this.state.type === 'login' ? this.setState({type: 'signup'}) : this.setState({type: 'login'});

  render(){
    return (
      <div>
        <p>
          Home
        </p>

        <button onClick={this.onButtonPress}>
          {this.state.type === 'login' ? "Sign Up" : "Login"}
        </button>
        {
          this.state.type === 'login' ?
            <Login />
          :
          <SignUp />
        }
      </div>
    )
  }
}

export default Home;
