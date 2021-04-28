import React, { useState, useContext } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import omdb from '../api/omdb';

const SearchBar: React.FC = () => {
  const [search, setSearchBar] = useState('');
  const [errors, setErrors] = useState('');
  const { movies, setMovies, setFocusMovie } = useContext(siteContext);

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
      .catch((e) => setErrors(e.message));

    if (response.Error) {
      setErrors('Movie not Found!');
      setSearchBar('');
      return;
    }

    setFocusMovie(response);

    setSearchBar('');
  };

  return (
    <div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <label>Search</label>
        <input
          value={search}
          onChange={(e) => setSearchBar(e.target.value)}
          type="text"
        ></input>
      </form>
      <p style={{ color: `red` }}>{errors}</p>
    </div>
  );
};

export default SearchBar;
