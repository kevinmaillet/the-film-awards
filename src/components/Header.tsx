import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { siteContext } from '../context/siteContext';

const Header: React.FC = () => {
  const { movies, setNavOpen, navOpen } = useContext(siteContext);

  return (
    <header className="header">
      <Link to="/">
        <h1 className="header__logo">The Shoppies</h1>
      </Link>
      <Link to="/nominations">
        <h2 className="header__nominations">Nominations ({movies.length})</h2>
      </Link>
    </header>
  );
};

export default Header;
