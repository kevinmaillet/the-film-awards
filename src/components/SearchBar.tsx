import React, { useState, useContext } from 'react';
import { siteContext } from '../context/siteContext';
import omdb from '../api/omdb';

const SearchBar: React.FC = () => {
  const [search, setSearchBar] = useState('');
  const [errors, setErrors] = useState('');
  const { setFocusMovie } = useContext(siteContext);

  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBar(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    const response = await omdb
      .get('/', {
        params: {
          t: search,
          type: 'movie',
        },
      })
      .then((res) => res.data)
      .catch((e) => setErrors(e));

    if (response.Error) {
      setErrors('Movie not Found!');
      setSearchBar('');
      return;
    }

    setFocusMovie(response);

    setSearchBar('');
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleFormSubmit}>
        <label>Search Movies</label>
        <input
          id="searchbar-input"
          value={search}
          onChange={setInput}
          type="text"
        ></input>
      </form>
      <p style={{ color: `red` }}>{errors}</p>
    </div>
  );
};

export default SearchBar;
