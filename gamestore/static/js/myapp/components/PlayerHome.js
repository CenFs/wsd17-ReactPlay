// home component for Player
import React from 'react';
import NavBar from './NavBar';
import GameList from './GameList';

class PlayerHome extends React.Component {

  // componentDidMount () {
  //   console.log(this.props)
  //   if (this.props.location.key === null) {
  //     alert('Please login first!');
  //     this.props.router.push('/store/login');
  //   }
  // }
  // combine other components
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

