import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    userName: '',
    password: ''
  }

  onChange = (e, type) => this.setState({[type]: e.target.value});

  render(){
    return (
      <div className="login-container">
        <p>
          Login
        </p>
        <form
          onSubmit={this.onSubmit}
          className="login-form"
        >
          <label>
            Username
            <input
              // ref={input => title = input}
              name="username"
              type="text"
              placeholder="user@example.com"
              required
              value={this.state.userName}
              onChange={(e) => this.onChange(e, 'userName')}
            />
          </label>
          <label>
            Password
            <input
              // ref={input => excerpt = input}
              type="password"
              placeholder="Excerpt..."
              required
              value={this.state.password}
              onChange={(e) => this.onChange(e, 'password')}
            />
          </label>
          <button className="submit-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login;
