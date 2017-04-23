import React from 'react';
import NavBar from './NavBar';
import DevList from './DevList';

class DevHome extends React.Component {
  
  componentDidMount() {
    // console.log(this.props)
    // if (this.props.location.key === null) {
    //   alert('Please login first!');
    //   this.props.router.push('/store/login');
    // }
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
