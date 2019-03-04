import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    type: 'login',
  }

  render(){
    return (
      <div>
        <p>
          Signup
        </p>
        <form onSubmit={this.onSubmit}>
          <label>
            First Name:
            <input
              // ref={input => title = input}
              // name="username"
              type="text"
              placeholder="John"
              required
            />
          </label>
          <label>
            Last Name:
            <input
              // ref={input => title = input}
              // name="last_name"
              type="text"
              placeholder="Smith"
              required
            />
          </label>
          <label>
            Email:
            <input
              // ref={input => title = input}
              name="username"
              type="text"
              placeholder="user@example.com"
              required
            />
          </label>
          <label>
            Password:
            <input
              // ref={input => excerpt = input}
              type="text"
              placeholder="Excerpt..."
              required
            />
          </label>
          <label>
            Password Confirmation:
            <input
              // ref={input => excerpt = input}
              type="text"
              placeholder="Excerpt..."
              required
            />
          </label>
            <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default SignUp;
