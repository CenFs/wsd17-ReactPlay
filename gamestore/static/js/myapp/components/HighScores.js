import React from 'react';
import { connect } from 'react-redux';

function HighScoreList (props) {
  const HighScores = props.HighScores;
  const listItems = HighScores.map((HighScore) =>
    <li>
      {HighScore.username}: {HighScore.score}
    </li>
  );
  return (
    <ol>{listItems}</ol>
  );
}

// hard-coding test array
const highScores = [{ "name": "Jingji", "score": 1000 }, { "name": "Pauli", "score": 999 }, { "name": "Mengyang", "score": 998 }];

class HighScores extends React.Component {
  // constructor
  constructor(props) {
    super(props);
    this.state = {
        scoreList:[]
    };
  }
  
  componentWillMount() {
  }

  // fetch game state from 
  componentDidMount() {
    fetch('/api/games/'+this.props.gameId+'/analytic/',
                    {
                        credentials: 'include',
                        method:'get'
                    }
         ).then(x=>x.json())
          .then(y=>{
                    // console.log("fetching!!! " + JSON.stringify(y.info));
                    // this.props.score_list = y.info;
                    this.setState({
                      scoreList:y.info
                    });
                    // dispatch(playGame(gid,y.info));
         });
  }

  render () {
    return (
      <div className="highScores">
        <h3>HighScores</h3>
        <HighScoreList HighScores={this.props.score_list.length?this.props.score_list:this.state.scoreList} />
      </div>
    );
  }
}

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
  score_list: state.games.filter((g)=>{return g.playing})[0].scorelist
});

export default connect(mapStateToProps)(HighScores);
// export default HighScores;