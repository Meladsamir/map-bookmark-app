import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { LoadingProvider } from 'react-hook-loading'
import Loader  from './components/Loader'
import { BrowserRouter as Router } from 'react-router-dom'
ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider loading={<Loader />}>
      <Router>
        <App />
      </Router>
    </LoadingProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
