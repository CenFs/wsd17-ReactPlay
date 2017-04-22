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
export const REQUEST_HIGHSCORES = 'REQUEST_HIGHSCORES';
export const UPDATE_GAMELIST = 'UPDATE_GAMELIST';

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
export const updateGamelist = (gid,list) => ({
    type:UPDATE_GAMELIST,
    gameid:gid,
    list:list
});

export const highScores = (gid,scorelist) =>({
    type:REQUEST_HIGHSCORES,
    gameid:gid,
    scorelist:scorelist
});

export const playGame = (gid) =>({
    type:PLAY_A_GAME,
    gameid:gid,
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

// playGame, fetch highscores from backend
export const fetch_playGame = (gid) => dispatch => {
    return fetch('/api/games/'+gid+'/analytic/',
                    {
                        credentials: 'include',
                        method:'get'
                    }
                )
                .then(x=>x.json())
                .then(y=>{
                    console.log("fetching!!! " + JSON.stringify(y.info));
                    dispatch(playGame(gid,y.info));
                })
                ;
}

// request the high score list for a game
export const load_highScores = (gid) => dispatch => {
    return fetch('/api/games/'+gid+'/analytic/',
                    {
                        credentials: 'include',
                        method:'get'
                    }
                )
                .then(x=>x.json())
                .then(y=>{
                    // console.log("load_highScores y "+JSON.stringify(y.info));
                    dispatch(highScores(gid,y.info));
                })
                ;
};

//
export const loadState = json => dispatch => {
    return fetch('/api/users/'+json.userId+'/games/'+json.gameId,{
                credentials: 'include',
                method:'get'})
            .then(x=>x.json())
            .then(y=>{
                // console.log("y.usergame_info "+JSON.stringify(y));
                if (!y.usergame_info.state)
                {
                    // console.log("empty state y: "+JSON.stringify(y.usergame_info.state));
                    const message = {
                        messageType: "LOAD",
                        gameState: {score: 0}
                    };
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
            console.log("score success saved!, now should update game scorelist");
            fetch('/api/games/'+json.gameId+'/analytic/',
                    {
                        credentials: 'include',
                        method:'get'
                    }
            ).then(x=>x.json())
             .then(y=>{
                    console.log("update list!!! " + JSON.stringify(y.info));
                    dispatch(updateGamelist(json.gameId,y.info));
                    // this.setState({
                    //   scoreList:y.info
                    // });
         });
        }
        else
        {
            console.log("score save fail!");
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
                  console.log("receive from backend: "+JSON.stringify(result));
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


// Handy cookie getter
// https://stackoverflow.com/questions/10730362/get-cookie-by-name#15724300
export const getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

// Handy query param getter, slighty modified
// http://stackoverflow.com/a/1099670
export const getQueryParams = (qs) => {

    if (qs[1] && qs[1] == '&'){
        qs = qs.substr(1);
    }

    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}

// Initialize payment
export const initializePayment = (game_id) => dispatch => {
    return fetch('/api/payment/initiate/', {
                credentials: 'include',
                method:'post',
                body: JSON.stringify({gameid: game_id})
            })
            .then(x=>x.json())
            .then(result=>{
                if (result.status === "failure") {
                  alert(result.desc);
                } else {
                    dispatch(executePayment(result.pid, result.sid, result.amount, result.checksum));
                }
            });
};

// Execute payment in external service
export const executePayment = (pid, sid, amount, checksum) => dispatch => {
    // Create form to send to the payment service
    var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', 'https://simplepayments.herokuapp.com/pay/');
    
    // Parameters for payment service request
    var params = {
        'csrfmiddlewaretoken': getCookie('csrftoken'),
        'pid': pid,
        'sid': sid,
        'amount': amount,
        'success_url': 'http://127.0.0.1:8000/store/player',
        'cancel_url': 'http://127.0.0.1:8000/store/player',
        'error_url': 'http://127.0.0.1:8000/store/player',
        'checksum': checksum
    };
    
    // Create form fields
    for (var key in params) {
        var field = document.createElement('input');
        field.setAttribute('type', 'hidden');
        field.setAttribute('name', key);
        field.setAttribute('value', params[key]);
        form.appendChild(field);
    }
    
    // Submit form
    document.body.appendChild(form);
    form.submit();
};

// Finalize payment
export const finalizePayment = (pid, ref, result, checksum) => dispatch => {
    return fetch('/api/payment/finalize/', {
                credentials: 'include',
                method:'post',
                body: JSON.stringify({
                    pid: pid,
                    ref: ref,
                    result: result,
                    checksum: checksum
                })
            })
            .then(x=>x.json())
            .then(result=>{
                if (result.status === "failure") {
                  alert(result.desc);
                } else {
                    dispatch(fetchGames());
                }
            });
};


  // analtics of Game
  export const analticsGame = (gameId) => dispatch => {
      return fetch('/api/games/' + gameId + '/analytic',{
                  credentials: 'include',
                  method:'get'})
              .then(x=>x.json())
              .then(result=>{
                  if (result.status === "failure") {
                    alert(result);
                    console.log("receive from backend: "+JSON.stringify(result));
                    browserHistory.push('/store/login');
                  } else if (result.status === "success") {
                    alert(JSON.stringify(result.info));
                  }
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
