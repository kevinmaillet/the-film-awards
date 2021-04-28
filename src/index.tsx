import React from 'react';
import ReactDOM from 'react-dom';
import { SiteProvider } from './context/siteContext';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
