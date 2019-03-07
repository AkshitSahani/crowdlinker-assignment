import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NewArticle from '../components/NewArticle';
import Article from '../components/Article';
import Spinner from '../components/Spinner';

class Articles extends Component {

  state = {
    articles: null,
    view: 'listArticles',
    articleHeight: null,
    loading: true
  }

  fetchArticles = async(type) => {
    try{
      if(type === 'update'){
        this.setState({view: 'listArticles'});
      }
      const url = `${global.url}/articles`;
      const response = await axios({method: "GET", url, headers: {Authorization: this.props.token}});
      console.log('response from get articles', response);
      this.setState({articles: response.data.data});
    }
    catch(e){
      console.log('e in getting articles', e);
      console.log('full error', e.response);
      this.setState({error: e.response.data.message});
    }
  }

  async componentDidMount(){
    this.fetchArticles();
  }

  finalizeArticleHeight = (height) => {
    if(!this.state.articleHeight || this.state.articleHeight < height){
      this.setState({articleHeight: height});
    }
  }

  backToArticleList = () => this.fetchArticles('update');

  onLike = async (id, index) => {
    try{
      const articles = [...this.state.articles];
      console.log('articles', articles);
      const newItem = {...articles[index], liked: !articles[index].liked};
      console.log('new item', newItem);
      const newArticles = [...articles.slice(0, index), newItem, ...articles.slice(index+1)];
      this.setState({articles: newArticles});

      const url = `${global.url}/likes`;
      const data = {article_id: id};
      const response = await axios({method: 'POST', url, data, headers: {Authorization: this.props.token}});
      console.log('resp from like', response);
    }
    catch(e){
      console.log('e in liking', e);
      console.log('full error', e.response);
    }
  }

  onClick = () => this.state.view === 'listArticles' ? this.setState({view: 'newArticle'}) : this.setState({view: 'listArticles'});

  renderArticles = () => {
    if(this.state.articles.length){
      return this.state.articles.map((article, index) => {
        return(
          <span
            className="article-parent"
            style={{height: this.state.articleHeight}}
            key={index}
          >
            <Article
              article={article}
              index={index}
              onLike={this.onLike}
              finalizeArticleHeight={this.finalizeArticleHeight}
            />
          </span>
        )
      })

    }
    return (
      <p className="error">
        Sorry we couldn't find any articles! Time to create one!
      </p>
    )
  }

  render() {
    return (
      <div className="article-page">
        <div className="article-header">
          <h2>ARTICLES</h2>

          <span style={{color: 'white'}}>
            ARTICLES!!!
          </span>


          <button
            className="btn trigger"
            onClick={this.onClick}
          >
            {
              this.state.view === 'listArticles' ?
                'Create article'
              :
              'Back'
            }
          </button>
        </div>

        {
          this.state.view === 'newArticle' ?
            <NewArticle
              backToArticleList={this.backToArticleList}
            />
          :
          <div className="article-container">

            {
              this.state.articles ?
                this.renderArticles()
              :
              null
              // spinner needs to go above instead of null
            }
          </div>
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
