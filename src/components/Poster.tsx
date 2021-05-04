import React, { useContext, useEffect, useState } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import StarIcon from './StarIcon';
import fallBackImage from '../images/poster-placeholder.jpeg';

interface PosterProps {
  focusMovie: MovieType;
}

const Poster: React.FC<PosterProps> = ({ focusMovie }) => {
  const { movies, setMovies, submittedMovies } = useContext(siteContext);
  const [message, setMessage] = useState('');
  const [color, setColor] = useState('');
  let timer: ReturnType<typeof setTimeout> | undefined;

  //Remove setTimeout on unmount
  useEffect(() => {
    return () => {
      clearTimeout(timer!);
      setMessage('');
      setColor('');
    };
  }, [timer]);

  const addToMovieList = () => {
    //Define the flow for messages.
    const messageFlow = (color: string, message: string) => {
      setMessage(message);
      setColor(color);

      timer = setTimeout(() => {
        setMessage('');
        setColor('');
      }, 2000);
    };

    //Error Message for Submitted Movies.
    if (submittedMovies.length !== 0) {
      messageFlow('red', "You've already submitted your nominations!");
      return;
    }

    //Error Message for Nominations of 5.
    if (movies.length === 5) {
      messageFlow('red', "You've added 5 movies already!");
      return;
    }

    //Check if movie was not submitted already.
    if (
      !(movies.filter((movie) => movie.Title === focusMovie.Title).length > 0)
    ) {
      //Set Success Message added to nominations.
      messageFlow('green', 'Movie added to Nominations!');
      setMovies([...movies, focusMovie]);
      localStorage.setItem('movies', JSON.stringify([...movies, focusMovie]));
    } else {
      //Set Error message movie already added.
      messageFlow('red', "You've already added this movie!");
    }
  };

  return (
    <>
      <article className="poster">
        <div className="poster__image">
          <img
            src={focusMovie.Poster}
            alt={focusMovie.Title}
            onError={(e: any) => {
              e.target.src = fallBackImage;
            }}
          />
        </div>
        <div className="poster__text">
          <h2 className="poster__title">{focusMovie.Title}</h2>
          <h3 className="poster__director">Director: {focusMovie.Director}</h3>
          <h3 className="poster__cast">Cast: {focusMovie.Actors}</h3>
          <div className="poster__rating">
            <StarIcon />
            <h4>IMDB Rating: {focusMovie.imdbRating}</h4>
          </div>
          <h5 className="poster__year">{focusMovie.Year}</h5>
          <div className="poster__messages">
            <p
              style={{ color: color }}
              className={`poster__message ${
                message ? 'poster__message--active' : ''
              }`}
            >
              {message}
            </p>
          </div>
          <button onClick={addToMovieList} className="poster__button">
            Nominate
          </button>
        </div>
      </article>
    </>
  );
};

export default Poster;
