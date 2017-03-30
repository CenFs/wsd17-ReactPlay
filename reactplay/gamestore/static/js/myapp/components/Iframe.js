import React from 'react';
import { connect } from 'react-redux';

class Iframe extends React.Component {
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
    if(this.ifr) this.ifr.contentWindow.postMessage(data, '*');
  }

  handleFrameTasks = (e) => {
    const message = {
      messageType: "LOAD",
      gameState: {
        score: 10
      }
    }
    
    console.log(e.data)
    switch (e.data.messageType) {
      case 'LOAD_REQUEST':
        console.log('postMessage to iframe')
        this.sendToFrame( message );
        break;
      case 'SAVE':
        // save the 
        console.log('save score...')
        this.sendToFrame('the score is saved')
        break
      default:
        this.sendToFrame('some messages not handled')
    }
    
  }

  render() {
    return (
      <div>
        <iframe
          sandbox="allow-scripts"
          style={{ width: '50%' }}
          src="http://62.75.150.23:8080/"
          ref={(f) => { this.ifr = f }}
        />
      </div>
    );
  }
}

export default Iframe;