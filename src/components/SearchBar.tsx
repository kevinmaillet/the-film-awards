import React, { useState, useContext, useEffect, useRef } from 'react';
import { siteContext, otherOption } from '../context/siteContext';
import omdb from '../api/omdb';
import SearchIcon from './SearchIcon';
import Card from './Card';

const SearchBar: React.FC = () => {
  const [search, setSearchBar] = useState('');
  const [errors, setErrors] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const { setFocusMovie, otherOptions, setOtherOptions } = useContext(
    siteContext
  );
  const dropDownRef = useRef<HTMLDivElement>(null);

  //Set Timer for Debouncing Api Calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        setDebouncedText(search);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  //Set drop down options for on changed search terms
  useEffect(() => {
    const getOtherOptions = async () => {
      const otherOptionsResponse = await omdb
        .get('/', {
          params: {
            s: search,
            type: 'movie',
          },
        })
        .then((res) => res.data)
        .catch((e) => {});
      if (otherOptionsResponse.Error) {
        return;
      }

      if (otherOptionsResponse.Search !== 0) {
        setOtherOptions(otherOptionsResponse.Search);
      }
    };
    if (debouncedText) {
      getOtherOptions();
    }
    // eslint-disable-next-line
  }, [debouncedText]);

  //Set up event listeners to remove dropdown if clicked outside
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
    //eslint-disable-next-line
  }, []);

  const setInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOptions([]);
    setSearchBar(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');

    const posterResponse = await omdb
      .get('/', {
        params: {
          t: search,
          type: 'movie',
        },
      })
      .then((res) => res.data)
      .catch((e) => setErrors(e));

    //API returns error for unfound movies
    if (posterResponse.Error) {
      setErrors('Movie not Found!');
      setSearchBar('');
      return;
    }

    setFocusMovie(posterResponse);

    setSearchBar('');
    setOtherOptions([]);
  };

  //Remove dropdown if clicked outside of element
  const handleClick = (e: Event) => {
    if (dropDownRef && dropDownRef.current) {
      if (!dropDownRef.current.contains(e.target as Node)) {
        setOtherOptions([]);
      }
    }
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleFormSubmit} autoComplete="off">
        <label>Search Movies</label>
        <input
          id="searchbar-input"
          value={search}
          onChange={setInput}
          type="text"
        ></input>
        {otherOptions && otherOptions.length !== 0 && (
          <div ref={dropDownRef} className="searchbar__dropdown">
            {otherOptions.map((option: otherOption) => (
              <Card
                key={option.imdbID}
                title={option.Title}
                poster={option.Poster}
                button={false}
              />
            ))}
          </div>
        )}
        <span className="searchbar__icon" onClick={handleFormSubmit}>
          <SearchIcon />
        </span>
        <div className="searchbar__error">
          <p>{errors}</p>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
