import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class NewArticle extends Component {

  state = {
    title: '',
    description: '',
    successMessage: ''
  }

  submitArticle = async(e) => {
    e.preventDefault()
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
    }
  }

  onChange = (e, type) => this.setState({[type]: e.target.value});

  render(){
    // console.log('in new article page', this.props.token);
    return(
      <div style={{width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <h2>
          Publish a New Article
        </h2>

        <form
          onSubmit={this.submitArticle}
          className="login-form article-form"
          // style={{height: 300}}
        >
          <label className="article-title-label">
            <span className="article-title-text">
              Title
            </span>

            <input
              // ref={input => title = input}
              name="title"
              type="text"
              placeholder="ReactJS vs AngularJS!"
              required
              value={this.state.title}
              onChange={(e) => this.onChange(e, 'title')}
            />
          </label>
          {/* <label> */}

            <span className="article-desc-label">
              Description
            </span>

            <textarea
              className="new-article-desc"
              // ref={input => excerpt = input}
              // type="description"
              placeholder="The clear winner is React...Duh!"
              required
              value={this.state.description}
              onChange={(e) => this.onChange(e, 'description')}
            />
          {/* </label> */}
          <button
            className="submit-button"
          >
            Create
          </button>
        </form>

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
