import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      const response = await axios.get(`http://localhost:8080/api/retired-users/search?expertise=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search expertise..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
};

export default SearchBar;
