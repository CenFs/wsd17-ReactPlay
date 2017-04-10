// Item component is really straightforward, it has one prop
// Game component has four props, 2 are functions, the other 2 are data

import React from 'react';
import Iframe from './Iframe';
import NavBar from './NavBar';
import HighScores from './HighScores'

// const Item  = ({gameName}) => (
// <li>{gameName}</li>
// );
// 
// const Game = ({name,games,fetchClick,clearClick}) => (
//     <div>
//         <button onClick={()=>fetchClick()}>Fetch</button>
//         <button onClick={()=>clearClick()}>Clear</button>
//         <ul>
//             {games.map((g,index)=><Item key={index} gameName={g} />)}
//         </ul>
//     </div>
// );

class Game extends React.Component{
    
    render() {
        return (
          <div>
            <NavBar />
            <Iframe/>
            <HighScores />
          </div>
        );
    }
};

export default Game;