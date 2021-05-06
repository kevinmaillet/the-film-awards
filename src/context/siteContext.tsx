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

export interface otherOption {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface DefaultSiteProps {
  movies: MovieType[] | [];
  setMovies: (movies: MovieType[]) => void;
  focusMovie: MovieType | null;
  setFocusMovie: (movie: MovieType) => void;
  submittedMovies: MovieType[] | [];
  setSubmittedMovies: (movies: MovieType[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  otherOptions: otherOption[] | [];
  setOtherOptions: (movie: otherOption[]) => void;
}

const defaultSite: DefaultSiteProps = {
  movies: [],
  setMovies: () => null,
  focusMovie: null,
  setFocusMovie: () => null,
  submittedMovies: [],
  setSubmittedMovies: () => null,
  loading: false,
  setLoading: () => null,
  otherOptions: [],
  setOtherOptions: () => null,
};

export const siteContext = createContext(defaultSite);

export const SiteProvider: React.FC = ({ children }) => {
  const [movies, setMovies] = useState<MovieType[] | []>([]);
  const [focusMovie, setFocusMovie] = useState<null | MovieType>(null);
  const [submittedMovies, setSubmittedMovies] = useState<MovieType[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [otherOptions, setOtherOptions] = useState<otherOption[] | []>([]);

  //Set Submitted movies or picked nominations in state if present in local storage
  useEffect(() => {
    if (localStorage.getItem('submittedMovies') !== null) {
      const storedSubmittedMovies = JSON.parse(
        localStorage.getItem('submittedMovies')!
      );
      setSubmittedMovies(storedSubmittedMovies);
    }

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
        submittedMovies,
        setSubmittedMovies,
        loading,
        setLoading,
        otherOptions,
        setOtherOptions,
      }}
    >
      {children}
    </siteContext.Provider>
  );
};
