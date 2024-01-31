import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import logog from './logo.png';


const GreensphereNews = () => {
  const [articles, setArticles] = useState([]);

  const API_KEY = "0e4afaa486ce461b9fa63ffa8e04553e";

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=biodiversity&sortBy=publishedAt&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setArticles(data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const openArticle = (url) => {
    window.open(url);
  };

  return (<>      
  <Helmet>
    <meta charSet="utf-8" />
    <title>Greensphere</title>
    <link rel="icon" href= {logog} />
  </Helmet>
    <div id="root">
      
      <div className="til">
        <h1>Greensphere</h1>
        <h4>
          <i>Explore the latest articles on biodiversity and uncover the wonders of life on Earth.</i>
        </h4>
      </div>
      <div className="content">
        <main>
          <div className="cards-container container flex" id="cards-container" >
            {articles.map((article, index) => (
              <div key={index} className="card" onClick={() => openArticle(article.url)}>
                <div className="card-header">
                  <img src={article.urlToImage || 'https://via.placeholder.com/400x200'} alt="news-image" id="news-img" />
                </div>
                <div className="card-content">
                  <h3 id="news-title">{article.title}</h3>
                  <h6 className="news-source" id="news-source">
                    {`${article.source.name} · ${new Date(article.publishedAt).toLocaleString('en-US', {
                      timeZone: 'Asia/Jakarta',
                    })}`}
                  </h6>
                  <p className="news-desc" id="news-desc">
                    {article.description}
                  </p>
                  {/* <button >Read More</button> */}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div></>
  );
};

export default GreensphereNews;
