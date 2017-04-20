import React from 'react';
import Iframe from './Iframe';
import NavBar from './NavBar';
import HighScores from './HighScores';
import { connect } from 'react-redux';

class Game extends React.Component{
  
  componentWillMount() {
  }

    render() {
        return (
          <div>
            <NavBar />
            <Iframe gameId={this.props.params.gameId}/>
            <HighScores />
          </div>
        );
    }
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Game);