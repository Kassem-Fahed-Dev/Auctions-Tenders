import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Store_App } from './commponts/Account/Profile/store/Store';
localStorage.setItem('status', 'فرز حسب');
localStorage.setItem('status1', 'فرز حسب');
localStorage.setItem('status2', 'فرز حسب');
localStorage.setItem('status3', 'فرز حسب');
localStorage.setItem('status4', 'فرز حسب');
localStorage.setItem('status5', 'فرز حسب');
localStorage.setItem('status6', 'فرز حسب');
localStorage.setItem('status7', 'فرز حسب');
localStorage.setItem('status8', 'فرز حسب');
localStorage.setItem('status9', 'فرز حسب');
localStorage.setItem('status10', 'فرز حسب');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store_App}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
