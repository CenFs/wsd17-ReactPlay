import React from 'react';

class NoMatch extends React.Component {

  render () {
    return (
      <div className="notFound">
       <h1> 404 Not Found </h1>
       <div> Oops, the page you're looking for doesn't exist.</div>
      </div>
    );
  }
}

export default NoMatch;