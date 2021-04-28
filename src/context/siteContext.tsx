import React, { createContext, useState } from 'react';

interface Ratings {
  Source: string;
  Value: string;
}

export interface MovieType {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Ratings[];
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface DefaultSiteProps {
  navOpen: boolean;
  movies: MovieType[] | [];
  setMovies: (movies: MovieType[]) => void;
  focusMovie: MovieType | null;
  setFocusMovie: (movie: MovieType) => void;
}

const defaultSite: DefaultSiteProps = {
  navOpen: false,
  movies: [],
  setMovies: () => null,
  focusMovie: null,
  setFocusMovie: () => null,
};

export const siteContext = createContext(defaultSite);

export const SiteProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<MovieType[] | []>([]);
  const [focusMovie, setFocusMovie] = useState<MovieType | null>(null);

  return (
    <siteContext.Provider
      value={{ ...defaultSite, movies, setMovies, focusMovie, setFocusMovie }}
    >
      {children}
    </siteContext.Provider>
  );
};
