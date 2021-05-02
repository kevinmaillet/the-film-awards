import React, { useContext, useEffect, useState } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import Card from './Card';
import CheckMark from './CheckMark';
import moment from 'moment';

const MovieList: React.FC = () => {
  const {
    movies,
    setSubmittedMovies,
    submittedMovies,
    setLoading,
    loading,
  } = useContext(siteContext);
  const [submittedDate, setSubmittedDate] = useState('');

  useEffect(() => {
    if (localStorage.getItem('submittedMovieDate') !== null) {
      setSubmittedDate(JSON.parse(localStorage.getItem('submittedMovieDate')!));
    }
  }, [submittedMovies]);

  const submitMovies = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    const date = new Date();
    setSubmittedMovies(movies);
    localStorage.setItem('submittedMovies', JSON.stringify(movies));
    localStorage.setItem('submittedMovieDate', JSON.stringify(date));
  };

  return (
    <div
      className={`movie-list ${
        submittedMovies.length !== 0 ? 'movie-list--submitted' : ''
      }`}
    >
      <h2 className="movie-list__title">
        Nominations (
        {submittedMovies.length !== 0 ? 'Submitted' : movies.length})
      </h2>
      <div style={{ display: `flex`, justifyContent: `space-between` }}>
        {submittedDate && `Submitted ${moment(submittedDate).fromNow()}`}
        {loading && <CheckMark />}
      </div>
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
      {movies.length === 5 && (
        <form onSubmit={(e) => submitMovies(e)}>
          <button className="movie-list__button">Submit Nominations</button>
        </form>
      )}
    </div>
  );
};

export default MovieList;
