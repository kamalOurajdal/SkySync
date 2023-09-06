import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import TestMap from './components/TestMap';
//import Hello from './components/Hello';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
    // <TestMap/>
);
