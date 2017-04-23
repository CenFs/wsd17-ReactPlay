import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { loadState, saveState, saveScore} from '../actions';

class Iframe extends React.Component {

  constructor(props) {
    super(props);
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
  }
  
  componentWillMount() {
  }


  componentDidMount() {
    window.addEventListener("message", this.handleFrameTasks);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleFrameTasks);
  }

  sendToFrame(data) {
    if(this.ifr){
      this.ifr.contentWindow.postMessage(data, '*');
    }
  }

  handleFrameTasks = (e) => {
    const message = {
      messageType: "LOAD",
      gameState: {
        score: 299
      }
    }
  
    console.log(e.data);
    switch (e.data.messageType) {
      case 'LOAD_REQUEST':
        this.props.dispatch(loadState({gameId:this.props.gameId, userId:this.props.userId, frame:this.ifr}));
        break;
      case 'SAVE':
        this.props.dispatch(saveState({gameId:this.props.gameId, userId:this.props.userId, score:e.data.gameState.score, frame:this.ifr}));
        break;
      case 'SCORE':
        this.props.dispatch(saveScore({gameId:this.props.gameId, userId:this.props.userId, score:e.data.score, frame:this.ifr}));
        break;
      default:
        this.sendToFrame('some messages not handled');
    }
    
  }

  render() {
    return (
      <div className="wrapper">
        <iframe
          sandbox="allow-scripts"
          style={{ width: '100%', height:'100%', position: 'absolute', top:'0', left: '0' }}
          src={ this.props.selectedGame.url }
          ref={(f) => { this.ifr = f }}
        />
      </div>
    );
  }
}

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
  selectedGame: state.games.filter((g)=>{return g.playing})[0],
  userId: state.user.userid
});

export default connect(mapStateToProps)(Iframe);
