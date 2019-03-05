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
      <div className="home-container">

        <div className="welcome">
          <span>
            Welcome
          </span>

          <span>
            Home
          </span>

          <button
            onClick={this.onButtonPress}
            className="toggle-signup-login"
            >
            {this.state.type === 'login' ? "Sign Up" : "Login"}
          </button>
        </div>


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
