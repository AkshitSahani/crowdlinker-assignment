import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ErrorRenderer from './ErrorRenderer';

class NewArticle extends Component {

  state = {
    title: '',
    description: '',
    successMessage: '',
    error: ''
  }

  submitArticle = async(e) => {
    e.preventDefault();
    if(this.state.error.length === 1){
      this.setState({error: ''});
    }
    try{
      const {title, description} = this.state;
      const url = `${global.url}/articles`;
      const data = {title, description};
      const response = await axios({method: 'POST', url, data, headers: {Authorization: this.props.token}});
      console.log('resp from post article', response);
      this.setState({successMessage: 'Article created successfully!'});
      setTimeout(() => this.props.backToArticleList(), 1500);
    }
    catch(e){
      console.log('e in post article', e);
      console.log('full error', e.response);
      this.setState({error: e.response.data.message});
    }
  }

  onChange = (e, type) => this.setState({[type]: e.target.value});

  render(){
    console.log('in new article page', this.state.error);
    return(
      <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h3 className="article-headline">
          Publish a New Article
        </h3>

        <form
          onSubmit={this.submitArticle}
          className="login-form article-form"
        >
          <label className="article-title-label">
            <span className="article-title-text">
              Title
            </span>

            <input
              name="title"
              type="text"
              placeholder="ReactJS vs AngularJS!"
              required
              value={this.state.title}
              onChange={(e) => this.onChange(e, 'title')}
            />
          </label>

            <span className="article-desc-label">
              Description
            </span>

            <textarea
              className="new-article-desc"
              placeholder="The clear winner is React...Duh!"
              required
              value={this.state.description}
              onChange={(e) => this.onChange(e, 'description')}
            />
          <button
            className="submit-button btn trigger"
          >
            Create
          </button>
        </form>

        {
          this.state.error ?
            <ErrorRenderer
              comp={this}
            />
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

const mapStateToProps = (state) => {
  return{
    token: state.userInfo.user.token
  }
}

export default connect(mapStateToProps)(NewArticle);
