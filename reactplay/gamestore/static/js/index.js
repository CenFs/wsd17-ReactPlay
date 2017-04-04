/* This file is the entry of the whole frontEnd app (see webpack.config.js)
It give a middleware thunk which enables the async operations in Redux
The store is created and injected into the app
*/
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Main from './myapp/components/Main';
import Login from './myapp/components/Login';
//import LoginPage from './myapp/containers/LoginPage';
import Register from './myapp/components/Register';
import reducer from './myapp/reducers';
import thunk from 'redux-thunk';
import Game from './myapp/components/Game'
import DevHome from './myapp/components/DevHome'
import PlayerHome from './myapp/components/PlayerHome'
import NoMatch from './myapp/components/NoMatch.js'

import { Router, Route, browserHistory } from 'react-router';
//import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

//const history = createHistory();

const middleware = [ thunk ];

// use createStore from Redux to create the store for the app, reducer is required
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

// render all react components into div#top
render(
    <Provider store={store}>
        <Router history={browserHistory}>
             <Route path="/store" component={Main} />
             <Route path="/store/login" component={Login} />
             <Route path="/store/register" component={Register} />
             <Route path="/store/game" component={Game} />
             <Route path="/store/player" component={PlayerHome} />
             <Route path="/store/developer" component={DevHome} />
             <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>
    ,document.getElementById('top')
);