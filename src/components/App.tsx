import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './HomePage';
import NominationsPage from './NominationsPage';
import '../styles/main.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/nominations" component={NominationsPage} />
      </Switch>
    </Router>
  );
};

export default App;
