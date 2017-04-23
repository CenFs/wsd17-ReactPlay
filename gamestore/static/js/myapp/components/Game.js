import React from 'react';
import Iframe from './Iframe';
import NavBar from './NavBar';
import HighScores from './HighScores';
import { connect } from 'react-redux';

class Game extends React.Component{
  
  componentWillMount() {
  }

  // game component consists of Iframe and HighScores
  render() {
      return (
        <div>
          <NavBar />
          <Iframe gameId={this.props.params.gameId}/>
          <HighScores gameId={this.props.params.gameId}/>
        </div>
      );
  }
};

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Game);