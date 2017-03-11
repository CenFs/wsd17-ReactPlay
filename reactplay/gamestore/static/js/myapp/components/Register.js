import React from 'react';

const Register = () => (

<form>
  <label>
    Account:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />

  <label>
    Password:
    <input type="password" name="password" />
  </label>
  <input type="submit" value="Submit" />

  <label>
    Retype password:
    <input type="password" name="passwordRetype" />
  </label>
  <input type="submit" value="Submit" />

  <label>
    Email:
    <input type="email" name="email" />
  </label>
  <input type="submit" value="Submit" />

</form>

);

export default Register;