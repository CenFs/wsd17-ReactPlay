// Action is a function which will return a json object
// The fetchData action can handle async request, actually it return a function instead of an object
// You need to config Middleware in other place to enable fetchData, otherwise it won't work properly

// tests
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

// real cases here
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
// real actions
export const loginPage = () => ({
    type:LOGIN
});

export const logoutPage = () => ({
    type:LOGOUT
});
//

export const requestData = () => ({
    type:REQUEST_DATA
});

export const receiveData = (json) => ({
    type:RECEIVE_DATA,
    games:json.games,
    name:json.name,
    age:json.age
});

export const clearData = () => ({
    type:CLEAR_DATA
});

export const fetchData = () => dispatch => {
    dispatch(requestData());
    return fetch('/api/test')
        .then(x=>x.json())
        .then(y=>dispatch(receiveData(y)));
};