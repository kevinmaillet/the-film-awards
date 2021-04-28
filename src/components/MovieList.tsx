import React, { useContext } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import Card from './Card';

const MovieList: React.FC = () => {
  const { movies } = useContext(siteContext);

  return (
    <div>
      <h2>Movie List</h2>
      {movies &&
        movies.map((movie: MovieType) => {
          return (
            <Card
              key={movie.imdbID}
              title={movie.Title}
              releaseDate={movie.Released}
            />
          );
        })}
    </div>
  );
};

export default MovieList;
