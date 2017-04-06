import React from 'react';
import NavBar from './NavBar';
import GameList from './GameList';

class PlayerHome extends React.Component {

  render () {
    return (
      <div>
       <NavBar />
       <GameList />
       <div> Home for Player </div>
      </div>
    );
  }
}

export default PlayerHome;

