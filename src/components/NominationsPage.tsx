import React, { useContext, useEffect } from 'react';
import { siteContext } from '../context/siteContext';
import SearchBar from './SearchBar';
import Poster from './Poster';
import MovieList from './MovieList';

const NominationsPage: React.FC = () => {
  const { movies, focusMovie, setFocusMovie } = useContext(siteContext);

  useEffect(() => {
    return () => {
      setFocusMovie(null!);
    };
  }, [setFocusMovie]);

  return (
    <main className="main">
      <SearchBar />
      {focusMovie && <Poster focusMovie={focusMovie} />}
      {movies.length !== 0 && <MovieList />}
    </main>
  );
};

export default NominationsPage;
