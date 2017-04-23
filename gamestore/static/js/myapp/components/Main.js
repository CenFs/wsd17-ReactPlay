// Main entry of front-end
import React from 'react';

const Main = () => (
  <div>
    <h1>Welcome to React Play</h1>
    <h3>Our Stack: Django + React + Redux + Webpack </h3>
    <a href="/store/login" className="btn btn-success" role="button"> Login </a>
    <a href="/store/register" className="btn btn-danger" role="button"> Register </a>
  </div>
);

export default Main;

