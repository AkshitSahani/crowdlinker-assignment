import React, {Component} from 'react';

class Article extends Component {

  state = {
    height: 0,
  }

  componentDidMount(){
    const height = this.article.clientHeight;
    console.log('height of article', height);
    this.props.finalizeArticleHeight(height);
  }

  render(){
    const {article, onLike, index, articleHeight} = this.props;
    console.log('articleHeight from props', articleHeight);
    return (
      <div
        className="article-outline"
        ref={(article) => this.article = article}
        // style={{height: articleHeight,}}
        // style={{flex:1, padding: 15, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between'}}
      >
        {/* <div> */}
        <div className="article-top-half">
          <h3 className="article-title">
            {article.title}
          </h3>

          <p className="article-desc">
            {article.description}
          </p>

        </div>

        {/* <div> */}
        <div className="article-bottom-button">
          <button
            className={article.liked ? "like blue btn" : "like btn"}
            onClick={() => onLike(article.id, index)}
          >
            {article.liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>
    )
  }
}

export default Article;
