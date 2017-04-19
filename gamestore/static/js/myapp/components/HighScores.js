import React from 'react';

function HighScoreList (props) {
  const HighScores = props.HighScores;
  const listItems = HighScores.map((HighScore) =>
    <li>
      {HighScore.name}: {HighScore.score}
    </li>
  );
  return (
    <ol>{listItems}</ol>
  );
}

// hard-coding right now
const highScores = [{ "name": "Jingji", "score": 1000 }, { "name": "Pauli", "score": 999 }, { "name": "Mengyang", "score": 998 }];

class HighScores extends React.Component {
  render () {
    return (
      <div className="highScores">
        <h3>HighScores</h3>
        <HighScoreList HighScores={highScores} />
      </div>
    );
  }
}

export default HighScores;
