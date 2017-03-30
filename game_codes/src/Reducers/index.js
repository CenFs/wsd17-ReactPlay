import { START_SPIN, END_SPIN, RESET } from '../Actions';
// import { combineReducers } from 'redux';

const initialState = {
    spinning:false,
    degree:0,
    result:-1,
    prizeText:[
        // "Virkistävät kahvit tarjoaa Nets",
        // "Voit valita käyttöösi Nets- tuotteen ilman avausmaksua",
        // "Voitit 3 kuukaudeksi maksupäätteen käyttöösi",
        // "Saat maksupäätteen ilman avausmaksua",
        // "Voitit kuittirullalaatikon",
    ]
};

const rootReducer = (state=initialState,action) => {
    switch(action.type)
    {
        case START_SPIN:
            return Object.assign({}, state, {spinning:true,degree:1500+Math.floor(Math.random()*500)});
        case END_SPIN:
            // (Math.random()*100)
            return Object.assign({}, state, {spinning:false,result:10-Math.floor((state.degree%360)/36)});
        case RESET:
            return Object.assign({}, state, {spinning:false,degree:0,result:-1});
        default:
            return state;
    }
};

// const spinning = (state=false,action) => {
//     switch (action.type)
//     {
//         case START_SPIN:
//             return true;
//         case END_SPIN:
//             return false;
//         default:
//             return state;
//     }
// };

// const degree = (state=0,action) => {
//     switch (action.type)
//     {
//         case START_SPIN:
//             500+Math.floor(Math.random()*500)
//         case END_SPIN:

//         case RESET:

//         default:
//             return state;
//     }
// };

// const result = (state=0,action) => {
//     switch (action.type)
//     {
//         case END_SPIN:
//             return 500+Math.floor(Math.random()*500);
//         case RESET:
//             return 0;
//         default:
//             return state;
//     }
// };


// const rootReducer = combineReducers({
//     spinning,
//     result
// });

export default rootReducer;