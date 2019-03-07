import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NewArticle from '../components/NewArticle';

class Articles extends Component {

  state = {
    articles: null,
    view: 'listArticles'
  }

  fetchArticles = async(type) => {
    try{
      if(type === 'update'){
        this.setState({view: 'listArticles'});
      }
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

  async componentDidMount(){
    this.fetchArticles();
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
          <div
            className="article-outline"
            key={index}
          >
            <div className="article-top-half">
              <h3 className="article-title">
                {article.title}
              </h3>

              <p className="article-desc">
                {article.description}
              </p>

            </div>

            <div className="article-bottom-button">
              <button
                className={article.liked ? "like blue" : "like"}
                onClick={() => this.onLike(article.id, index)}
              >
                {article.liked ? "Liked" : "Like"}
              </button>
            </div>
          </div>
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
    // console.log('in articles', this.props.token);
    return (
      <div className="article-page">
        <div className="article-header">
          <span style={{color: 'white'}}>
            ARTICLES!!!
          </span>

          <h2>ARTICLES</h2>

          <button
            className="create-article"
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
