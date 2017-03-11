import React from 'react';

const Login = () => (

<form className="login">
  <h1> React Play </h1>
  <div className="form-group row">
    <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Username</label>
    <div className="col-sm-10">
    <input type="text" name="username" className="form-control" id="inputEmail" placeholder="Email" />
    </div>
  </div>
  <div className="form-group row">
    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
    <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
    </div>
  </div>
  <div className="form-group row">
    <div className="offset-sm-2 col-sm-10">
      <button type="submit" className="btn btn-primary">Sign in</button>
    </div>
  </div>
</form>

);

export default Login;