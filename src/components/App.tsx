import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';
import SearchBar from './SearchBar';
import Poster from './Poster';
import MovieList from './MovieList';
import '../styles/main.scss';

const App: React.FC = () => {
  const { movies, focusMovie } = useContext(siteContext);
  console.log(movies);

  return (
    <main className="main">
      <SearchBar />
      {focusMovie && <Poster focusMovie={focusMovie} />}
      {movies.length !== 0 && <MovieList />}
    </main>
  );
};

export default App;
