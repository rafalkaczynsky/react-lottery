import React from 'react';
import ReactDOM from 'react-dom';


import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer} from 'redux-form'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
  form: formReducer
})

const store = createStore(rootReducer) 


ReactDOM.render(
<Provider store={store} >
    <App 
        url='http://localhost:3001/api/users'
        pollInterval={2000}
    />
</Provider>, document.getElementById('root'));
registerServiceWorker();

