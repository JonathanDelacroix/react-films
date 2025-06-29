import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store/store';
import React, { StrictMode } from 'react';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
<StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
</StrictMode>
)
