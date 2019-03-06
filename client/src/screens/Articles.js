import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Articles extends Component {

  state = {
    articles: null,
  }

  async componentDidMount(){
    try{
      const url = `${global.url}/articles`;
      const response = await axios({method: "GET", url, headers: {Authorization: this.props.token}});
      console.log('response from get articles', response);
      this.setState({articles: response.data});
    }
    catch(e){
      console.log('e in getting articles', e);
      console.log('full error', e.response);
      this.setState({error: e.response.data.message});
    }
  }

  renderArticles = () => {
    if(this.state.articles.length){
      return this.state.articles.map((art) => {

      })

    }
    return (
      <p className="error">
        Sorry we couldn't find any articles! Time to create one!
      </p>
    )
  }

  render() {
    // console.log('in articles', this.props.token);
    return (
      <div className="article-container">
        <div className="article-header">
          <span>ARTICLES</span>
          <span>
            ARTICLES!!!
          </span>

          <button className="create-article">
            Create article
          </button>
        </div>

        {
          this.state.articles ?
            this.renderArticles()
          :
          null
          // spinner needs to go above instead of null
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('state in articles', state);
  return{
    token: state.userInfo.user.token
  }
}

export default connect(mapStateToProps)(Articles);
