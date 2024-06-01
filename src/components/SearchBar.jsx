import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log(`Searching for: ${searchTerm}`);
  };

  return (<>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button type="submit" onClick={()=>navigate(`/SearchResults/${searchTerm}`)}>Search</button>
    </form>
    <hr/>
    </>
  );
};

export default SearchBar;