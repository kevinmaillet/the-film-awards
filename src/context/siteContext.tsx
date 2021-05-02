import React, { createContext, useEffect, useState } from 'react';

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
  setNavOpen: (navOpen: boolean) => void;
  movies: MovieType[] | [];
  setMovies: (movies: MovieType[]) => void;
  focusMovie: MovieType | null;
  setFocusMovie: (movie: MovieType) => void;
}

const defaultSite: DefaultSiteProps = {
  navOpen: false,
  setNavOpen: () => null,
  movies: [],
  setMovies: () => null,
  focusMovie: null,
  setFocusMovie: () => null,
};

export const siteContext = createContext(defaultSite);

export const SiteProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<MovieType[] | []>([]);
  const [focusMovie, setFocusMovie] = useState<null | MovieType>(null);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('movies') !== null) {
      const storedMovies = JSON.parse(localStorage.getItem('movies')!);
      setMovies(storedMovies);
    }
  }, []);

  return (
    <siteContext.Provider
      value={{
        ...defaultSite,
        movies,
        setMovies,
        focusMovie,
        setFocusMovie,
        navOpen,
        setNavOpen,
      }}
    >
      {children}
    </siteContext.Provider>
  );
};
