import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';
import SearchBar from './SearchBar';
import Poster from './Poster';
import MovieList from './MovieList';

const App: React.FC = () => {
  const { movies, focusMovie } = useContext(siteContext);
  console.log(movies);

  return (
    <div className="App">
      <SearchBar />
      {focusMovie && <Poster focusMovie={focusMovie} />}
      <MovieList />
    </div>
  );
};

export default App;
