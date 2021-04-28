import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';

interface CardProps {
  title: string;
  releaseDate: string;
}

const Card: React.FC<CardProps> = ({ title, releaseDate }) => {
  const { movies, setMovies } = useContext(siteContext);

  const removeMovie = (title: string) => {
    console.log(title);
    const newMovies = movies.filter((movie) => movie.Title !== title);
    setMovies(newMovies);
  };

  return (
    <article>
      <header>
        <h2>{title}</h2>
      </header>
      <h4>{releaseDate}</h4>
      <button onClick={() => removeMovie(title)}>Remove</button>
    </article>
  );
};

export default Card;
