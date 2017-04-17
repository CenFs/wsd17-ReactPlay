import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom'
import { loadState, saveState } from '../actions';

class Iframe extends React.Component {

  constructor(props) {
    super(props);
    this.handleFrameTasks = this.handleFrameTasks.bind(this);
    // console.log("gameId is "+this.props.gameId);
  }

  componentDidMount() {
    // this.ifr.onload = () => {
    //   this.ifr.contentWindow.postMessage('hello', '*');
    // };
    window.addEventListener("message", this.handleFrameTasks);
  }

  // componentWillReceiveProps(nextProps) {
  //   for (const [objectid, liveData] of Object.entries(nextProps.objectsLive)) {
  //     const prevOn = this.props.objectsLive[objectid] ? this.props.objectsLive[objectid].on : null;
  //     if (prevOn !== liveData.on) {
  //       this.ifr.contentWindow.postMessage({ event: 'onoff', object: objectid, value: liveData.on }, '*');
  //     }
  //   }
  // }

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
        // console.log('postMessage to iframe');
        // shoud dispatch an action which fetch data from back-end, change the state
        this.props.dispatch(loadState({gameId:this.props.gameId, userId:this.props.userId, frame:this.ifr}));
        // window.postMessage(message,'*');
        // this.sendToFrame( message );
        break;
      case 'SAVE':
        // console.log('save score...')
        this.props.dispatch(saveState({gameId:this.props.gameId, userId:this.props.userId, score:e.data.gameState.score, frame:this.ifr}));
        // this.sendToFrame('the score is saved');
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
          src="https://www.students.tut.fi/~chenm/index.html"
          ref={(f) => { this.ifr = f }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId:2,
  userId:2
});

export default connect(mapStateToProps)(Iframe);
// export default Iframe;