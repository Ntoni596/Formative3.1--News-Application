import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { filters } from "./constants";
import NewsArticles from "./articles";
import { Puff } from "react-loader-spinner";
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
  const [loading, setLoading] = useState(true); // Initialize loading state

  useEffect(() => {
    let apiKey = import.meta.env.VITE_BACKUP_API_KEY;
    let apiUrl;

    const cachedArticles = localStorage.getItem("cachedArticles");
    if (cachedArticles) {
      try {
        setArticles(JSON.parse(cachedArticles));
        console.log("Cached articles:", cachedArticles);
        setLoading(false); // Set loading to false when using cached data
      } catch (error) {
        console.error("Error parsing cached data:", error);
      }
      return; // Skip the API request
    }

    if (activeFilter === null || activeFilter === 0) {
      apiUrl = `https://newsapi.org/v2/top-headlines?country=nz&apiKey=${apiKey}`;
    } else if (activeFilter === filters.length - 1) {
      apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
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
        setTimeout(() => {
          setArticles(response.data.articles);
          setLoading(false); // Set loading to false after articles are set
        }, 5000); // 5000 milliseconds = 5 seconds
      })
      .catch((error) => {
        if (error.response) {
          // The server responded with an error status code (4xx or 5xx)
          const statusCode = error.response.status;
          const responseData = error.response.data;

          if (statusCode === 429) {
            console.error(
              "Error 429: Too Many Requests - You have exceeded your rate limit."
            );
            apiKey = import.meta.env.VITE_BACKUP_API_KEY;
          } else if (statusCode === 401) {
            console.error(
              "Error 401: Unauthorized - Your API key is invalid or missing."
            );
          } else if (statusCode === 426) {
            console.error(
              "Error 426: Upgrade Required - Your API key needs to be upgraded."
            );
          } else {
            console.error(`Error ${statusCode}: ${responseData.message}`);
          }
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("Request error:", error.request);
        } else {
          // Something else happened in making the request
          console.error("Other error:", error.message);
        }
      })
      .finally(() => {
        setLoading(false); // Set loading to false when request completes (either success or error)
      });
  }, [activeFilter, searchTerm]);

  useEffect(() => {
    if (setLoading == true) {
      showFiltersAndSearch(false);
    } else setShowFiltersAndSearch(location.pathname.startsWith("/articles/0"));
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
        {loading ? (
          // Display the Loader component while loading is true
          <Puff
            ariaLabel="puff"
            color="white"
            height="100"
            width="100"
            radius={1}
            wrapperClass=""
            wrapperStyle={{}}
            visible={true}
          />
        ) : (
          // Display NewsArticles component when loading is false
          <NewsArticles articles={filteredArticles} />
        )}
      </div>
    </div>
  );
};

export default Navigation;
