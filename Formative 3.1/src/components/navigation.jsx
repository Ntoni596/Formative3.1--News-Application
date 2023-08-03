import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { filters } from "./constants";
import NewsArticles from "./articles";

const Navigation = () => {
  const pages = [
    {
      id: 0,
      name: "Articles",
      link: "/articles",
    },
    {
      id: 1,
      name: "About The Developer",
      link: "/about",
    },
  ];

  const location = useLocation();

  const [showFiltersAndSearch, setShowFiltersAndSearch] = useState(false);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_NEWS_API_KEY;
    let apiUrl;

    if (activeFilter === null || activeFilter === 0) {
      apiUrl = `https://newsapi.org/v2/top-headlines?country=nz&apiKey=${apiKey}`;
    } else if (activeFilter === filters.length - 1) {
      apiUrl = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    } else {
      const category = filters[activeFilter].name.toLowerCase();
      apiUrl = `https://newsapi.org/v2/top-headlines?country=nz&category=${category}&apiKey=${apiKey}`;
    }

    if (searchTerm) {
      apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`;
    }

    axios
      .get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((err) => {
        console.error("Error Fetching Data:", err);
      });
  }, [activeFilter, searchTerm]);

  useEffect(() => {
    setShowFiltersAndSearch(location.pathname.startsWith("/articles/0"));
  }, [location]);

  useEffect(() => {
    let filtered = articles;

    if (searchTerm !== "") {
      filtered = articles.filter((article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredArticles(filtered);
  }, [articles, searchTerm]);

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  console.log("filteredArticles:", filteredArticles);
  return (
    <div id="outer-content">
      <div className="sidebar">
        <h1 className="heading">Welcome to NewsRoom</h1>
        <ul>
          {pages.map((item) => (
            <li key={item.id}>
              <Link to={`/articles/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div>
          <hr />
          <div
            className={`filter-box ${
              showFiltersAndSearch ? "filter-box-active" : ""
            }`}>
            <input
              id="search"
              type="text"
              placeholder="Enter a search term"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {filters.map((item) => (
              <button
                className="filter-btn"
                key={item.id}
                onClick={() => handleFilterClick(item.id)}>
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`article-box ${
          showFiltersAndSearch ? "article-box-active" : ""
        }`}>
        <NewsArticles articles={filteredArticles} />
      </div>
    </div>
  );
};

export default Navigation;
