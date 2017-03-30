import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducer from './Reducers';
import App from './Components/App';
import thunk from 'redux-thunk';

const middleware = [ thunk ];

const store = createStore(
    reducer,
    applyMiddleware(...middleware)
    );

render(
<Provider store={store}>
    <App/>
</Provider>
,document.getElementById('root'));