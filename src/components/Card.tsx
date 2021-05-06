import React, { useContext, useRef } from 'react';
import { siteContext } from '../context/siteContext';
import omdb from '../api/omdb';
import fallBackImage from '../images/poster-placeholder.jpeg';

interface CardProps {
  title: string;
  poster: string;
  button: boolean;
}

const Card: React.FC<CardProps> = ({ title, poster, button }) => {
  const {
    movies,
    setMovies,
    setFocusMovie,
    otherOptions,
    setOtherOptions,
  } = useContext(siteContext);
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
  //Display Poster Movie
  const setMovieOnFocus = async (title: string) => {
    //If movie is in otherOptions state then call api to get detailed movie info
    if (otherOptions.some((movie) => movie.Title === title)) {
      const response = await omdb
        .get('/', {
          params: {
            t: title,
            type: 'movie',
          },
        })
        .then((res) => res.data)
        .catch((e) => {});

      setFocusMovie(response);
      setOtherOptions([]);
    }
    //If movie title is in movies state array then set it.
    if (movies.some((movie) => movie.Title === title)) {
      const movieToSet = movies.find((movie) => movie.Title === title);
      if (movieToSet) {
        setFocusMovie(movieToSet);
      }
    }
  };

  return (
    <article ref={cardRef} className="card">
      <header onClick={() => setMovieOnFocus(title)} className="card__header">
        <div className="card__image">
          <img
            src={poster}
            alt={title}
            onError={(e: any) => {
              e.target.src = fallBackImage;
            }}
            loading="lazy"
          ></img>
        </div>
        <h2 className="card__title">{title}</h2>
      </header>
      <div className="card__text"></div>
      {button && (
        <button className="card__button" onClick={(e) => removeMovie(title)}>
          Remove
        </button>
      )}
    </article>
  );
};

export default Card;
