import React from 'react';
import NavBar from './NavBar';
import DevList from './DevList';

class DevHome extends React.Component {
  
  componentDidMount() {
    if (this.props.location.key === null) {
      alert('Please login first!');
      browserHistory.push('/store/login');
    }
  }
  // developers' home page
  render () {
    return (
      <div>
        <NavBar />
        <h1> Home for Developer </h1>
        <DevList />
      </div>
    );
  }
}

export default DevHome;
