import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as Actions from '../actions/UserActions';
let passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
let emailRegex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i;

class SignUp extends Component {
  state = {
    loading: false,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
    successMessage: ''
  }

  onChange = (event, type) => this.setState({[type]: event.target.value});

  // validateInput = () => {
  //   const {firstName, lastName, email, password, passwordConfirmation} = this.state;
  //   if(firstName)
  //   return true
  // }

  renderErrors = () => {
    if(this.state.error.constructor === Array){
      return this.state.error.map((e) => {
        return (
          <p className="error">
            {e}
          </p>
        )
      });
    }
    return this.state.error;
  }

  onSubmit = async(event) => {
    event.preventDefault();
    try{
      // const validated = this.validateInput();
      let validated = true;
      if(validated){
        const {firstName, lastName, email, password, passwordConfirmation} = this.state;
        console.log('vars from state', firstName, lastName, email, password, passwordConfirmation);
        const url = `${global.url}/users`;
        const formData = {first_name: firstName, last_name: lastName, email, password, password_confirmation: passwordConfirmation};
        console.log(url, data)
        const response = await axios({method: "POST", data: formData, url});
        console.log('resp from signup', response);
        const {data, message} = response.data
        this.props.setUserInfo(data);
        this.setState({successMessage: message});
        setTimeout(() => this.props.renderLogin(password), 1500);
      }
    }
    catch(e){
      console.log('error in signup', e);
      console.log('full error', e.response);
      console.log(e.response.data);
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
              placeholder="********"
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
              placeholder="********"
              required
              value={this.state.passwordConfirmation}
              onChange={(e) => this.onChange(e, 'passwordConfirmation')}
            />
          </label>
            <button className="submit-button">
              Sign Up
            </button>
        </form>

        {
          this.state.error ?
            this.renderErrors()
          :
          null
        }

        {
          this.state.successMessage ?
            <p className="success-message">
              {this.state.successMessage}
            </p>
          :
          null
        }
      </div>
    )
  }
}

export default connect(null, Actions)(SignUp);
