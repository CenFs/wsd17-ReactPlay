import React from 'react';

class NavBar extends React.Component {

  render () {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">React Play</a>
        </div>
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Home</a></li>
          <li><a href="#">Link</a></li>
          <li><a href="#">Link</a></li>
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
          <li><a href="#"><span className="glyphicon glyphicon-user"></span> username </a></li>
          <li><a href="http://localhost:8000/api/logout"><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
        </ul>
      </div>
    </nav>  
    );
  }
}

export default NavBar;
