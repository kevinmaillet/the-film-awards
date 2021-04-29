import React, { useContext } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import Card from './Card';

const MovieList: React.FC = () => {
  const { movies } = useContext(siteContext);

  return (
    <div className="movie-list">
      <h2 className="movie-list__title">Nominations ({movies.length})</h2>
      {movies &&
        movies.map((movie: MovieType) => {
          return (
            <Card
              key={movie.imdbID}
              title={movie.Title}
              releaseDate={movie.Released}
              poster={movie.Poster}
            />
          );
        })}
    </div>
  );
};

export default MovieList;
