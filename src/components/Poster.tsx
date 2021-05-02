import React, { useContext, useState } from 'react';
import { siteContext, MovieType } from '../context/siteContext';
import fallBackImage from '../images/poster-placeholder.jpeg';

interface PosterProps {
  focusMovie: MovieType;
}

const Poster: React.FC<PosterProps> = ({ focusMovie }) => {
  const { movies, setMovies, submittedMovies } = useContext(siteContext);
  const [errors, setErrors] = useState('');

  const addToMovieList = () => {
    if (submittedMovies.length !== 0) {
      setErrors("You've already submitted your nominations!");
      return;
    }

    if (movies.length === 5) {
      setErrors("You've added 5 movies already!");
      return;
    }

    if (
      !(movies.filter((movie) => movie.Title === focusMovie.Title).length > 0)
    ) {
      setMovies([...movies, focusMovie]);
      localStorage.setItem('movies', JSON.stringify([...movies, focusMovie]));
    } else {
      setErrors("You've already added this movie!");
      setTimeout(() => {
        setErrors('');
      }, 3000);
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
          <h3>Director: {focusMovie.Director}</h3>
          <h3 className="poster__cast">Cast: {focusMovie.Actors}</h3>
          <h4 className="poster__rating">
            IMDB Rating: {focusMovie.imdbRating}
          </h4>
          <h5>{focusMovie.Year}</h5>
          <button onClick={addToMovieList} className="poster__button">
            Nominate
          </button>
          <p className="poster__error">{errors}</p>
        </div>
      </article>
    </>
  );
};

export default Poster;
