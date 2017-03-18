/*
Action is a function which will return a json object
We will handle actions inside reducers
The fetchData action can handle async request, actually it return a function instead of an object
You need to config Middleware in other place to enable fetchData, otherwise it won't work properly
*/

// tests
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

// real cases here
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

// simple actions
export const loginPage = () => ({
    type:LOGIN
});

export const loginSuccess = (userinfo) => ({
    type:LOGIN_SUCCESS,
    data:userinfo
});

export const loginFailure = () => ({
    type:LOGIN_FAIL
});

export const logoutPage = () => ({
    type:LOGOUT
});

export const registerPage = () => ({
    type:REGISTER
});

export const registerSuccess = (userinfo) => ({
    type:REGISTER_SUCCESS,
    data:userinfo
});

export const registerFailure = () => ({
    type:REGISTER_FAIL
});

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

/* below actions are all asynchronous which need dispatch from the top component */
export const fetchData = () => dispatch => {
    dispatch(requestData());
    return fetch('/api/test')
        .then(x=>x.json())
        .then(y=>dispatch(receiveData(y)));
};

/* the procedure of login is divided into several phases
which are startLogin => fetching data => endLogin
we dispatch several actions for the login, first is loginPage, which will tell the app now we are login-ing in,
then use fetch to send a post request to Django, verify the login information,
finally when get the result, dispatch loginSuccess or loginFailure
*/
export const loginClick = formData => dispatch => {
    dispatch(loginPage());
    console.log("JSON.stringify(formData) is "+JSON.stringify(formData));
    return fetch('/api/login', {
      credentials: 'include',
      method:'post', headers: {
        'Content-Type': 'application/json'
      }, body:JSON.stringify(formData)
    })
        .then(x=>x.json())
        .then(result=>{
            console.log(result);
            if (result.status == "success")
            {
                dispatch(loginSuccess(result.userinfo));
                alert("login success!");
            }
            else
            {
                dispatch(loginFailure());
                alert(result.desc);
            }
        });
};

// register actions, the same login with login
export const registerClick = formData => dispatch => {
    dispatch(registerPage());
    console.log("JSON.stringify(formData) is "+JSON.stringify(formData));
    return fetch('/api/register', {
      credentials: 'include',
      method:'post', headers: {
        'Content-Type': 'application/json'
      }, body:JSON.stringify(formData)
    })
        .then(x=>x.json())
        .then(result=>{
            console.log(result);
            if (result.status == "success")
            {
                dispatch(registerSuccess(result.userinfo));
                alert("register success!");
            }
            else
            {
                dispatch(registerFailure());
                alert(result.desc);
            }
        });
};