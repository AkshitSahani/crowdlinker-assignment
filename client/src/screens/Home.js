import React, {Component} from 'react';
// import axios from 'axios';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Articles from './Articles';
import {connect} from 'react-redux';
import * as Actions from '../actions/UserActions';

class Home extends Component {
  state = {
    screen: 'login',
    // type: 'login',
    email: '',
    password: ''
  }

  componentDidMount = () => {
    const token = localStorage.getItem('crowdlinkerUserToken');
    const firstName = localStorage.getItem('crowdlinkerUserFirstName');

    // console.log('token!!!', token, 'user name', firstName);
    if(token){
      this.setState({screen: 'articles'});
      let obj = {token};
      if(firstName){obj['firstName'] = firstName};
      this.props.setUserInfo(obj, 'persistent');
    }
  }

  renderButtonText = () => {
    if(this.props.loggedIn){
      return "Logout"
    }
    else{
      return this.state.screen === 'login' ? "Sign Up" : "Login"
    }
  }

  logoutUser = () => {
    this.props.logout();
    const keys = ['crowdlinkerUserToken', 'crowdlinkerUserFirstName'];
    keys.forEach((key) => localStorage.removeItem(key));
    this.setState({screen: 'login'});
  }

  onButtonPress = () => {
    // if(this.props.loggedIn){
    this.props.loggedIn ?
      this.logoutUser()
    // }
    // else{
    :
    this.state.screen === 'login' ? this.setState({screen: 'signup'}) : this.setState({screen: 'login'});
    // }
  }

  renderLogin = (password) => this.setState({screen: 'login', password});

  renderArticles = () => this.setState({screen: 'articles'});

  renderScreen = () => {
    switch (this.state.screen) {
      case 'login':
        return (
          <Login
            password={this.state.password}
            renderArticles={this.renderArticles}
          />
        )
      case 'signup':
        return (
          <SignUp
            renderLogin={this.renderLogin}
          />
        )
      case 'articles':
        return (
          <Articles

          />
        )
      default:
        return (
          <Login
            password={this.state.password}
          />
        )
    }
  }

  render(){
    // console.log('logged in status in home', this.props, this.props.loggedIn);
    return (
      <div className="home-container">

        <div className="welcome">
          <h4>
            Welcome {this.props.loggedIn ? this.props.firstName : null}
          </h4>

          <h1>
            ArticleLinker
          </h1>

          <button
            onClick={this.onButtonPress}
            className="btn trigger"
            >
            {this.renderButtonText()}
          </button>
        </div>

        {this.renderScreen()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state in home', state);
  return {
    loggedIn: state.userInfo.loggedIn,
    firstName: state.userInfo.user && state.userInfo.user.firstName
  }
}

export default connect(mapStateToProps, Actions)(Home);
