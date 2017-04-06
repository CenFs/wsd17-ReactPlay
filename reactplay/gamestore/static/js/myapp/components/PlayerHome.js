import React from 'react';
import NavBar from './NavBar';
import GameList from './GameList';

class PlayerHome extends React.Component {

  render () {
    return (
      <div>
       <NavBar />
       <h1> Home for Player </h1>
       <GameList />
      </div>
    );
  }
}

export default PlayerHome;

