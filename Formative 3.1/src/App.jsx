import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navigation";
import NewsArticles from "./components/articles";
import About from "./components/about";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/articles/:id" element={<NewsArticles />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NewsArticles />} />
      </Routes>
    </Router>
  );
};
export default App;
