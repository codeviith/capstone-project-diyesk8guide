import React from 'react';
import ReactDOM from 'react-dom/client';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import 'katex/dist/katex.min.css';  // code to import KaTex styles (for displaying formulas properly in guru response)
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

