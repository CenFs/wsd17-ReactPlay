import React from 'react';
import { logoutClick } from '../actions';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class NavBar extends React.Component {
  
  // constructor for Login, bind event handler to class
  constructor(props) {
      super(props);
      this.handleLogout = this.handleLogout.bind(this);
  }

  // handler submission of login form
  handleLogout = event => {
      event.preventDefault();
      this.props.dispatch(logoutClick());
  }
  
  // go back to home page 
  goHome = event => {
    event.preventDefault();
    const currentPath = browserHistory.getCurrentLocation().pathname
    if (currentPath !== '/store/player' || currentPath !== '/store/developer') {
      browserHistory.goBack();
    }
  }

  // render the navgation bar
  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">React Play</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#" onClick={this.goHome}>Home</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> {this.props.Username} </a></li>
          <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
      </div>
    </nav>  
    );
  }
}

// transform the current Redux store state into the props
const mapStateToProps = (state) => ({
  Username: state.user.username
});

export default connect(mapStateToProps)(NavBar);

