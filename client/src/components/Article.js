import React, {Component} from 'react';

class Article extends Component {

  componentDidMount(){
    const height = this.article.clientHeight;
    // console.log('height of article', height);
    this.props.finalizeArticleHeight(height);
  }

  render(){
    const {article, onLike, index} = this.props;
    return (
      <div
        className="article-outline"
        ref={(article) => this.article = article}
      >
        {/* <div className="article-top-half"> */}
          <h3 className="article-title">
            {article.title}
          </h3>

          <p className="article-desc">
            {article.description}
          </p>


        {/* <div> */}
        {/* <div className="article-bottom-button"> */}
          <button
            className={article.liked ? "like blue btn" : "like btn"}
            onClick={() => onLike(article.id, index)}
          >
            {article.liked ? "Liked" : "Like"}
          </button>
        {/* </div> */}
      </div>
    )
  }
}

export default Article;
