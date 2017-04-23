// Reducer is function which take the state and the action as parameters, and it return a new state base on the action
// You can write a very long single reducer, but for most of the case, we will write many reducers and combine them together
// Every reducer should be pure function! You are recommended to learn reducer more from internet, it's easy

import {REQUEST_DATA, RECEIVE_DATA, RECEIVE_GENRES, CLEAR_DATA, LOGIN, LOGIN_SUCCESS, LOGIN_FAIL,LOGOUT,
REGISTER, REGISTER_SUCCESS, REGISTER_FAIL, PLAY_A_GAME, UPDATE_GAMELIST, ANALYTICS_DATA
} from '../actions';
import { combineReducers } from 'redux';

// an array for storing genres of games
const genres = (state=[],action) => {
    switch (action.type) {
        case RECEIVE_GENRES:
            return action.genres;
        default:
            return state;
    }
}

// store the analytics data
const analytics = (state=[],action) => {
  switch (action.type) {
    case ANALYTICS_DATA:
        // console.log(action.analytics);
        return action.analytics;
    default: 
        return state;
  }
}

// games is an array of games
const games = (state=[],action) => {
    switch (action.type) {
        case RECEIVE_DATA:
            return action.games;
        case CLEAR_DATA:
            return [];
        case PLAY_A_GAME:
            let newState = JSON.parse(JSON.stringify(state));
            let gid = action.gameid;
            newState.forEach(
                g=>{
                    if (g.gameid == gid)
                    {
                        g.playing = true;
                    }
                    else
                    {
                        g.playing = false;
                    }
                }
            );
            return newState;
        case UPDATE_GAMELIST:
            let newState1 = JSON.parse(JSON.stringify(state));
            let gid1 = action.gameid;
            let list = action.list;
            console.log("updating scorelist");
            newState1.forEach(
                g=>{
                    if (g.gameid == gid1)
                    {
                        g.scorelist = list;
                    }
                }
            );
            return newState1;
        default:
            return state;
    }
};

// a loading flag, not used in this assignment, it should be consider in bigger projects
const loading = (state=false,action) => {
    switch(action.type)
    {
        case LOGIN:
            return true;
        case REGISTER:
            return true;
        case LOGIN_SUCCESS:
            return false;
        case LOGIN_FAIL:
            return false;
        case REGISTER_SUCCESS:
            return false;
        case REGISTER_FAIL:
            return false;
        default:
            return state;
    }
};

// user information is saved in the store
const user = (state={},action) => {
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            return action.data;
            break;
        case REGISTER_SUCCESS:
            return action.data;
            break;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

// combine all reducers into single reducer, and export it
const rootReducer = combineReducers({
  games,
  analytics,
  loading,
  user,
  genres
});

export default rootReducer;