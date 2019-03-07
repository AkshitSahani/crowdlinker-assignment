import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import * as Actions from '../actions/UserActions';

class Login extends Component {
  state = {
    email: this.props.signedUp ? this.props.user.email : '',
    password: this.props.signedUp ? this.props.password : '',
    error: ''
  }

  onChange = (e, type) => this.setState({[type]: e.target.value});

  login = async(e) => {
    e.preventDefault();
    // this.setState({error: ''});
    try{
      const url = `${global.url}/login`;
      const {email, password} = this.state;
      const formData = {email, password};
      console.log('body before post', formData);
      const response = await axios({method: "POST", url, data: formData});
      console.log('resp from login', response);
      const {data} = response.data;
      console.log('data from login', data);
      const token = data['auth_token'];
      delete data.auth_token;
      data['token'] = token;
      const firstName = data['first_name'];
      data['firstName'] = firstName;
      delete data.first_name;
      localStorage.setItem('crowdlinkerUserToken', token);
      localStorage.setItem('crowdlinkerUserFirstName', firstName);
      this.props.loginUser(data);
      this.props.renderArticles();
    }
    catch(e) {
      console.log('e in login', e);
      console.log('full error', e.response);
      this.setState({error: e.response.data.message});
    }
  }

  render(){
    return (
      <div className="login-container">
        <h2>
          Login
        </h2>
        <form
          onSubmit={this.login}
          className="login-form"
        >
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
          <button className="submit-button">
            Login
          </button>
        </form>

        {
          this.state.error ?
            <p className="error">
              {this.state.error}
            </p>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {user, signedUp} = state.userInfo;
  return {
    user,
    signedUp
  }
}

export default connect(mapStateToProps, Actions)(Login);
