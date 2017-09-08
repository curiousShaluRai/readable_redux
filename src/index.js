import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { createStore, applyMiddleware, compose } from 'redux';
//when we don't export any function then we can import reducer from reducers  file.
import reducer from './reducers';
// In App, we want to get all the data from database,Since Redux only supports the synchronous flow of data, we can use thunk middleware to asynchronously produce the HTTP request for this fetch action.
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

// In order to create a store, we pass a reducer function to Redux’s createStore() method as the first argument.
// What’s returned from createStore() is the store itself.
//  we pass the redux_devtools_extension as second arguments,it means if the redux devtools extension lives on our window
// object, then go ahead and invoked that.
// so we can use redux devtools.
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
// const store = createStore(reducer);
// console.log(store.getState());

const logger = store => next => action => {
   console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// middleware …a third-party extension point between dispatching an action, and the moment it reaches the reducer.
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger),
    applyMiddleware(thunk)
  )
);


// Provider used,because whenever any of the components that app renders, or app itself needs access to redux store
// or needs to dispatch an action,will be able to more easily do that.
ReactDOM.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>,
 document.getElementById('root'));
registerServiceWorker();
