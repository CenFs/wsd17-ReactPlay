import React from 'react';
import { logoutClick } from '../actions';
import { connect } from 'react-redux';

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

  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">React Play</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Home</a></li>
          <li><a href="#">Game Store</a></li>
          <li><a href="#">My Games</a></li>
        </ul>
        <form className="navbar-form navbar-left">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search Game" />
            <div className="input-group-btn">
              <button className="btn btn-default" type="submit">
                <i className="glyphicon glyphicon-search"></i>
              </button>
            </div>
          </div>
        </form>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> {this.props.Username} </a></li>
          <li><a href="#" onClick={this.handleLogout}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
      </div>
    </nav>  
    );
  }
}

const mapStateToProps = (state) => ({
  Username: state.user.username
});
// export default NavBar;
export default connect(mapStateToProps)(NavBar);

