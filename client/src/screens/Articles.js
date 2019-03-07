import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import NewArticle from '../components/NewArticle';
import Article from '../components/Article';
import Spinner from '../components/Spinner';
let articleHeight = null;
let count = 0;

class Articles extends Component {

  state = {
    articles: null,
    view: 'listArticles',
    // articleHeight: null,
    count: 0,
    // loading: true,
  }

  fetchArticles = async(type) => {
    count = 0;
    articleHeight = null;
    if(this.state.articleHeight){
      this.setState({articleHeight: null});
    }
    try{
      const url = '/api/articles';
      const response = await axios({method: "GET", url, headers: {Authorization: this.props.token}});
      console.log('response from get articles', response);
      let finalState = {articles: response.data.data, loading: false};
      if(type === 'update'){
        finalState['view'] = 'listArticles';
      }
      console.log('finalState before setting', finalState);
      this.setState(finalState);
    }
    catch(e){
      console.log('e in getting articles', e);
      console.log('full error', e.response);
      this.setState({error: e.response.data.message, loading: false});
    }
  }

  async componentDidMount(){
    this.fetchArticles();
  }

  finalizeArticleHeight = async (height) => {
    count += 1;
    // console.log('count in func', count);
    // console.log(' in function', height, articleHeight);
    if(!articleHeight || articleHeight < height){
      // console.log('inside check about to set new height',height, articleHeight);
      articleHeight = height;
    }
    if(count === this.state.articles.length){
      // console.log('we inside final check');
      this.setState({articleHeight});
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

      const url = '/api/likes';
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
        const style = this.state.articleHeight ? {height: articleHeight} : {};
        return(
          <span
            className="article-parent"
            style={style}
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
    // console.log('this.state.count', this.state.count);
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
              <Spinner
                loading={this.state.loading}
                height={this.props.height}
                width={this.props.width}
              />
            }
          </div>
        }

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state in articles', state);
  return{
    token: state.userInfo.user.token,
    width: state.userInfo.width,
    height: state.userInfo.height
  }
}

export default connect(mapStateToProps)(Articles);
