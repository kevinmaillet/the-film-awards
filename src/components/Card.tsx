import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';

interface CardProps {
  title: string;
  releaseDate: string;
  poster: string;
}

const Card: React.FC<CardProps> = ({ title, releaseDate, poster }) => {
  const { movies, setMovies, setFocusMovie } = useContext(siteContext);

  const removeMovie = (title: string) => {
    console.log(title);
    const newMovies = movies.filter((movie) => movie.Title !== title);
    setMovies(newMovies);
  };

  const setMovieOnFocus = async (title: string) => {
    const movieToSet = movies.find((movie) => movie.Title === title);

    if (movieToSet) {
      setFocusMovie(movieToSet);
    }
  };

  return (
    <article className="card">
      <header onClick={() => setMovieOnFocus(title)} className="card__header">
        <div className="card__image">
          <img src={poster} alt={title}></img>
        </div>
        <h2 className="card__title">{title}</h2>
      </header>
      <div className="card__text"></div>
      <button className="card__button" onClick={() => removeMovie(title)}>
        Remove
      </button>
    </article>
  );
};

export default Card;
