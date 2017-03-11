import React from 'react';

const Login = () => (

<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <label>
    Password:
    <input type="password" name="password" />
  </label>
  <input type="submit" value="Login" />
</form>

);

export default Login;