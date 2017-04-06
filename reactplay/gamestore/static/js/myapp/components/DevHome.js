import React from 'react';
import NavBar from './NavBar';
import DevList from './DevList';

class DevHome extends React.Component {

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
