import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import bagReducer from './components/reducers/bagReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(bagReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
