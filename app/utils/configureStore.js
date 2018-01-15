// @flow

// Redux Store Configuration
import {createStore, applyMiddleware} from 'redux';
import Reducer from "../data/store/DataProvider";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import loggingMiddleware from './logging';

const configureStore = (initialState ) => {
    const middleware = applyMiddleware(thunk);
  
    return createStore(Reducer, initialState, middleware);
  };

export default configureStore;
