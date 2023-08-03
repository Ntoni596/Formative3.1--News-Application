import React from "react";

const NewsArticles = ({ articles }) => {
  if (!articles) {
    console.log("Articles not available yet");
    return null;
  }
  return (
    <div id="content">
      <h2>You Are Viewing News Articles</h2>
      <div className="articles-list">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <img src={article.urlToImage}></img>
            <h3>{article.title}</h3>
            <p>{article.description}</p>

            <a className="button" href={article.url}>
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsArticles;
