import React, { useContext, useRef } from 'react';
import { siteContext } from '../context/siteContext';

interface CardProps {
  title: string;
  releaseDate: string;
  poster: string;
}

const Card: React.FC<CardProps> = ({ title, poster }) => {
  const { movies, setMovies, setFocusMovie } = useContext(siteContext);
  const cardRef = useRef<HTMLDivElement>(null);

  const removeMovie = (title: string) => {
    //Add Animation for removed Card
    if (cardRef && cardRef.current) {
      cardRef.current.classList.add('fadeOutAnimation');
    }
    //Delay removal from dom .5s to show animation.
    setTimeout(() => {
      const newMovies = movies.filter((movie) => movie.Title !== title);
      setMovies(newMovies);
      localStorage.setItem('movies', JSON.stringify(newMovies));
    }, 500);
  };

  const setMovieOnFocus = async (title: string) => {
    const movieToSet = movies.find((movie) => movie.Title === title);

    if (movieToSet) {
      setFocusMovie(movieToSet);
    }
  };

  return (
    <article ref={cardRef} className="card">
      <header onClick={() => setMovieOnFocus(title)} className="card__header">
        <div className="card__image">
          <img src={poster} alt={title}></img>
        </div>
        <h2 className="card__title">{title}</h2>
      </header>
      <div className="card__text"></div>
      <button className="card__button" onClick={(e) => removeMovie(title)}>
        Remove
      </button>
    </article>
  );
};

export default Card;
