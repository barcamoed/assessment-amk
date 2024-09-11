/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import AppRouter from './routes/AppRouter';
import './styles/global.css';
import store from '../src/store'



ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}><AppRouter /></Provider>);
