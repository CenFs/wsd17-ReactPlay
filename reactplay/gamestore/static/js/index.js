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
import Register from './myapp/components/Register';
import reducer from './myapp/reducers';
import thunk from 'redux-thunk';
import { Router, Route, browserHistory} from 'react-router';
//import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

//const history = createHistory();

const middleware = [ thunk ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

render(
    <Provider store={store}>
        <Router history={browserHistory}>
             <Route path="/store" component={Main} />
             <Route path="/store/login" component={Login} />
             <Route path="/store/register" component={Register} />
        </Router>
    </Provider>
    ,document.getElementById('top')
);

// <Route path="/store/login" component={Login}></Route>
// <Route exact path="/" component={Main}/>
// <Route path="/login" component={Login}/>

//            <Route path="/" component={Main}>
//                <Route path="/login" component={Login}> </Route>
//            </Route>