import { Provider } from 'react-redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { store } from './Store/Store';
import { Header } from './Components/Header';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <header>
      <Header />
    </header>
    <App />
  </Provider>
);
