// store.js

import { createStore } from 'redux';
import reducer from './reducer'; // Corrected path

// const store = createStore(reducer);
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
