import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router'

import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form'

import './index.css';
import Root from './Root';


const rootReducer = combineReducers({
  form: formReducer
})

const store = createStore(rootReducer) 


ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)







