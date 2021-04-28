import React, { useContext, useState } from 'react';
import { siteContext, MovieType } from '../context/siteContext';

interface PosterProps {
  focusMovie: MovieType;
}

const Poster: React.FC<PosterProps> = ({ focusMovie }) => {
  const { movies, setMovies } = useContext(siteContext);
  const [errors, setErrors] = useState('');

  const addToMovieList = () => {
    if (movies.length === 5) {
      setErrors("You've added 5 movies already!");
      return;
    }

    if (
      !(movies.filter((movie) => movie.Title === focusMovie.Title).length > 0)
    ) {
      setMovies([...movies, focusMovie]);
    } else {
      setErrors("You've already added this movie!");
      setTimeout(() => {
        setErrors('');
      }, 3000);
    }
  };

  return (
    <article>
      <header>
        <h1>Title: {focusMovie.Title}</h1>
        <h2>Director: {focusMovie.Director}</h2>
        <h3>Cast: {focusMovie.Actors}</h3>
        <h4>Written By: {focusMovie.Writer}</h4>
        <h5>{focusMovie.Year}</h5>
        <h6>IMDB Rating: {focusMovie.imdbRating}</h6>
      </header>
      <button onClick={addToMovieList}>Nominate</button>
      <p style={{ color: `red` }}>{errors}</p>
    </article>
  );
};

export default Poster;
