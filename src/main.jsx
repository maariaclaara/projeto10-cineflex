axios.defaults.headers.common['Authorization'] = 'dqsyLkH9DHBubpqTeI3b2I7Q';

import React from 'react'
import axios from "axios";
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyle from './style/GlobalStyle.jsx'
import ResetStyle from './style/ResetStyle.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle  />
    <ResetStyle />
    <App />
  </React.StrictMode>
);
