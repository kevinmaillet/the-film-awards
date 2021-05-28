import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import camera from '../images/camera.png';

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet title="The Shoppies" />
      <main className="main main--homepage">
        <div className="cta">
          <div className="cta__logo">
            <img src={camera} alt="camera-icon" />
          </div>
          <h4 className="cta__medtext">Presenting</h4>
          <h4 className="cta__medtext-secondary">The 2021</h4>
          <h2 className="cta__bigtext">Film &nbsp;&nbsp;Awards</h2>
          <p className="cta__smalltext">
            Nominate your 5 favorite films for the 2021 Film Awards.
          </p>
          <Link to="/nominations">
            <button className="cta__button">Get Started!</button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;
