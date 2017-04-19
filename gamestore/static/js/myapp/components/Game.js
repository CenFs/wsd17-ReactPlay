import React from 'react';
import Iframe from './Iframe';
import NavBar from './NavBar';
import HighScores from './HighScores';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

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

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Game);