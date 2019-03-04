import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
  state = {
    type: 'login',
  }

  render(){
    return (
      <div>
        <p>
          Login
        </p>
        <form onSubmit={this.onSubmit}>
          <label>
            Username:
            <input
              // ref={input => title = input}
              name="username"
              type="text"
              placeholder="user@example.com" required
            />
          </label>
          <label>
            Password:
            <input
              // ref={input => excerpt = input}
              type="text"
              placeholder="Excerpt..." required
            />
          </label>
            <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default Login;
