import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <main className="main">
      <div className="cta">
        <h4 className="cta__medtext">Presenting</h4>
        <h4 className="cta__medtext-secondary">The</h4>
        <h2 className="cta__bigtext">2021 Shoppies</h2>
        <p className="cta__smalltext">
          Nominate your 5 favorite films for the 2021 Shoppies.
        </p>
        <Link to="/nominations">
          <button className="cta__button">Get Started!</button>
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
