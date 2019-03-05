import React, {Component} from 'react';
import axios from 'axios';

class SignUp extends Component {
  state = {
    loading: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  onChange = (event, type) => this.setState({[type]: event.target.value});

  validateInput = () => {

  }

  onSubmit = async(event) => {
    event.preventDefault();
    try{
      this.validateInput();

      const {firstName, lastName, email, password} = this.state;
      const url = `${global.url}/users`;
      const data = { first_name: firstName, last_name: lastName, email, password};
      console.log(url, data)
      const response = await axios({method: "POST", data, url});
      console.log('resp from signup', response);
    }
    catch(e){
      console.log('error in signup', e);
      console.log('full error', e.response);
    }
  }

  render(){
    return (
      <div className="signup-container">

        <form
          onSubmit={this.onSubmit}
          className="signup-form"
        >
          <p>
            Sign Up
          </p>

          <label>
            First Name
            <input
              // ref={input => title = input}
              // name="username"
              type="text"
              placeholder="John"
              required
              value={this.state.firstName}
              onChange={(e) => this.onChange(e, 'firstName')}
            />
          </label>
          <label>
            Last Name
            <input
              // ref={input => title = input}
              // name="last_name"
              type="text"
              placeholder="Smith"
              required
              value={this.state.lastName}
              onChange={(e) => this.onChange(e, 'lastName')}
            />
          </label>
          <label>
            Email
            <input
              // ref={input => title = input}
              name="username"
              type="text"
              placeholder="user@example.com"
              required
              value={this.state.email}
              onChange={(e) => this.onChange(e, 'email')}
            />
          </label>
          <label>
            Password
            <input
              // ref={input => excerpt = input}
              type="password"
              // placeholder=""
              required
              value={this.state.password}
              onChange={(e) => this.onChange(e, 'password')}
            />
          </label>
          <label>
            Password Confirmation
            <input
              className="confirmation-input"
              // ref={input => excerpt = input}
              type="password"
              // placeholder="Excerpt..."
              required
              value={this.state.passwordConfirmation}
              onChange={(e) => this.onChange(e, 'passwordConfirmation')}
            />
          </label>
            <button className="submit-button">
              Sign Up
            </button>
        </form>
      </div>
    )
  }
}

export default SignUp;
