/*
Action is a function which will return a json object
We will handle actions inside reducers
The fetchData action can handle async request, actually it return a function instead of an object
You need to config Middleware in other place to enable fetchData, otherwise it won't work properly
*/

// polyfill for unsupported browsers (e.g. safari)
import 'whatwg-fetch';
import { browserHistory } from 'react-router';

// games
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const LOAD_STATE = 'LOAD_STATE';
export const SAVE_STATE = 'SAVE_STATE';

// genres
export const RECEIVE_GENRES = 'RECEIVE_GENRES';

// real cases here
export const LOGIN = 'LOGIN';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';

export const PLAY_A_GAME = 'PLAY_A_GAME';

// simple actions
export const playGame = (gid) =>({
    type:PLAY_A_GAME,
    gameid:gid
});

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
    games:json.games
});

export const clearData = () => ({
    type:CLEAR_DATA
});

export const receiveGenres = (json) => ({
    type: RECEIVE_GENRES,
    genres:json.genres
});

//
export const loadState = json => dispatch => {
    return fetch('/api/users/'+json.userId+'/games/'+json.gameId,{
                credentials: 'include',
                method:'get'})
            .then(x=>x.json())
            .then(y=>{
                console.log("y.usergame_info "+JSON.stringify(y));
                if (!y.usergame_info.state)
                {
                    console.log("empty state y: "+JSON.stringify(y.usergame_info.state));
                    const message = {
                        messageType: "LOAD",
                        gameState: {score: 0}
                    };
                    // window.postMessage(message,"*");
                    json.frame.contentWindow.postMessage(message, '*');
                }
                else
                {
                    console.log("y.state is "+y.usergame_info.state);
                    const message = {
                        messageType: "LOAD",
                        gameState: JSON.parse(y.usergame_info.state)
                    };
                    json.frame.contentWindow.postMessage(message, '*');
                }
            })
    ;
};

export const saveState = json => dispatch => {
    return fetch('/api/users/'+json.userId+'/games/'+json.gameId+'/',{
      credentials: 'include',
      method:'post',
      headers:
      {
        'Content-Type': 'application/json'
      }, 
      // body:JSON.stringify({'score':json.score})
      body:JSON.stringify({"state":JSON.stringify({score:json.score})})
    })
    .then(x=>x.json())
    .then(result=>{
        console.log(result);
        if (result.status === "success")
        {
            console.log("success saved!");
        }
        else
        {
            console.log("fail saved!");
        }
    })
    ;
};

// save score
export const saveScore = json => dispatch => {
    return fetch('/api/users/'+json.userId+'/games/'+json.gameId+'/',{
      credentials: 'include',
      method:'post',
      headers:
      {
        'Content-Type': 'application/json'
      }, 
      // body:JSON.stringify({'score':json.score})
      body:JSON.stringify({"score":json.score})
    })
    .then(x=>x.json())
    .then(result=>{
        console.log(result);
        if (result.status === "success")
        {
            console.log("success saved!");
        }
        else
        {
            console.log("fail saved!");
        }
    })
    ;
};

// fetch all games
export const fetchGames = () => dispatch => {
    return fetch('/api/games',{
                credentials: 'include',
                method:'get'})
            .then(x=>x.json())
            .then(result=>{
                if (result.status === "failure") {
                  alert("Please login first!");
                  browserHistory.push('/store/login');
                } else if (result.status === "success") {
                  dispatch(receiveData({games:result.gamelist}));
                }
            });
};

// fetch genres
export const fetchGenres = () => dispatch => {
    return fetch('/api/genres')
            .then(x=>x.json())
            .then(y=>dispatch(receiveGenres({genres:y.genrelist})));
};

// send new game to backend
export const addGame = (game_name, game_desc, genre_id, game_price, game_url) => dispatch => {
    return fetch('/api/games/', {
                credentials: 'include',
                method:'post',
                body: JSON.stringify({
                    gamename: game_name,
                    description: game_desc,
                    genreid: genre_id,
                    price: game_price,
                    url: game_url
                })
            })
            .then(x=>x.json())
            .then(result=>{
                if (result.status === "failure") {
                  alert(result.desc);
                }
                dispatch(fetchGames());
            });
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
            if (result.status === "success")
            {
                dispatch(loginSuccess(result.userinfo));
                if (result.userinfo.role === 'UserDeveloper'){
                  browserHistory.push('/store/developer');
                } else if (result.userinfo.role === 'UserPlayer') {
                  browserHistory.push('/store/player');
                }
                // alert("login success!");
            }
            else
            {
                dispatch(loginFailure());
                // alert(result.desc);
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
            if (result.status === "success")
            {
                dispatch(registerSuccess(result.userinfo));
                browserHistory.push('/store/login');
                alert("register success!");
            }
            else
            {
                dispatch(registerFailure());
                alert(result.desc);
            }
        });
};


export const logoutClick = () => dispatch => {
    dispatch(logoutPage());
    console.log('logout');
    return fetch('/api/logout', {
      credentials: 'include',
      method:'post', headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(x=>x.json())
        .then(result=>{
            console.log(result);
            if (result.status === "success")
            {
                // dispatch(logoutSuccess(result.userinfo));
                browserHistory.push('/store/login');
                // alert("logout success!");
            }
            else
            {
                // dispatch(loginFailure());
                // alert(result.desc);
            }
        });
};
